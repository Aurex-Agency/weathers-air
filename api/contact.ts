import { createHash } from "node:crypto";
const json = (status: number, message: string, extra = {}) => Response.json({ message, ...extra }, {status, headers:{"Cache-Control":"no-store"}});
const emailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);
export async function handleRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") return new Response(null,{status:405,headers:{Allow:"POST"}});
  const origin = request.headers.get("origin");
  const allowed = new Set(["https://weathersair.com", "https://www.weathersair.com", ...(process.env.FORM_ALLOWED_ORIGINS || "").split(",").map(x=>x.trim()).filter(Boolean)]);
  if (!origin || !allowed.has(origin)) return json(403,"Please send your request from our website.");
  if (!request.headers.get("content-type")?.includes("application/json")) return json(415,"Please send a JSON request.");
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > 16000) return json(413,"Your message is too long.");
  let data: Record<string, unknown>;
  try { data = JSON.parse(raw); } catch { return json(400,"Invalid request."); }
  if (!data || typeof data !== "object" || Array.isArray(data)) return json(400,"Invalid request.");
  const field = (key: string) => typeof data[key] === "string" ? (data[key] as string).trim() : "";
  if (field("company")) return json(400,"Unable to submit this request.");
  const form = field("form"), name=field("name"), phone=field("phone"), email=field("email"), message=field("message"), service=field("serviceType"), preference=field("contactMethod");
  if (!["contact","newsletter"].includes(form)) return json(400,"Invalid request type.");
  if ([name,phone,email,service,preference].some(v=>v.length>200 || /[\r\n]/.test(v)) || message.length>5000) return json(400,"Please shorten your request.");
  if (email && !emailValid(email)) return json(400,"Please enter a valid email address.");
  if (form==="newsletter" && !emailValid(email)) return json(400,"Please enter a valid email address.");
  if (form==="contact") {
    const digits=phone.replace(/\D/g,"");
    if (!name || !(digits.length===10 || (digits.length===11 && digits.startsWith("1")))) return json(400,"Please enter your name and a valid US phone number.");
    if (!["phone","email"].includes(preference)) return json(400,"Please select a contact method.");
    if (preference==="email" && !emailValid(email)) return json(400,"Please enter an email address for an email reply.");
  }
  const apiKey=process.env.RESEND_API_KEY;
  if (!apiKey) return json(503,"Online requests are temporarily unavailable. Please call (662) 327-3784.");
  const subject=form==="newsletter"?"Website update signup request":"New website service request";
  const text=form==="newsletter"?`Website update signup request\nEmail: ${email}\n\nThis is an office notification, not automatic mailing-list enrollment.`:[`Name: ${name}`,`Phone: ${phone}`,`Email: ${email || "Not provided"}`,`Service: ${service || "Not selected"}`,`Preferred reply: ${preference}`,`Message:\n${message || "Not provided"}`].join("\n");
  // Fixed recipients: callers cannot turn this endpoint into an arbitrary email relay.
  const payload={from:"Weathers Air Conditioning <support@team.weathersair.com>",to:["mary@weathersairconditioning.com"],...(email?{reply_to:email}:{}),subject,text};
  // Suppress duplicate clicks/retries for the same request within a ten-minute window.
  const key=createHash("sha256").update(JSON.stringify(payload)+Math.floor(Date.now()/600000)).digest("hex");
  try {
    const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","Idempotency-Key":`website-${key}`},body:JSON.stringify(payload),signal:AbortSignal.timeout(10000)});
    const result=await response.json();
    if (!response.ok || typeof result.id!=="string") return json(502,"We couldn't send your request. Please try again or call (662) 327-3784.");
    return json(200,"Your request has been sent to our office.",{success:true});
  } catch { return json(502,"We couldn't confirm your request. Please call (662) 327-3784."); }
}
export default { fetch: handleRequest };
