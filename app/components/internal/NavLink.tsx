import type { ReactNode, FC } from "react";
import { Link, useColorModeValue } from '@chakra-ui/react';

export const NavLink: FC<any> = ({ children }: { children: ReactNode }): JSX.Element => {
	return (
		<Link
			px={2}
			py={1}
			rounded={'md'}
			_hover={{
			textDecoration: 'none',
			bg: useColorModeValue('gray.200', 'gray.700'),
			}}
			href={'#'}>
			{ children }
		</Link>
	);
};
