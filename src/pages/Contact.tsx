import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Phone, MapPin, Clock, Zap, Mail, Loader2, CheckCircle2, AlertCircle, Navigation } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import Seo from "@/components/Seo";
import SocialLinks from "@/components/SocialLinks";
import { BUSINESS, MAP_EMBED_URL, MAP_DIRECTIONS_URL } from "@/lib/business";
import { locations } from "@/data/locations";
import { breadcrumbSchema } from "@/lib/schema";
import { submitForm, FormNotConfiguredError, buildMailto, isValidPhone } from "@/lib/submit";

const serviceTypes = [
  "Residential HVAC",
  "Commercial HVAC",
  "Federal HVAC / Government Project",
  "Duct Cleaning",
  "Duct Sealing",
  "Maintenance Plan",
  "Plumbing",
  "Electrical",
  "Other",
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  serviceType: "",
  contactMethod: "phone",
  message: "",
  company: "", // honeypot: real users never see or fill this
};

type FormState = typeof initialForm;
type Status = "idle" | "sending" | "done" | "mailto" | "error";

const inputClass =
  "w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-sky focus:ring-2 focus:ring-sky/30 transition-colors aria-[invalid=true]:border-destructive";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const selectedLocation = locations.find(l => `${l.city}, ${l.state}` === searchParams.get("location"));
  const isFederalInquiry = searchParams.get("service") === "federal";
  const [formData, setFormData] = useState<FormState>(initialForm);
  useEffect(() => {
    if (selectedLocation) setFormData(current => current.message ? current : {
      ...current, message: `Service requested in ${selectedLocation.city}, ${selectedLocation.state}.\nStreet address: \nHow can we help? `,
    });
  }, [selectedLocation]);
  useEffect(() => {
    if (isFederalInquiry) setFormData(current => ({ ...current, serviceType: "Federal HVAC / Government Project" }));
  }, [isFederalInquiry]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    if (name === "phone") setPhoneError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.company) return; // bot filled the honeypot
    if (!isValidPhone(formData.phone)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!formData.name.trim() || (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) || (formData.contactMethod === "email" && !formData.email.trim())) {
      setErrorMsg("Please enter your name and a valid email address if you prefer an email reply.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    const { company: _honeypot, ...fields } = formData;
    const subject = `Service request from ${fields.name}${fields.serviceType ? ` (${fields.serviceType})` : ""}`;

    try {
      await submitForm({ form: "contact", subject, ...fields });
      setStatus("done");
    } catch (err) {
      if (err instanceof FormNotConfiguredError) {
        window.location.href = buildMailto(BUSINESS.email, subject, {
          Name: fields.name,
          Phone: fields.phone,
          Email: fields.email,
          "Service type": fields.serviceType,
          "Preferred contact": fields.contactMethod,
          Message: fields.message,
        });
        setStatus("mailto");
      } else {
        setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
        setStatus("error");
      }
    }
  };

  return (
    <div>
      <Seo
        title="Request HVAC Service in Columbus, MS"
        description={`Schedule HVAC, plumbing or electrical service in Columbus, MS. Call ${BUSINESS.phone.display} or send a request online. ${BUSINESS.hours.display}, emergency service after hours.`}
        path="/contact"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ])}
      />
      <PageHero
        headline="Get In Touch"
        subheadline="Schedule service, request a quote, or reach out with any questions. We're here to help."
        className="min-h-[38vh]"
      />

      {/* Emergency Banner */}
      <div className="bg-amber py-3 text-center px-4">
        <p className="text-primary font-bold text-sm">
          <Zap size={16} className="inline -mt-0.5 mr-1" aria-hidden="true" />
          For emergency after-hours service, call us directly:{" "}
          <a href={BUSINESS.phone.href} className="underline underline-offset-2 whitespace-nowrap">
            {BUSINESS.phone.display}
          </a>
        </p>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <AnimatedSection>
              <h2 className="text-2xl font-black text-foreground mb-6">Request Service or Ask a Question</h2>
              {status === "done" || status === "mailto" ? (
                <div className="bg-sky/10 border border-sky/20 rounded-xl p-8 text-center" role="status">
                  <CheckCircle2 size={40} className="text-sky mx-auto mb-3" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {status === "done" ? "Thank You!" : "Almost there!"}
                  </h3>
                  <p className="text-muted-foreground">
                    {status === "done"
                      ? "Your request has been sent to our office. We will follow up within 1 business day. For emergencies, please call directly."
                      : `Your email app should open with your request pre-filled. If it doesn't, email us at ${BUSINESS.email} or call ${BUSINESS.phone.display}.`}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                      Full Name <span className="text-destructive" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={update}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
                      Phone Number <span className="text-destructive" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      required
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={update}
                      aria-invalid={phoneError ? true : undefined}
                      aria-describedby={phoneError ? "phone-error" : undefined}
                      className={inputClass}
                    />
                    {phoneError && (
                      <p id="phone-error" className="text-destructive text-xs mt-1" role="alert">
                        {phoneError}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                      Email Address (for a confirmation)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={update}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-foreground mb-1">
                      Service Type
                    </label>
                    <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={update} className={inputClass}>
                      <option value="">Select a service...</option>
                      {serviceTypes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <fieldset>
                    <legend className="block text-sm font-medium text-foreground mb-1">Preferred Contact Method</legend>
                    <div className="flex gap-4">
                      {["phone", "email"].map((m) => (
                        <label key={m} className="flex items-center gap-2 cursor-pointer min-h-[44px]">
                          <input
                            type="radio"
                            name="contactMethod"
                            value={m}
                            checked={formData.contactMethod === m}
                            onChange={update}
                            className="accent-sky w-4 h-4"
                          />
                          <span className="text-sm text-foreground capitalize">{m}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
                      Message / Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={update}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  {/* Honeypot: hidden from humans, bots tend to fill it. */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="company">Company</label>
                    <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={formData.company} onChange={update} />
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 text-foreground rounded-lg p-4 text-sm" role="alert">
                      <AlertCircle size={18} className="text-destructive shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-semibold">We couldn't send your request.</p>
                        <p className="text-muted-foreground">
                          {errorMsg} Please try again or call us at{" "}
                          <a href={BUSINESS.phone.href} className="underline">
                            {BUSINESS.phone.display}
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  )}

                  {formData.serviceType === "Federal HVAC / Government Project" && <p className="rounded-lg bg-secondary p-4 text-sm text-muted-foreground" role="note">Public inquiries only. Do not submit FCI, CUI, access codes, security details or nonpublic facility drawings here or in replies to automated emails. Call our office to arrange appropriate document sharing.</p>}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full inline-flex items-center justify-center gap-2 bg-amber hover:bg-amber-light disabled:opacity-60 disabled:cursor-not-allowed text-primary font-bold py-3.5 rounded-xl text-lg transition-colors"
                  >
                    {status === "sending" && <Loader2 size={20} className="animate-spin" aria-hidden="true" />}
                    {status === "sending" ? "Sending..." : "Send My Request"}
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    We'll follow up within 1 business day. For emergencies, please call directly.
                    {" "}<Link to="/privacy-policy" className="underline">Privacy policy</Link>
                  </p>
                </form>
              )}
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={0.2}>
              <address className="not-italic bg-card border border-border rounded-xl p-8 space-y-6 mb-8">
                <a
                  href={BUSINESS.phone.href}
                  className="flex items-center gap-3 text-2xl font-black text-foreground hover:text-sky transition-colors"
                >
                  <Phone size={28} className="text-sky shrink-0" aria-hidden="true" />
                  {BUSINESS.phone.display}
                </a>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-sky transition-colors break-all"
                >
                  <Mail size={20} className="text-sky shrink-0" aria-hidden="true" />
                  {BUSINESS.email}
                </a>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin size={20} className="text-sky mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    {BUSINESS.address.full}
                    <a
                      href={MAP_DIRECTIONS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sky text-sm font-semibold mt-1 hover:underline"
                    >
                      <Navigation size={14} aria-hidden="true" /> Get directions
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock size={20} className="text-sky shrink-0" aria-hidden="true" />
                  {BUSINESS.hours.display}
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Zap size={20} className="text-amber shrink-0" aria-hidden="true" />
                  {BUSINESS.hours.emergencyNote}
                </div>
                <SocialLinks className="pt-2" linkClassName="bg-muted hover:bg-sky/10 hover:text-sky" />
              </address>

              {/* Google Map */}
              <div className="rounded-xl overflow-hidden border border-border h-64">
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map showing ${BUSINESS.name} at ${BUSINESS.address.full}`}
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-black text-primary-foreground mb-3">After-Hours Emergency?</h2>
            <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8">
              HVAC emergencies don't keep business hours. Call us and we'll get someone out to you as fast as possible.
            </p>
            <a
              href={BUSINESS.phone.href}
              className="inline-flex items-center gap-2 bg-amber hover:bg-amber-light text-primary font-black px-10 py-5 rounded-2xl text-xl animate-pulse-amber transition-colors"
            >
              <Phone size={24} aria-hidden="true" />
              {BUSINESS.phone.display}
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Contact;
