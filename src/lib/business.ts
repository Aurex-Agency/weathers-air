/**
 * Single source of truth for business details used across the site.
 * Update values here and every page, the footer, the schema markup and
 * the sitemap pick them up.
 */

const PHONE_DIGITS = "6623273784";

export const BUSINESS = {
  name: "Weathers Air Conditioning",
  legalName: "Weathers Air Conditioning, Inc.",
  tagline: "Whatever the Weather, Call Weathers!",
  description:
    "Columbus, MS's most trusted HVAC, plumbing & electrical experts for over 40 years. Residential and commercial heating, cooling, duct cleaning, duct sealing, maintenance plans and 24/7 emergency service.",

  phone: {
    display: "(662) 327-3784",
    digits: PHONE_DIGITS,
    e164: `+1${PHONE_DIGITS}`,
    href: `tel:+1${PHONE_DIGITS}`,
  },
  email: "mary@weathersairconditioning.com",

  address: {
    street: "506 13th Street North",
    city: "Columbus",
    state: "MS",
    zip: "39701",
    get full() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    },
  },
  mailingAddress: "P.O. Box 1354, Columbus, MS 39703",

  hours: {
    display: "Monday–Friday: 8:00am – 4:30pm",
    short: "Mon–Fri, 8am–4:30pm",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "16:30",
    emergencyNote: "Emergency service available after hours",
  },

  yearsInBusiness: 40,
  serviceArea: ["Columbus, MS", "The Golden Triangle", "Mississippi", "Alabama", "Tennessee"],
  licenses: [
    { state: "MS", number: "04754-MC" },
    { state: "AL", number: "2003172" },
    { state: "TN", number: "72907" },
  ],
  award: "WCBI Viewer's Choice Award Winner 2025",
  partners: ["Amana HVAC", "Vollara"],

  googlePlaceId: "ChIJzUcLkpzthogRRmdH0e4R1Ck",
  social: {
    facebook: "https://www.facebook.com/weathersairconditioning/",
    google: "https://www.google.com/maps/place/?q=place_id:ChIJzUcLkpzthogRRmdH0e4R1Ck",
    yelp: "https://www.yelp.com/biz/weathers-air-conditioning-columbus-3",
    // Leave empty to hide the icon. Add the profile URL when one exists.
    x: "",
  },
  reviews: {
    rating: 4.7,
    count: 278,
    googleWriteUrl: "https://search.google.com/local/writereview?placeid=ChIJzUcLkpzthogRRmdH0e4R1Ck",
    googleReadUrl: "https://www.google.com/maps/place/?q=place_id:ChIJzUcLkpzthogRRmdH0e4R1Ck",
  },

  /** Canonical origin of the deployed site (no trailing slash). */
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || "https://weathers.aurexagency.com",
} as const;

export const LICENSE_LINE = BUSINESS.licenses.map((l) => `${l.state}: ${l.number}`).join(" | ");

export const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  `${BUSINESS.name}, ${BUSINESS.address.full}`,
)}&output=embed`;

export const MAP_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  BUSINESS.address.full,
)}&destination_place_id=${BUSINESS.googlePlaceId}`;

export const SERVICE_LINKS = [
  { id: "residential", label: "Residential HVAC", short: "Residential" },
  { id: "commercial", label: "Commercial HVAC", short: "Commercial" },
  { id: "cleaning", label: "Duct Cleaning", short: "Duct Cleaning" },
  { id: "sealing", label: "Duct Sealing", short: "Duct Sealing" },
  { id: "plans", label: "Maintenance Plans", short: "Maintenance" },
  { id: "plumbing", label: "Plumbing", short: "Plumbing" },
  { id: "electrical", label: "Electrical", short: "Electrical" },
] as const;

export type ServiceId = (typeof SERVICE_LINKS)[number]["id"];

export const servicePath = (id: ServiceId) => `/services#${id}`;
