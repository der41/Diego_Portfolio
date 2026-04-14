import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ContactSection from "../ContactSection";

describe("ContactSection", () => {
  it("renders the heading", () => {
    render(<ContactSection />);
    expect(screen.getByText(/Let's Start a/i)).toBeInTheDocument();
    expect(screen.getByText(/Conversation\./i)).toBeInTheDocument();
  });

  it("renders the email link with correct href", () => {
    render(<ContactSection />);
    const emailLink = screen.getByText("Email").closest("a");
    expect(emailLink).toHaveAttribute("href", "mailto:Diego.elias94@gmail.com");
  });

  it("renders the LinkedIn link", () => {
    render(<ContactSection />);
    const linkedInLink = screen.getByText("LinkedIn").closest("a");
    expect(linkedInLink).toHaveAttribute("href", "https://www.linkedin.com/in/diego-e-r/");
    expect(linkedInLink).toHaveAttribute("target", "_blank");
  });

  it("renders the GitHub link", () => {
    render(<ContactSection />);
    const githubLink = screen.getByText("Github").closest("a");
    expect(githubLink).toHaveAttribute("href", "https://github.com/der41");
    expect(githubLink).toHaveAttribute("target", "_blank");
  });
});
