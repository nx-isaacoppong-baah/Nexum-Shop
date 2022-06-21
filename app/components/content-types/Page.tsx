import type { FC } from "react";
import { StoryblokComponent } from "@storyblok/react";
import { Box, useColorModeValue } from "@chakra-ui/react";

import type { PageComponentProps } from "~/types";
import ComponentHelpers from "~/scripts/helpers/components";

import { Header } from "../internal/Header";


export const Page: FC<PageComponentProps> = ({ blok }: PageComponentProps): JSX.Element => {
	const refinedLinks = ComponentHelpers.getHeaderLinks(blok.body);
  const { logoComponent, features, teaser } = ComponentHelpers.processHomepageBloks(blok.body);
  const refinedImages = ComponentHelpers.refineImages(logoComponent.logos);
  const refinedLogos = ComponentHelpers.refineLogoComponent(logoComponent, refinedImages);

  return (
    <>
        {/* Header */}
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Header links = { refinedLinks } logos = { refinedLogos } />
        </Box>

        {/* Main */}
        <Box p={4}>
            <StoryblokComponent blok = { teaser } />
            {
              Array.from(features.values()).map((feature) => (
                <StoryblokComponent blok = { feature } key = { feature._uid } />
              ))
            }
        </Box>

        {/* Footer */}
    </>

  );
};
