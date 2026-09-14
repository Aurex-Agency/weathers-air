import { describe, it, expect, vi, afterEach } from "vitest";
import { submitForm, FormNotConfiguredError, buildMailto, isValidPhone } from "@/lib/submit";

afterEach(() => vi.restoreAllMocks());

describe("submitForm", () => {
  it("throws FormNotConfiguredError when no endpoint is set", async () => {
    await expect(submitForm({ form: "contact" }, "")).rejects.toBeInstanceOf(FormNotConfiguredError);
  });

  it("POSTs JSON to the endpoint", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 200 }));
    await submitForm({ form: "contact", name: "Jane" }, "https://example.test/f");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://example.test/f");
    expect(init?.method).toBe("POST");
    const body = JSON.parse(init?.body as string);
    expect(body.form).toBe("contact");
    expect(body.name).toBe("Jane");
    expect(body.submittedAt).toBeTruthy();
  });

  it("surfaces server error messages", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ message: "Bad email" }), { status: 422 }),
    );
    await expect(submitForm({ form: "contact" }, "https://example.test/f")).rejects.toThrow("Bad email");
  });
});

describe("helpers", () => {
  it("validates US phone numbers loosely", () => {
    expect(isValidPhone("(662) 327-3784")).toBe(true);
    expect(isValidPhone("327-3784")).toBe(false);
  });

  it("builds a mailto link that skips empty fields", () => {
    const href = buildMailto("a@b.com", "Hi", { Name: "Jane", Email: "" });
    expect(href.startsWith("mailto:a@b.com?subject=Hi&body=")).toBe(true);
    expect(decodeURIComponent(href)).toContain("Name: Jane");
    expect(decodeURIComponent(href)).not.toContain("Email");
  });
});
