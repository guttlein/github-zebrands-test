import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pagination } from "../components/Pagination";
import { ChakraProvider } from "@chakra-ui/react";

describe("Pagination Component", () => {
  it("Displays the current page", () => {
    render(
      <ChakraProvider>
        <Pagination currentPage={1} pageChange={() => {}} pageLimit={5} />
      </ChakraProvider>
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("Changes the page when Next Page is clicked", () => {
    const pageChange = jest.fn();
    render(
      <ChakraProvider>
        <Pagination currentPage={1} pageChange={pageChange} pageLimit={5} />
      </ChakraProvider>
    );

    fireEvent.click(screen.getByText("Next Page"));

    expect(pageChange).toHaveBeenCalledWith(expect.any(Function));
    expect(pageChange).toHaveBeenCalledTimes(1);
  });

  it("Changes the page when Prev Page is clicked", () => {
    const pageChange = jest.fn();
    render(
      <ChakraProvider>
        <Pagination currentPage={2} pageChange={pageChange} pageLimit={5} />
      </ChakraProvider>
    );

    fireEvent.click(screen.getByText("Previous Page"));

    expect(pageChange).toHaveBeenCalledWith(expect.any(Function));
    expect(pageChange).toHaveBeenCalledTimes(1);
  });

  it('disables "Previous Page" button when on the first page', () => {
    render(
      <ChakraProvider>
        <Pagination currentPage={1} pageChange={() => {}} pageLimit={5} />
      </ChakraProvider>
    );

    expect(screen.getByText("Previous Page")).toBeDisabled();
  });

  it('disables "Next Page" button when on the last page', () => {
    render(
      <ChakraProvider>
        <Pagination currentPage={5} pageChange={() => {}} pageLimit={5} />
      </ChakraProvider>
    );

    expect(screen.getByText("Next Page")).toBeDisabled();
  });
});
