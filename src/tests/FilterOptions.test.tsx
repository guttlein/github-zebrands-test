// __tests__/FilterOptions.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterOptions } from "../components/FilterOptions";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe("FilterOptions Component", () => {
  it("renders the component with initial slider value", () => {
    const filters = { per_page: 10, page: 1, order: "desc" };
    const setFilters = jest.fn();
    const totalItems = 100;

    render(
      <ChakraProvider>
        <FilterOptions
          filters={filters}
          setFilters={setFilters}
          totalItems={totalItems}
        />
      </ChakraProvider>
    );

    expect(screen.getByDisplayValue(filters.per_page.toString())).toHaveValue(
      filters.per_page.toString()
    );

    // Check if the label displays the initial value
    const sliderMark = screen.getByDisplayValue(filters.per_page.toString());
    expect(sliderMark).toBeInTheDocument();
  });

  it("updates slider value on change and calls setFilters with correct value", () => {
    const filters = { per_page: 10, page: 1, order: "desc" };
    const setFilters = jest.fn();
    const totalItems = 100;

    render(
      <ChakraProvider>
        <FilterOptions
          filters={filters}
          setFilters={setFilters}
          totalItems={totalItems}
        />
      </ChakraProvider>
    );

    // Simulate slider change
    fireEvent.change(screen.getByDisplayValue(filters.per_page.toString()), {
      target: { value: "20" },
    });
    expect(screen.getByDisplayValue(filters.per_page.toString())).toHaveValue(
      "20"
    );

    // Check if setFilters was called with correct value
    expect(setFilters).toHaveBeenCalledWith(expect.any(Function));
    const setFiltersCallback = setFilters.mock.calls[0][0];
    expect(
      setFiltersCallback({ per_page: 10, page: 1, order: "desc" })
    ).toEqual({
      per_page: 20,
      page: 1,
      order: "desc",
    });
  });
});
