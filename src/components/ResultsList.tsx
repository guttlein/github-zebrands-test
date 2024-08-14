import { Container } from "@chakra-ui/react";
import React from "react";
import { SearchCard } from "./SearchCard";
import { Pagination } from "./Pagination";

type resultType = {
  name: string;
  html_url: string;
  avatar_url: string;
  login: string;
  owner: any;
  id: string;
  description?: string;
  btnText: string;
};

export const ResultsList = ({
  query,
  searchResultList,
  searchType,
  paginationData,
}: any) => {
  return (
    <Container>
      {/* Top Pagination */}
      {searchResultList.length > 0 && <Pagination {...paginationData} />}

      {/* Search Results */}
      {searchResultList.map((result: resultType) => (
        <SearchCard
          key={result.id}
          result={
            searchType === "repositories"
              ? {
                  id: result.id,
                  avatar: result.owner.avatar_url,
                  query,
                  title: result.name,
                  description: result.description || "",
                  html_url: result.html_url,
                  btnText: "Repository",
                }
              : {
                  id: result.id,
                  avatar: result.avatar_url,
                  query,
                  title: result.login,
                  html_url: result.html_url,
                  btnText: "Profile",
                }
          }
        />
      ))}
      {/* Bottom Pagination */}
      {searchResultList.length > 0 && <Pagination {...paginationData} />}
    </Container>
  );
};
