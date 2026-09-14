import { describe, it, expect } from "vitest";
import { BUSINESS, LICENSE_LINE, MAP_EMBED_URL, servicePath } from "@/lib/business";
import { localBusinessSchema, faqSchema } from "@/lib/schema";
import { faqs } from "@/data/faqs";

describe("business constants", () => {
  it("has a consistent phone number across formats", () => {
    expect(BUSINESS.phone.display.replace(/\D/g, "")).toBe(BUSINESS.phone.digits);
    expect(BUSINESS.phone.href).toBe(`tel:+1${BUSINESS.phone.digits}`);
    expect(BUSINESS.phone.e164).toBe(`+1${BUSINESS.phone.digits}`);
  });

  it("formats the licence line", () => {
    expect(LICENSE_LINE).toBe("MS: 04754-MC | AL: 2003172 | TN: 72907");
  });

  it("builds service anchor links", () => {
    expect(servicePath("plumbing")).toBe("/services#plumbing");
  });

  it("builds a keyless Google Maps embed URL for the address", () => {
    expect(MAP_EMBED_URL).toContain("output=embed");
    expect(decodeURIComponent(MAP_EMBED_URL)).toContain(BUSINESS.address.street);
  });
});

describe("schema.org markup", () => {
  it("produces valid local business JSON-LD", () => {
    const s = localBusinessSchema();
    expect(s["@type"]).toContain("HVACBusiness");
    expect(s.telephone).toBe(BUSINESS.phone.e164);
    expect(s.address.postalCode).toBe("39701");
    expect(s.sameAs).toContain(BUSINESS.social.facebook);
    expect(s.sameAs).not.toContain("");
    expect(() => JSON.stringify(s)).not.toThrow();
  });

  it("maps every FAQ into FAQPage markup", () => {
    const s = faqSchema(faqs);
    expect(s.mainEntity).toHaveLength(faqs.length);
    expect(s.mainEntity[0].acceptedAnswer.text).toBe(faqs[0].answer);
  });
});
