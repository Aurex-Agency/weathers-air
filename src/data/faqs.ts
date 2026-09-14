import type { Faq } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

/** Answers are grounded in the copy elsewhere on the site. Edit freely. */
export const faqs: Faq[] = [
  {
    question: "Do you offer emergency or after-hours HVAC service?",
    answer: `Yes. HVAC emergencies don't keep business hours. Call ${BUSINESS.phone.display} and we'll get a technician out to you as fast as possible, even after hours.`,
  },
  {
    question: "What areas do you serve?",
    answer:
      "We're based in Columbus, MS and proudly serve the Golden Triangle and surrounding communities. Weathers is fully licensed in Mississippi, Alabama and Tennessee.",
  },
  {
    question: "Do you service all brands of heating and air conditioning equipment?",
    answer:
      "Yes. No job is too big or small. We service, repair and replace all makes and models of HVAC equipment, new or old, for both homes and businesses.",
  },
  {
    question: "How often should my HVAC system be serviced?",
    answer:
      "We recommend preventive maintenance once or twice a year. Our Weathers Preventive Maintenance Plans keep your system running at peak efficiency, extend equipment life and help you avoid costly emergency repairs.",
  },
  {
    question: "Do you offer plumbing and electrical services too?",
    answer:
      "Yes. In addition to heating and cooling, Weathers now offers professional plumbing and licensed electrical services for residential and commercial customers, from leaks and water heaters to panel upgrades and lighting.",
  },
  {
    question: "Can duct sealing really lower my energy bills?",
    answer:
      "It can. Homes can lose up to 35% of conditioned air through unsealed ductwork. We test the airflow in your duct system and seal the leaks so your HVAC system runs more efficiently year-round.",
  },
  {
    question: "What are your office hours?",
    answer: `Our office is open ${BUSINESS.hours.display}. Emergency service is available after hours at the same number, ${BUSINESS.phone.display}.`,
  },
];
