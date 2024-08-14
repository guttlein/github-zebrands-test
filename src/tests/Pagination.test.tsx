import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pagination } from "../components/Pagination";
import { ChakraProvider } from "@chakra-ui/react";

describe("Pagination Component", () => {
  it("Displays the current page", () => {
    render(
      <ChakraProvider>
        <Pagination currentPage={1} setPage={() => {}} pageLimit={5} />
      </ChakraProvider>
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("Changes the page when Next Page is clicked", () => {
    const setPage = jest.fn();
    render(
      <ChakraProvider>
        <Pagination currentPage={1} setPage={setPage} pageLimit={5} />
      </ChakraProvider>
    );

    fireEvent.click(screen.getByText("Next Page"));

    expect(setPage).toHaveBeenCalledWith(expect.any(Function));
    expect(setPage).toHaveBeenCalledTimes(1);
  });

  it("Changes the page when Prev Page is clicked", () => {
    const setPage = jest.fn();
    render(
      <ChakraProvider>
        <Pagination currentPage={2} setPage={setPage} pageLimit={5} />
      </ChakraProvider>
    );

    fireEvent.click(screen.getByText("Previous Page"));

    expect(setPage).toHaveBeenCalledWith(expect.any(Function));
    expect(setPage).toHaveBeenCalledTimes(1);
  });

  it('disables "Previous Page" button when on the first page', () => {
    render(
      <ChakraProvider>
        <Pagination currentPage={1} setPage={() => {}} pageLimit={5} />
      </ChakraProvider>
    );

    expect(screen.getByText("Previous Page")).toBeDisabled();
  });

  it('disables "Next Page" button when on the last page', () => {
    render(
      <ChakraProvider>
        <Pagination currentPage={5} setPage={() => {}} pageLimit={5} />
      </ChakraProvider>
    );

    expect(screen.getByText("Next Page")).toBeDisabled();
  });
});
