import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Highlight,
  Image,
  Stack,
} from "@chakra-ui/react";

type resultProps = {
  html_url: string;
  id: string;
  avatar: string;
  query: string | string[];
  title: string;
  description?: string;
  btnText: string;
};

type props = {
  result: resultProps;
};

export const SearchCard = ({ result }: props) => {
  return (
    <Card
      key={result.id}
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      mb={2}
      p={2}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src={result.avatar}
        alt="Avatar"
        borderRadius="full"
      />

      <Stack>
        <CardBody>
          <Heading size="md">
            <Highlight
              query={result.query}
              styles={{
                color: "rgb(91, 153, 194)",
              }}
            >
              {result.title}
            </Highlight>
          </Heading>

          <Highlight
            query={result.query}
            styles={{
              color: "rgb(91, 153, 194)",
            }}
          >
            {result.description || ""}
          </Highlight>
        </CardBody>

        <CardFooter>
          <a target="_blank" href={result.html_url} rel="noopener noreferrer">
            <Button variant="solid" colorScheme="blue">
              Go to {result.btnText}
            </Button>
          </a>
        </CardFooter>
      </Stack>
    </Card>
  );
};
