import { Dispatch, SetStateAction } from "react";
import {
  Container,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

type props = {
  query: string | number | readonly string[] | undefined;
  setQuery: Dispatch<SetStateAction<string>>;
  searchParameter: string;
};

export const SearchBar = ({ query, setQuery, searchParameter }: props) => {
  const handleSearch = (e: { target: { value: SetStateAction<string> } }) =>
    setQuery(e.target.value);

  return (
    <Container maxW="md" centerContent>
      <InputGroup size="sm">
        <Input
          placeholder={`Search for ${searchParameter}`}
          size="md"
          value={query}
          onChange={handleSearch}
        />
        <InputRightElement pt={2}>
          <SearchIcon role="img" color="rgb(249, 219, 186)" />
        </InputRightElement>
      </InputGroup>
    </Container>
  );
};
