"use client";
import {
  AbsoluteCenter,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Spacer,
} from "@chakra-ui/react";
import styles from "./page.module.css";
import { Link } from "@chakra-ui/next-js";
import { useScreenDetector } from "@hooks/useScreenDetector";

export default function Home() {
  const { isMobile, isTablet } = useScreenDetector();

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
                maxH={isMobile ? "250px" : isTablet ? "300px" : "300px"}
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
                maxH={isMobile ? "250px" : isTablet ? "300px" : "300px"}
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
