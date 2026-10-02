import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppLayout } from "@/App";

describe("federal capability discovery and inquiry", () => {
  it("presents self-assessment accurately with a route to the project guide", () => {
    render(<MemoryRouter initialEntries={["/federal-hvac-contracting"]}><AppLayout /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("HVAC support for federal projects");
    expect(screen.getByText(/not a third-party certification/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Read the federal HVAC scope checklist/ })).toHaveAttribute("href", "/blog/federal-hvac-project-scope-checklist");
    expect(screen.getByRole("link", { name: "Request Service" })).toHaveAttribute("href", "/contact?service=federal");
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://weathersair.com/federal-hvac-contracting");
  });
  it("preselects a federal inquiry and displays the public-information boundary", () => {
    render(<MemoryRouter initialEntries={["/contact?service=federal"]}><AppLayout /></MemoryRouter>);
    expect(screen.getByRole("combobox", { name: "Service Type" })).toHaveValue("Federal HVAC / Government Project");
    expect(screen.getByRole("note")).toHaveTextContent("Do not submit FCI, CUI");
  });
});
