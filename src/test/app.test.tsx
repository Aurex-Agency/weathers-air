import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppLayout } from "@/App";
import { BUSINESS } from "@/lib/business";

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppLayout />
    </MemoryRouter>,
  );

describe("app shell", () => {
  it("renders the home page with the brand headline and call links", () => {
    renderAt("/");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/AC & Heating Services/i);
    const telLinks = document.querySelectorAll(`a[href="${BUSINESS.phone.href}"]`);
    expect(telLinks.length).toBeGreaterThan(3);
  });

  it("sets the document title and canonical for the home page", () => {
    renderAt("/");
    expect(document.title).toContain(BUSINESS.name);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(`${BUSINESS.siteUrl}/`);
    expect(document.querySelector('script[type="application/ld+json"]')).not.toBeNull();
  });

  it("renders the primary navigation with every page", () => {
    renderAt("/");
    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const label of ["Home", "Services", "Service Areas", "Shop", "Reviews", "Blog", "About Us", "Contact Us"]) {
      expect(within(nav).getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("shows social links that point at real profiles", () => {
    renderAt("/");
    const fb = screen.getAllByRole("link", { name: /on Facebook/i })[0];
    expect(fb).toHaveAttribute("href", BUSINESS.social.facebook);
    expect(document.querySelectorAll('a[href="#"]')).toHaveLength(0);
  });

  it("renders the not-found page for unknown routes", async () => {
    renderAt("/does-not-exist");
    expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent(/blew away/i);
  });
});
