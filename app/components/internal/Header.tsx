import React from "react";
import type { FC } from "react";
import { StoryblokComponent } from "@storyblok/react";
import type { HeaderComponentProps } from "~/types";
import { Themes } from "~/enums";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Category } from "~/components/nested/Category";
import { CountrySelector } from "./CountrySelector";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorMode,
  Stack,
} from "@chakra-ui/react";

export const Header: FC<HeaderComponentProps> = ({ logos, links }: HeaderComponentProps)
: JSX.Element => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
	<>
		<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
			<IconButton size={"md"} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
				aria-label={"Open Menu"} display={{ md: "none" }} onClick={isOpen ? onClose : onOpen}
			/>
			<HStack spacing={8} alignItems={"center"}>
				<StoryblokComponent blok = { logos } />
				<HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
					{
						Array.from(links.values()).map((link) => (
							<Category key = { link._uid } link = { link }> { link } </Category>
						))
					}
				</HStack>
			</HStack>
			<Flex alignItems={"center"}>
				<CountrySelector />
				<Button onClick={toggleColorMode}>
					{ colorMode === Themes.light ? <MoonIcon w={6} h={6} /> : <SunIcon w={6} h={6} /> }
				</Button>
				<Menu>
					<MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
						<Avatar size={"sm"} src={ "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib="
							+ "rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"}/>
					</MenuButton>
					<MenuList>
						<MenuItem>

						</MenuItem>
						<MenuDivider />
					</MenuList>
				</Menu>
			</Flex>
		</Flex>

		{
			isOpen ? (
				<Box pb={4} display={{ md: "none" }}>
					<Stack as={"nav"} spacing={4}>
						{
							Array.from(links.values()).map((link) => (
								<Category key = { link._uid } link = { link }> { link } </Category>
							))
						}
					</Stack>
				</Box>
			) : null
		}
	</>
	);
};







