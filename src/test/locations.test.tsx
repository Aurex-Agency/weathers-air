import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppLayout } from "@/App";

function renderAt(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><AppLayout /></MemoryRouter>);
}

describe("location discovery and request flow", () => {
  it("makes all 12 location pages reachable from the hub", () => {
    renderAt("/service-areas");
    const main = screen.getByRole("main");
    expect(main.querySelectorAll('a[href^="/service-areas/"]')).toHaveLength(12);
    expect(within(main).getByText(/roughly 60 miles/)).toBeInTheDocument();
  });
  it("preserves the town on every location-page request link", () => {
    renderAt("/service-areas/starkville-ms");
    for (const link of screen.getAllByRole("link", { name: /request service/i })) {
      expect(link).toHaveAttribute("href", "/contact?location=Starkville%2C%20MS");
    }
  });
  it("keeps the selected town in the editable request message", () => {
    renderAt("/contact?location=Starkville%2C%20MS");
    expect((screen.getByRole("textbox", { name: /message/i }) as HTMLTextAreaElement).value).toContain("Starkville, MS");
  });
  it("ignores unrecognized location query values", () => {
    renderAt("/contact?location=Fake%20Branch");
    expect(screen.getByRole("textbox", { name: /message/i })).toHaveValue("");
  });
  it("shows a genuine not-found page for an unknown town", () => {
    renderAt("/service-areas/not-a-town");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/blew away/i);
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
  });
});
