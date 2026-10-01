// @vitest-environment node
import { describe, it, expect, vi, afterEach } from "vitest";
import { handleRequest } from "../../api/contact";
const valid={form:"contact",name:"Test Customer",phone:"6625550123",email:"customer@example.com",contactMethod:"email",serviceType:"Plumbing",message:"Test only"};
function request(body: unknown=valid, origin="https://weathersair.com") { return new Request("https://weathersair.com/api/contact",{method:"POST",headers:{Origin:origin,"Content-Type":"application/json"},body:JSON.stringify(body)}); }
afterEach(()=>{vi.restoreAllMocks();vi.unstubAllEnvs();});
describe("secure contact endpoint",()=>{
  it("rejects another origin without calling Resend",async()=>{const send=vi.spyOn(globalThis,"fetch");expect((await handleRequest(request(valid,"https://unrelated.example"))).status).toBe(403);expect(send).not.toHaveBeenCalled();});
  it.each([{name:""},{email:"bad"},{email:"one@example.com,two@example.com"},{email:"Name<one@example.com>"},{phone:"123"},{contactMethod:"email",email:""},{company:"spam"},{message:"x".repeat(5001)}])("rejects invalid request fields: %j",async(change)=>{const send=vi.spyOn(globalThis,"fetch");expect((await handleRequest(request({...valid,...change}))).status).toBe(400);expect(send).not.toHaveBeenCalled();});
  it("fails truthfully when not configured",async()=>{vi.stubEnv("RESEND_API_KEY","");expect((await handleRequest(request())).status).toBe(503);});
  it("locks sender and recipient while preserving reply-to",async()=>{vi.stubEnv("RESEND_API_KEY","test-key");const send=vi.spyOn(globalThis,"fetch").mockImplementation(async () => Response.json({id:"test-id"}));const response=await handleRequest(request({...valid,to:"attacker@example.com",from:"attacker@example.com"}));expect(response.status).toBe(200);expect((await response.json()).success).toBe(true);const payload=JSON.parse(send.mock.calls[0][1]?.body as string);expect(payload.to).toEqual(["mary@weathersairconditioning.com"]);expect(payload.from).toBe("Weathers Air Conditioning <support@team.weathersair.com>");expect(payload.reply_to).toBe("customer@example.com");expect(send.mock.calls[0][1]?.headers).toMatchObject({"Idempotency-Key":expect.stringMatching(/^website-/)});});
  it("does not claim success on provider rejection",async()=>{vi.stubEnv("RESEND_API_KEY","test-key");vi.spyOn(globalThis,"fetch").mockResolvedValue(Response.json({message:"internal provider detail"},{status:403}));const r=await handleRequest(request());expect(r.status).toBe(502);expect(JSON.stringify(await r.json())).not.toContain("internal provider detail");});
  it("notifies Mary of newsletter requests without claiming enrollment",async()=>{vi.stubEnv("RESEND_API_KEY","test-key");const send=vi.spyOn(globalThis,"fetch").mockImplementation(async () => Response.json({id:"test-id"}));expect((await handleRequest(request({form:"newsletter",email:"customer@example.com"}))).status).toBe(200);expect(JSON.parse(send.mock.calls[0][1]?.body as string).text).toContain("not automatic mailing-list enrollment");});
});

describe("branded notifications and customer receipts", () => {
  function provider() {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    return vi.spyOn(globalThis, "fetch").mockImplementation(async () => Response.json({ id: "accepted" }));
  }
  it("sends a separate receipt after office acceptance, with replies routed to Mary", async () => {
    const send = provider();
    const response = await handleRequest(request());
    expect(await response.json()).toMatchObject({ success: true, confirmation: "sent" });
    expect(send).toHaveBeenCalledTimes(2);
    const office = JSON.parse(send.mock.calls[0][1]?.body as string);
    const customer = JSON.parse(send.mock.calls[1][1]?.body as string);
    expect(office.html).toContain("Customer message");
    expect(office.html).toContain("Test only");
    expect(office.text).toContain("Test only");
    expect(customer.to).toEqual([valid.email]);
    expect(customer.reply_to).toBe("mary@weathersairconditioning.com");
    expect(customer.from).toBe(office.from);
    expect(customer.html).toContain("not a booked appointment");
    expect(customer.text).toContain("not a booked appointment");
    expect(customer.html).not.toContain(valid.message);
    expect(send.mock.calls[0][1]?.headers).not.toEqual(send.mock.calls[1][1]?.headers);
  });
  it("escapes submitted markup in office HTML and keeps it out of customer receipts", async () => {
    const send = provider();
    await handleRequest(request({ ...valid, name: '<img src="x" onerror="alert(1)">', message: '<a href="https://evil.example">Pay here</a>\nNext line' }));
    const office = JSON.parse(send.mock.calls[0][1]?.body as string);
    const customer = JSON.parse(send.mock.calls[1][1]?.body as string);
    expect(office.html).toContain("&lt;img");
    expect(office.html).toContain("&lt;a href=&quot;");
    expect(office.html).not.toContain('<img src="x"');
    expect(customer.html).not.toContain("evil.example");
    expect(customer.text).not.toContain("Pay here");
  });
  it("still accepts phone-only requests without attempting a receipt", async () => {
    const send = provider();
    const response = await handleRequest(request({ ...valid, email: "", contactMethod: "phone" }));
    expect(await response.json()).toMatchObject({ success: true, confirmation: "not_requested" });
    expect(send).toHaveBeenCalledTimes(1);
  });
  it.each(["rejection", "timeout"])("preserves a successful lead when the confirmation has a %s", async failure => {
    const send = provider();
    const log = vi.spyOn(console, "warn").mockImplementation(() => {});
    send.mockResolvedValueOnce(Response.json({ id: "office-id" }));
    if (failure === "timeout") send.mockRejectedValueOnce(new Error("timeout with private detail"));
    else send.mockResolvedValueOnce(Response.json({ message: "private provider detail" }, { status: 429 }));
    const response = await handleRequest(request());
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ success: true, confirmation: "unavailable" });
    expect(log).toHaveBeenCalledWith("website_confirmation_failed", { requestId: expect.any(String) });
    expect(JSON.stringify(log.mock.calls)).not.toContain(valid.email);
  });
  it("does not send a customer receipt when office delivery fails", async () => {
    const send = provider().mockResolvedValue(Response.json({ message: "rejected" }, { status: 403 }));
    expect((await handleRequest(request())).status).toBe(502);
    expect(send).toHaveBeenCalledTimes(1);
  });
  it("reuses each send's idempotency key on an identical retry", async () => {
    vi.spyOn(Date, "now").mockReturnValue(1800000000000);
    const send = provider();
    await handleRequest(request());
    await handleRequest(request());
    expect(send.mock.calls[0][1]?.headers).toEqual(send.mock.calls[2][1]?.headers);
    expect(send.mock.calls[1][1]?.headers).toEqual(send.mock.calls[3][1]?.headers);
  });
  it("confirms newsletter requests without promising enrollment", async () => {
    const send = provider();
    await handleRequest(request({ form: "newsletter", email: valid.email }));
    const customer = JSON.parse(send.mock.calls[1][1]?.body as string);
    expect(customer.html).toContain("does not confirm enrollment");
    expect(customer.text).toContain("does not confirm enrollment");
  });
});
