import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Flex, Spacer, Center } from "@chakra-ui/react";
import { useScreenDetector } from "@hooks/useScreenDetector";
import React from "react";

type pageProps = {
  currentPage: number;
  pageChange: (value: number) => void;
  pageLimit: number;
};

export const Pagination = ({
  currentPage,
  pageChange,
  pageLimit,
}: pageProps) => {
  const { isMobile } = useScreenDetector();

  const handleClick = (origin: string) => {
    if (origin === "next" && currentPage < pageLimit) {
      pageChange(currentPage + 1);
    }
    if (origin === "prev" && currentPage > 1) {
      pageChange(currentPage - 1);
    }
  };

  return (
    <Flex mb={4} mt={4}>
      <Button
        isDisabled={currentPage > 1 ? false : true}
        leftIcon={<ChevronLeftIcon />}
        colorScheme="blue"
        variant="solid"
        onClick={() => handleClick("prev")}
        width={isMobile ? 20 : 40}
      >
        {isMobile ? "" : "Previous Page"}
      </Button>
      <Spacer />
      <Center
        bg="rgb(91, 153, 194)"
        h="40px"
        minW={40}
        color="white"
        role="textbox"
      >
        {currentPage} ... {pageLimit}
      </Center>
      <Spacer />
      <Button
        isDisabled={currentPage == pageLimit ? true : false}
        rightIcon={<ChevronRightIcon />}
        colorScheme="blue"
        variant="solid"
        onClick={() => handleClick("next")}
        width={isMobile ? 20 : 40}
      >
        {isMobile ? "" : "Next Page"}
      </Button>
    </Flex>
  );
};
