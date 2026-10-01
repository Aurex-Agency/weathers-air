/** Posts a request to the same-origin Vercel/Resend endpoint. Only a JSON
 * response with success:true is considered accepted; HTML fallbacks cannot
 * accidentally claim that a request was sent. */

export type FormKind = "contact" | "newsletter";

export interface SubmitPayload {
  form: FormKind;
  [key: string]: string | undefined;
}

export class FormNotConfiguredError extends Error {
  constructor() {
    super("No form endpoint configured");
    this.name = "FormNotConfiguredError";
  }
}

/** Read at call time so the value can be changed in tests and previews. */
export const getFormEndpoint = () => (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() || "/api/contact";

export async function submitForm(payload: SubmitPayload, endpoint: string = getFormEndpoint()): Promise<void> {
  if (!endpoint) throw new FormNotConfiguredError();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  let res: Response;
  try {
  res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    signal: controller.signal,
    body: JSON.stringify({
      ...payload,
      page: typeof window !== "undefined" ? window.location.href : undefined,
      submittedAt: new Date().toISOString(),
    }),
  });
  } catch {
    throw new Error("We could not confirm your request. Please try again or call us.");
  } finally {
    clearTimeout(timer);
  }

  if (res.ok) {
    const result = await res.json().catch(() => null);
    if (result?.success !== true) throw new Error("We could not confirm your request. Please call us.");
  }
  if (!res.ok) {
    let detail = "";
    try {
      const data = await res.json();
      detail = data?.message || data?.error || (Array.isArray(data?.errors) ? data.errors.map((e: { message?: string }) => e.message).join(", ") : "");
    } catch {
      /* ignore body parse errors */
    }
    throw new Error(detail || `Request failed with status ${res.status}`);
  }
}

/** Builds a mailto: URL so a visitor can still reach us when no endpoint is configured. */
export function buildMailto(to: string, subject: string, fields: Record<string, string | undefined>): string {
  const body = Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** US phone number: ten digits, optionally prefixed with country code 1. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}
