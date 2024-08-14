import { render, screen } from "@testing-library/react";
import { ResultsList } from "@components/ResultsList";
import "@testing-library/jest-dom";

describe("ResultsList", () => {
  const query = "test query";
  const paginationData = { currentPage: 1, totalPages: 5 };

  it("renders SearchCard components for each search result", () => {
    const searchResults = [
      {
        id: "1",
        name: "Repo1",
        html_url: "",
        avatar_url: "",
        login: "",
        owner: {},
        btnText: "Repo",
      },
      {
        id: "2",
        name: "Repo2",
        html_url: "",
        avatar_url: "",
        login: "",
        owner: {},
        btnText: "Repo",
      },
    ];

    render(
      <div data-testid={`search-card-${searchResults[0].id}`}>
        {searchResults[0].name}
      </div>
    );
    render(
      <div data-testid={`search-card-${searchResults[1].id}`}>
        {searchResults[1].name}
      </div>
    );

    render(
      <ResultsList
        query={query}
        searchResultList={searchResults}
        searchType="repositories"
        paginationData={paginationData}
      />
    );

    expect(screen.getByTestId("search-card-1")).toHaveTextContent("Repo1");
    expect(screen.getByTestId("search-card-2")).toHaveTextContent("Repo2");
  });
});
