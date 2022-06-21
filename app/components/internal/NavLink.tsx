import type { FC } from "react";
import { storyblokEditable } from "@storyblok/react";
import { Link, useColorModeValue } from '@chakra-ui/react';
import type { RefinedCategory } from "~/types";

export const NavLink: FC<{ link: RefinedCategory }> = ({ link }
: { link: RefinedCategory }): JSX.Element => {
	return (
		<Link {...storyblokEditable(link)}
			px={2}
			py={1}
			rounded={'md'}
			_hover={{
			textDecoration: 'none',
			bg: useColorModeValue('gray.200', 'gray.700'),
			}}
			href = { link.full_slug }>
			{ link.name }
		</Link>
	);
};
