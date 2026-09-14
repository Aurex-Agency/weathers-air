import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Contact from "@/pages/Contact";

afterEach(() => vi.restoreAllMocks());

const fill = async () => {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Full Name/i), "Jane Doe");
  await user.type(screen.getByLabelText(/Phone Number/i), "6625551234");
  await user.selectOptions(screen.getByLabelText(/Service Type/i), "Plumbing");
  await user.type(screen.getByLabelText(/Message/i), "Leaky faucet");
  return user;
};

describe("contact form", () => {
  it("rejects an invalid phone number before submitting", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/Full Name/i), "Jane");
    await user.type(screen.getByLabelText(/Phone Number/i), "123");
    await user.click(screen.getByRole("button", { name: /Send My Request/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/valid 10-digit/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits the form and shows the thank-you state", async () => {
    vi.stubEnv("VITE_FORM_ENDPOINT", "https://example.test/f");
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("{}", { status: 200 }));
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    const user = await fill();
    await user.click(screen.getByRole("button", { name: /Send My Request/i }));

    expect(await screen.findByText(/Thank You/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = JSON.parse(fetchMock.mock.calls[0][1]?.body as string);
    expect(body).toMatchObject({ form: "contact", name: "Jane Doe", phone: "6625551234", serviceType: "Plumbing" });
    expect(body.company).toBeUndefined();
    vi.unstubAllEnvs();
  });
});
