import { StoryblokComponent } from "@storyblok/react";
import type { GridComponentProps } from "~/types";
import type { FC } from "react";

import {
  List,
  ListItem,
} from '@chakra-ui/react';

export const Grid: FC<GridComponentProps> = ({ bloks }: GridComponentProps): JSX.Element => {
  return (
    <List spacing={3}>
      {
        bloks.columns.map(blok => (
          <ListItem key = { blok._uid }>
            <StoryblokComponent blok = { blok } key = { blok._uid }  />
          </ListItem>
        ))
      }
    </List>
  );
};
