export const SENDER = "Weathers Air Conditioning <support@team.weathersair.com>";
export const OFFICE = "mary@weathersairconditioning.com";
export interface FormDetails {
  form: string; name: string; phone: string; email: string;
  message: string; service: string; preference: string;
}
export interface EmailPayload {
  from: string; to: string[]; reply_to?: string;
  subject: string; text: string; html: string;
}
const escape = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
const paragraph = (text: string) => `<p style="margin:0 0 20px;line-height:1.7;color:#425466">${escape(text)}</p>`;
function button(label: string, href: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0"><tr><td bgcolor="#efa934" style="border-radius:8px"><a href="${escape(href)}" style="display:inline-block;padding:14px 22px;color:#14283f;font-weight:bold;text-decoration:none">${escape(label)}</a></td></tr></table>`;
}
function layout(preheader: string, eyebrow: string, title: string, content: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title></head><body style="margin:0;padding:0;background:#eef3f7;font-family:Arial,Helvetica,sans-serif;color:#14283f"><div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${escape(preheader)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#eef3f7"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#fff;border:1px solid #dce5ed;border-radius:12px;overflow:hidden"><tr><td bgcolor="#14283f" style="padding:30px 28px;border-bottom:4px solid #efa934"><a href="https://weathersair.com" style="color:#fff;text-decoration:none;font-size:27px;font-weight:bold">Weathers<span style="color:#87c8ee"> Air Conditioning</span></a><p style="color:#c0d3e1;font-size:13px;margin:10px 0 0">Whatever the Weather, Call Weathers!</p></td></tr><tr><td style="padding:32px 28px;overflow-wrap:anywhere;word-break:break-word"><p style="color:#246d98;font-size:12px;letter-spacing:2px;font-weight:bold;text-transform:uppercase;margin:0 0 12px">${escape(eyebrow)}</p><h1 style="font-size:28px;line-height:1.25;margin:0 0 22px;color:#14283f">${escape(title)}</h1>${content}</td></tr><tr><td bgcolor="#f6f9fc" style="padding:24px 28px;border-top:1px solid #dce5ed;font-size:13px;line-height:1.7;color:#566779"><strong style="color:#14283f">Weathers Air Conditioning</strong><br>506 13th Street North, Columbus, MS 39701<br><a href="tel:+16623273784" style="color:#246d98">(662) 327-3784</a> · <a href="https://weathersair.com" style="color:#246d98">weathersair.com</a><br><a href="https://weathersair.com/privacy-policy" style="color:#566779">Privacy notice</a></td></tr></table></td></tr></table></body></html>`;
}
export function officeEmail(data: FormDetails): EmailPayload {
  const newsletter = data.form === "newsletter";
  const rows = newsletter ? [["Email", data.email]] : [
    ["Customer", data.name], ["Phone", data.phone], ["Email", data.email || "Not provided"],
    ["Service", data.service || "Not selected"], ["Preferred reply", data.preference === "email" ? "Email" : "Phone"],
  ];
  const details = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dce5ed;border-radius:8px">${rows.map(([label, value]) => `<tr><td style="padding:13px 16px;border-bottom:1px solid #eef3f7"><p style="margin:0 0 5px;font-size:12px;color:#66788a">${escape(label)}</p><p style="margin:0;font-size:16px;color:#14283f;word-break:break-word">${escape(value)}</p></td></tr>`).join("")}</table>`;
  const note = newsletter ? "This is an office notification, not automatic mailing-list enrollment." : "Reply to this email to reach the customer when an email address is provided. Appointment details still need to be confirmed.";
  const message = newsletter ? "" : `<h2 style="font-size:18px;margin:26px 0 12px">Customer message</h2><div style="padding:18px;background:#f6f9fc;border-left:3px solid #87c8ee;line-height:1.7;color:#425466;white-space:pre-wrap;word-break:break-word">${escape(data.message || "Not provided")}</div>`;
  return { from: SENDER, to: [OFFICE], ...(data.email ? { reply_to: data.email } : {}),
    subject: newsletter ? "Website update signup request" : "New website service request",
    text: [newsletter ? "Website update signup request" : "New website service request", ...rows.map(([label, value]) => `${label}: ${value}`), ...(newsletter ? [] : [`Message:\n${data.message || "Not provided"}`]), note].join("\n\n"),
    html: layout("A new website request is ready for follow-up.", "Website notification", newsletter ? "New update signup request" : "A new customer needs your help", paragraph("Here are the details submitted through weathersair.com.") + details + message + (newsletter ? "" : button("Call customer", `tel:+${data.phone.replace(/\D/g, "").length === 10 ? "1" : ""}${data.phone.replace(/\D/g, "")}`)) + paragraph(note)),
  };
}
export function confirmationEmail(data: FormDetails): EmailPayload {
  const newsletter = data.form === "newsletter";
  const title = newsletter ? "We received your signup request" : "Thanks for reaching out to Weathers";
  const intro = newsletter ? "Your request for updates has been sent to our office. Our team will review it; this email does not confirm enrollment in a mailing list." : "Your service request has been sent to our office. Our team will review it and contact you using your preferred contact method to discuss the next steps.";
  const next = newsletter ? "Have a question about your request? Reply to this email to reach our office." : "This confirms receipt of your request, not a booked appointment. Our office will confirm scheduling and availability with you. You can reply to this email if you need to add or correct any details.";
  const urgent = "For urgent or after-hours service needs, call (662) 327-3784 directly. Online messages are not monitored continuously.";
  // Keep confirmations fixed: never forward untrusted messages or links to an unverified address.
  return { from: SENDER, to: [data.email], reply_to: OFFICE,
    subject: newsletter ? "We received your update signup request | Weathers" : "We received your service request | Weathers",
    text: [title, intro, next, ...(newsletter ? [] : [urgent]), "If you did not submit this request, you can disregard this email. You have not been added to marketing emails by this confirmation.", "Weathers Air Conditioning\n(662) 327-3784\nhttps://weathersair.com\n506 13th Street North, Columbus, MS 39701"].join("\n\n"),
    html: layout("Your request is with our office. Here is what happens next.", "Request received", title, paragraph(intro) + `<h2 style="font-size:19px;margin:24px 0 12px">What happens next?</h2>` + paragraph(next) + (newsletter ? button("Visit Weathers", "https://weathersair.com") : button("Call (662) 327-3784", "tel:+16623273784") + paragraph(urgent)) + paragraph("If you did not submit this request, you can disregard this email. You have not been added to marketing emails by this confirmation.")),
  };
}
