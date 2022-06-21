import { storyblokEditable } from "@storyblok/react";
import type { TeaserComponentProps } from "~/types";
import { Heading, Center } from "@chakra-ui/react";
import type { FC } from "react";


export const Teaser: FC<TeaserComponentProps> = ({ blok }: TeaserComponentProps): JSX.Element => {
  return (
    <Center h="100px">
        <Heading {...storyblokEditable(blok)} size="lg" fontSize="40px" key={blok._uid}>
          { blok.headline }
        </Heading>
    </Center>
  );
};
