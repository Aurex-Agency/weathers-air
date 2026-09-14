/**
 * Form submission helper.
 *
 * Posts JSON to the endpoint configured in `VITE_FORM_ENDPOINT` (works with
 * Formspree, Web3Forms, Basin, a Netlify/Vercel function, or anything that
 * accepts a JSON POST). If no endpoint is configured, the caller gets a
 * `FormNotConfiguredError` so it can fall back to a pre-filled email.
 */

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
export const getFormEndpoint = () => (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() || "";

export async function submitForm(payload: SubmitPayload, endpoint: string = getFormEndpoint()): Promise<void> {
  if (!endpoint) throw new FormNotConfiguredError();

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...payload,
      page: typeof window !== "undefined" ? window.location.href : undefined,
      submittedAt: new Date().toISOString(),
    }),
  });

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

/** Loose US phone check: at least 10 digits. */
export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}
