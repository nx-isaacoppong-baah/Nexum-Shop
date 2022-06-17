import { StoryblokComponent } from "@storyblok/react";
import type { FC } from "react";
import type { HeaderComponentProps } from "~/types";
import { Themes } from "~/enums";

// This component is not from storyblok
import { NavLink } from "~/components/internal/NavLink";

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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export const Header: FC<HeaderComponentProps> = ({ logos, links }: HeaderComponentProps): JSX.Element => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
				<IconButton
				size={'md'}
				icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
				aria-label={'Open Menu'}
				display={{ md: 'none' }}
				onClick={isOpen ? onClose : onOpen}
				/>
				<HStack spacing={8} alignItems={'center'}>
					<StoryblokComponent blok = { logos } />
					<HStack
						as={'nav'}
						spacing={4}
						display={{ base: 'none', md: 'flex' }}>
						{links.map((link) => (
						<NavLink key={link}> { link } </NavLink>
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
							{colorMode === Themes.light ? Themes.dark : Themes.light} Mode
							</Button>
						</MenuItem>
						<MenuDivider />
						</MenuList>
					</Menu>
				</Flex>
			</Flex>

			{
				isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
					<Stack as={'nav'} spacing={4}>
						{links.map((link) => (
						<NavLink key={link}>{link}</NavLink>
						))}
					</Stack>
					</Box>
				) : null
			}
		</>
	);
};







