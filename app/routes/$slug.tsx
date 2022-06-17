import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getStoryblokApi,
  useStoryblokState,
} from "@storyblok/react";

import { refineEndpoint } from "../scripts/utils/endpoints";

import {
	StoryVersions,
	StoriesEndpoints,
  Themes
  } from "../enums";

import type {
  StoryAPIQueryParams,
  PageResponseRawData,
  IPageStoryContent,
  Story,
  IStoryContent,
  ILogoComponent,
  IFeatureComponent,
  ITeaserComponent,
  RefinedLogos
} from "../types";

import { Feature } from "../components/Feature";
import { Teaser } from "~/components/Teaser";
import { Logos } from "~/components/Logos";

import type { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export const loader: LoaderFunction = async ({ params }) => {
  const slug = params?.slug ?? "homepage";
  const endpoint: string = refineEndpoint(StoriesEndpoints.__init__);
  const path: string = `${endpoint}/${slug}`;
  const sbApiOptions: StoryAPIQueryParams = {
		version: StoryVersions.draft
	};

  let response = await getStoryblokApi().get<PageResponseRawData>(path, sbApiOptions);

  if (!response.data) {
    throw new Response("Not Found", { status: 404 });
  }

  const story: Story = response.data.story;
  // map the story content of the response data
  const mappedStoryContent: Partial<IStoryContent<IPageStoryContent>> = {
    blok: {
      ...story.content
    }
  }

  story.content = mappedStoryContent;

  return json(story);
};

// Nav component
const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

// The homepage has a Page content type
export default function Page() {
  let story = useLoaderData<Story>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  story = useStoryblokState(story);
  
  const body = story.content.blok.body
  let logoComponent: ILogoComponent = { logos: [] }
  let about: Partial<IFeatureComponent> = {};
  let teaser: Partial<ITeaserComponent> = {};
  let refinedLogos: RefinedLogos = {}
  
  for (let blok of body) {
    if (blok.component.toLowerCase() === "logos") {
      logoComponent.logos.push(...blok.logos);
      logoComponent._editable = blok._editable;
    }

    if (blok.component.toLowerCase() === "feature" && blok.name.toLowerCase() === "about") {
      about = blok;
    }

    if (blok.component.toLowerCase() === "teaser") {
      teaser = blok;
    }
  }

  for (let logo of logoComponent.logos) {
    if (logo.title === Themes.dark) {
      refinedLogos.dark = {
        src: logo.filename,
        alt: logo.alt
      }
    }

    if (logo.title === Themes.light) {
      refinedLogos.light = {
        src: logo.filename,
        alt: logo.alt
      }
    }
  }
  refinedLogos._editable = logoComponent._editable

  // return <StoryblokComponent blok={story.content} />;

  const Links = ["Partners", "Products", "Blog", "FAQ"];
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Logos blok = { refinedLogos } />
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? 'Dark' : 'Light'} Mode
                  </Button>
                </MenuItem>
                <MenuDivider />
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>
          <Teaser blok = { teaser } />
          <Feature blok = { about } />
      </Box>
    </>
  );
}
