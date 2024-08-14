import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "@components/SearchBar";
import "@testing-library/jest-dom";

describe("SearchBar", () => {
  const mockSetQuery = jest.fn();
  const query = "initial query";
  const searchParameter = "repositories";

  beforeEach(() => {
    mockSetQuery.mockClear();
  });

  it("renders without crashing", () => {
    render(
      <SearchBar
        query={query}
        setQuery={mockSetQuery}
        searchParameter={searchParameter}
      />
    );
    expect(
      screen.getByPlaceholderText(`Search for ${searchParameter}`)
    ).toBeInTheDocument();
  });

  it("displays the correct placeholder text", () => {
    render(
      <SearchBar
        query={query}
        setQuery={mockSetQuery}
        searchParameter={searchParameter}
      />
    );
    expect(
      screen.getByPlaceholderText(`Search for ${searchParameter}`)
    ).toBeInTheDocument();
  });

  it("calls setQuery on input change", () => {
    render(
      <SearchBar
        query={query}
        setQuery={mockSetQuery}
        searchParameter={searchParameter}
      />
    );
    const input = screen.getByPlaceholderText(`Search for ${searchParameter}`);
    fireEvent.change(input, { target: { value: "new query" } });
    expect(mockSetQuery).toHaveBeenCalledWith("new query");
  });

  it("shows the correct initial value in the input field", () => {
    render(
      <SearchBar
        query={query}
        setQuery={mockSetQuery}
        searchParameter={searchParameter}
      />
    );
    expect(screen.getByDisplayValue(query)).toBeInTheDocument();
  });
});
