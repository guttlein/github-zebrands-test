import { render, screen } from "@testing-library/react";
import { SearchCard } from "@components/SearchCard";
import "@testing-library/jest-dom";

describe("SearchCard", () => {
  const mockResult = {
    html_url: "https://example.com",
    id: "1",
    avatar: "https://example.com/avatar.jpg",
    query: "test query",
    title: "Test Title",
    description: "Test description",
    btnText: "Test Button",
  };

  it("renders without crashing", () => {
    render(<SearchCard result={mockResult} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg"
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  it("displays the correct title and description", () => {
    render(<SearchCard result={mockResult} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders a button with correct link and text", () => {
    render(<SearchCard result={mockResult} />);
    const button = screen.getByRole("button", { name: /Go to Test Button/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.com"
    );
  });

  it("handles optional description", () => {
    const resultWithoutDescription = { ...mockResult, description: undefined };
    render(<SearchCard result={resultWithoutDescription} />);
    expect(screen.queryByText("Test description")).not.toBeInTheDocument();
  });
});
