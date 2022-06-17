import type { FC } from "react";
import { StoryblokComponent } from "@storyblok/react";
import { Box, useColorModeValue } from "@chakra-ui/react";

import type { PageComponentProps } from "~/types";
import ComponentHelpers from "~/scripts/helpers/components";

// This component is not from storyblok
import { Header } from "../internal/Header";


export const Page: FC<PageComponentProps> = ({ blok }: PageComponentProps): JSX.Element => {
	const links = ["Partners", "Products", "Blog", "FAQ"];

  const { logoComponent, about, teaser } = ComponentHelpers.processHomepageBloks(blok.body);
  const refinedImages = ComponentHelpers.refineImages(logoComponent.logos);
  const refinedLogos = ComponentHelpers.refineLogoComponent(logoComponent, refinedImages);

  return (
    <>
        {/* Header */}
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Header links = { links } logos = { refinedLogos } />
        </Box>

        {/* Main */}
        <Box p={4}>
            <StoryblokComponent blok = { teaser } />
            <StoryblokComponent blok = { about } />
        </Box>

        {/* Footer */}
    </>

  );
};
