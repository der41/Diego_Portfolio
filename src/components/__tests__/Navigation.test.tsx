import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navigation from "../Navigation";

describe("Navigation", () => {
  it("renders the wordmark", () => {
    render(<Navigation />);
    expect(screen.getByText("Diego Rodriguez")).toBeInTheDocument();
  });

  it("renders all section links", () => {
    render(<Navigation />);
    expect(screen.getAllByText("About").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Education").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Experience").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Projects").length).toBeGreaterThan(0);
  });

  it("links point to correct section IDs", () => {
    render(<Navigation />);
    const aboutLinks = screen.getAllByRole("link", { name: "About" });
    expect(aboutLinks[0]).toHaveAttribute("href", "#about-section");
  });

  it("renders the Connect CTA", () => {
    render(<Navigation />);
    const connectLinks = screen.getAllByText("Connect");
    expect(connectLinks.length).toBeGreaterThan(0);
    expect(connectLinks[0]).toHaveAttribute("href", "#contact-section");
  });
});
