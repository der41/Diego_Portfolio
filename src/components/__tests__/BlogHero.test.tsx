import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BlogHero from "../blog/BlogHero";

describe("BlogHero", () => {
  it("renders the title with italic accent", () => {
    render(<BlogHero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Exploring Everything",
    );
  });

  it("renders the subtitle copy", () => {
    render(<BlogHero />);
    expect(
      screen.getByText("Insights and Surprises Along the Way"),
    ).toBeInTheDocument();
  });
});
