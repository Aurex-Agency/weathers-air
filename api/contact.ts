import { createHash } from "node:crypto";
import { officeEmail, confirmationEmail, type EmailPayload } from "./_lib/emails.js";
const json = (status: number, message: string, extra = {}) => Response.json({ message, ...extra }, {status, headers:{"Cache-Control":"no-store"}});
const emailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n,;<>"\\]/.test(value) && value.split("@").length === 2;
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
  const details = { form, name, phone, email, message, service, preference };
  const payload = officeEmail(details);
  // Separate stable keys keep office and customer sends independently idempotent on retries.
  const key = createHash("sha256").update(JSON.stringify(payload) + Math.floor(Date.now() / 600000)).digest("hex");
  async function send(payload: EmailPayload, purpose: string, timeout: number) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `website-${purpose}-${key}` },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(timeout),
    });
    const result = await response.json();
    return response.ok && typeof result?.id === "string";
  }
  try {
    if (!await send(payload, "office", 8000)) return json(502,"We couldn't send your request. Please try again or call (662) 327-3784.");
  } catch { return json(502,"We couldn't confirm your request. Please call (662) 327-3784."); }

  // Never lose an accepted lead or prompt duplicate submissions when only the receipt fails.
  let confirmation = "not_requested";
  if (email) {
    try { confirmation = await send(confirmationEmail(details), "confirmation", 4000) ? "sent" : "unavailable"; }
    catch { confirmation = "unavailable"; }
    if (confirmation === "unavailable") console.warn("website_confirmation_failed", { requestId: key });
  }
  return json(200, "Your request has been sent to our office.", { success: true, confirmation });
}
export default { fetch: handleRequest };
