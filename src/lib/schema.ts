import { BUSINESS } from "./business";

const abs = (path: string) => `${BUSINESS.siteUrl}${path}`;

/** schema.org HVACBusiness markup for the whole site. */
export const localBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["HVACBusiness", "Plumber", "Electrician"],
  "@id": abs("/#business"),
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  slogan: BUSINESS.tagline,
  description: BUSINESS.description,
  url: BUSINESS.siteUrl,
  telephone: BUSINESS.phone.e164,
  email: BUSINESS.email,
  image: abs("/og-image.jpg"),
  logo: abs("/logo.png"),
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.zip,
    addressCountry: "US",
  },
  areaServed: [
    { "@type": "City", name: "Columbus", containedInPlace: { "@type": "State", name: "Mississippi" } },
    { "@type": "State", name: "Mississippi" },
    { "@type": "State", name: "Alabama" },
    { "@type": "State", name: "Tennessee" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: BUSINESS.hours.days,
      opens: BUSINESS.hours.opens,
      closes: BUSINESS.hours.closes,
    },
  ],
  sameAs: Object.values(BUSINESS.social).filter(Boolean),
  award: BUSINESS.award,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "HVAC, Plumbing & Electrical Services",
    itemListElement: [
      "Residential HVAC Service & Installation",
      "Commercial HVAC Service & Installation",
      "Air Duct Cleaning",
      "Whole Home Ductwork Sealing",
      "Preventive Maintenance Plans",
      "Plumbing Services",
      "Electrical Services",
      "Emergency HVAC Service",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
});

export interface Faq {
  question: string;
  answer: string;
}

export const faqSchema = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});
