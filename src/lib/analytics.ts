type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };
// Only controlled values are sent. Never include form fields, query strings or contact details.
export function trackLead() {
  try { (window as AnalyticsWindow).gtag?.("event", "generate_lead", { form_name: "service_request" }); } catch { /* Analytics cannot change delivery status. */ }
}
export function trackCallIntent() {
  try { (window as AnalyticsWindow).gtag?.("event", "click_to_call", { interaction_type: "intent" }); } catch { /* Calling remains available without analytics. */ }
}
