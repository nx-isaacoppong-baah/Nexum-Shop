import { storyblokEditable } from "@storyblok/react";
import type { LogoComponentProps } from "~/types";
import { Image, useColorMode } from "@chakra-ui/react";
import type { FC } from "react";
import { Themes } from "~/enums";


export const Logos: FC<LogoComponentProps> = ({ blok }: LogoComponentProps): JSX.Element => {
	const { colorMode } = useColorMode();
	return (
		<>
			{
				colorMode === Themes.light
				? <Image {...storyblokEditable(blok)} boxSize={"120px"}  objectFit={'contain'} src={blok?.dark?.src} alt={blok?.dark?.alt} />
				: <Image {...storyblokEditable(blok)} boxSize={"120px"}  objectFit={'contain'} src={blok?.light?.src} alt={blok?.light?.alt} />
			}
		</>
	);
};
