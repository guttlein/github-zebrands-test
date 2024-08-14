"use client";
import {
  AbsoluteCenter,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Input,
  Spacer,
} from "@chakra-ui/react";
import styles from "./page.module.css";
import { Link } from "@chakra-ui/next-js";
import { useScreenDetector } from "@hooks/useScreenDetector";
import { useState } from "react";

export default function Home() {
  const { isMobile, isTablet } = useScreenDetector();
  const [ghToken, setGhToken] = useState("");

  const saveToLocalStorage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    localStorage.setItem("ghToken", ghToken);
  };

  return (
    <main className={styles.main}>
      <Heading
        as="h1"
        size={isMobile ? "xl" : isTablet ? "4xl" : "3xl"}
        pb={4}
        noOfLines={1}
      >
        GitHub Search Engine
      </Heading>

      {/* GitHub Secret Token to use the API */}
      <Box bg="rgb(91, 153, 194)" m={10} p={4} color="white">
        <form onSubmit={saveToLocalStorage}>
          In order to use the GitHub API, you need to set you personal token.
          <Input
            mt={10}
            mb={4}
            placeholder="Token"
            color="rgb(249, 219, 186)"
            onChange={(e) => setGhToken(e.target.value)}
          />
          If you are not sure how to create your own token, please click
          <a
            target="_blank"
            href="https://github.com/settings/tokens"
            rel="noopener noreferrer"
          >
            HERE
          </a>
          <Input
            mt={10}
            mb={4}
            type="submit"
            color="rgb(249, 219, 186)"
            value="Save"
          />
        </form>
      </Box>

      {/* Main Search Options */}
      <Flex
        minWidth="max-content"
        flexDirection={isMobile ? "column" : isTablet ? "row" : "row"}
      >
        {/* Repositories Card */}
        <Link
          mb={isMobile ? 10 : 0}
          href="/repositories"
          color="rgb(249, 219, 186)"
          _hover={{ color: "rgb(249, 219, 186)" }}
        >
          <Card m={4} maxW={isMobile ? "sm" : isTablet ? "xl" : "xl"}>
            <CardBody>
              <Image
                maxH={isMobile ? "250px" : isTablet ? "400px" : "300px"}
                src="https://miro.medium.com/v2/resize:fit:512/1*w07Er4gPg8H2Ew-P0HhxNA.png"
                alt="gh repo icon"
                borderRadius="lg"
              />
            </CardBody>
            <CardFooter>
              <AbsoluteCenter bg="tomato" p="6" color="white" axis="horizontal">
                Repositories
              </AbsoluteCenter>
            </CardFooter>
          </Card>
        </Link>

        <Spacer />
        {/* Users Card */}
        <Link
          href="/users"
          color="rgb(249, 219, 186)"
          _hover={{ color: "rgb(249, 219, 186)" }}
        >
          <Card m={4} maxW={isMobile ? "sm" : isTablet ? "md" : "xl"}>
            <CardBody>
              <Image
                maxH={isMobile ? "250px" : isTablet ? "400px" : "300px"}
                src="https://static-00.iconduck.com/assets.00/brand-github-icon-2048x1998-kcg9swkt.png"
                alt="gh user icon"
                borderRadius="lg"
              />
            </CardBody>
            <CardFooter>
              <AbsoluteCenter bg="tomato" p="6" color="white" axis="horizontal">
                Users
              </AbsoluteCenter>
            </CardFooter>
          </Card>
        </Link>
      </Flex>
    </main>
  );
}
