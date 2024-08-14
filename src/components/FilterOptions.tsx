import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const FilterOptions = ({ filters, setFilters, totalItems }) => {
  const [sliderValue, setSliderValue] = useState(filters.per_page);

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  const handlePerPageChange = (val: number) => {
    setFilters((prevState) => ({
      ...prevState,
      per_page: val,
    }));
  };

  return (
    <Flex direction="column">
      <Box>
        {/* Per Page Filter */}
        <Text mt={4} mb={4}>
          How many items per page?
        </Text>
        <Slider
          mt={10}
          aria-label="slider-ex-6"
          min={1}
          max={totalItems}
          defaultValue={sliderValue}
          onChange={(val) => setSliderValue(val)}
          onChangeEnd={(val) => handlePerPageChange(val)}
        >
          <SliderMark value={sliderValue} {...labelStyles}>
            {sliderValue}
          </SliderMark>
          <SliderMark value={totalItems} {...labelStyles}>
            {totalItems}
          </SliderMark>
          <SliderMark
            value={sliderValue}
            textAlign="center"
            bg="blue.500"
            color="white"
            mt="-10"
            ml="-5"
            w="12"
          >
            {sliderValue}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </Flex>
  );
};
