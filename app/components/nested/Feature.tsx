import { storyblokEditable } from "@storyblok/react";
import type { FeatureComponentProps } from "~/types/component";
import type { FC } from "react";

import {
  Box,
  Heading,
  Text,
  Center
} from "@chakra-ui/react";

export const Feature: FC<FeatureComponentProps> = ({ blok }: FeatureComponentProps): JSX.Element => {
  return (
    <Center h="100px">
      <Box {...storyblokEditable(blok)} p={5} shadow="md" borderWidth="1px">
        <Heading fontSize="xl"> {blok.title} </Heading>
        <Text mt={4}> {blok.description} </Text>
      </Box>
    </Center>
  );
};
