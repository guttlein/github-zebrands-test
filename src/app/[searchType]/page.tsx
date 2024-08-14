"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { Octokit } from "octokit";
import { SearchBar } from "@components/SearchBar";
import { ResultsList } from "@components/ResultsList";
import useDebounce from "@hooks/useDebounce";
import {
  AbsoluteCenter,
  Button,
  Container,
  Flex,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useScreenDetector } from "@hooks/useScreenDetector";
import { FilterOptions } from "@components/FilterOptions";

type filterType = {
  per_page: number;
  page: number;
  order: string;
};

export default function Page({ params }: { params: { searchType: string } }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>([]);
  const [filters, setFilters] = useState<filterType>({
    per_page: 10,
    page: 1,
    order: "desc",
  });
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const { isMobile, isTablet } = useScreenDetector();
  const [showFilters, setShowFilters] = useState(false);

  const handlePageChange = (value: number) => {
    setFilters({ ...filters, page: value });
  };

  useDebounce(
    () => {
      const fetch = async () => {
        setLoading(true);
        const octokit = new Octokit();
        try {
          const result = await octokit.request(
            `GET /search/${params.searchType}`,
            {
              q: `${query}`,
              per_page: filters.per_page,
              page: filters.page,
              order: filters.order,
              headers: {
                "X-GitHub-Api-Version": "2022-11-28",
              },
            }
          );
          setTotalItems(result.data.total_count);
          setResults(result.data.items);
          setLoading(false);
        } catch (error: any) {
          console.log(`Error! Status: ${error.status}.`);
          setLoading(false);
        }
      };
      if (query !== "") {
        fetch();
      } else {
        setResults([]);
      }
    },
    [query, filters],
    800
  );

  return (
    <main className={styles.main}>
      <Heading
        as="h1"
        size={isMobile ? "xl" : isTablet ? "4xl" : "3xl"}
        pb={4}
        noOfLines={1}
      >
        Search for {params.searchType}
      </Heading>

      {/* Searchbar */}
      <Container padding={1} mt={20}>
        <SearchBar
          query={query}
          setQuery={setQuery}
          searchParameter={params.searchType}
        />
      </Container>

      {/* Filters */}

      <Flex mt={5} mb={5} direction="column" alignItems="center">
        <Button
          width="fit-content"
          onClick={() => {
            if (query !== "") {
              setShowFilters(!showFilters);
            }
          }}
        >
          Filters
        </Button>
        {/* Filter Options */}
        {showFilters && query !== "" ? (
          <FilterOptions
            filters={filters}
            setFilters={setFilters}
            totalItems={totalItems}
          />
        ) : null}
      </Flex>

      {/* Results */}
      {loading ? (
        <AbsoluteCenter p="4" color="white" axis="both">
          <Spinner
            mt={10}
            thickness="6px"
            speed="0.50s"
            emptyColor="gray.200"
            color="rgb(91, 153, 194)"
            size="xl"
          />
        </AbsoluteCenter>
      ) : (
        <ResultsList
          query={query}
          searchResultList={results}
          searchType={params.searchType}
          paginationData={{
            currentPage: filters.page,
            pageChange: handlePageChange,
            pageLimit: Math.ceil(totalItems / filters.per_page),
          }}
        />
      )}
    </main>
  );
}
