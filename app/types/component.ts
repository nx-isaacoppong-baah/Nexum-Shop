import type { IImageFieldType,  } from "./field";
import type { IBasicStoryFields } from "./story";

export interface ILogoComponent extends Partial<IBasicStoryFields> {
	logos: IImageFieldType[]
}

export type LogoComponentProps = {
	blok: RefinedLogos
}

export interface IFeatureComponent extends IBasicStoryFields {
	name: string
	title: string
	description: string
}

export type FeatureComponentProps = {
	blok: Partial<IFeatureComponent>
}

export interface ITeaserComponent extends IBasicStoryFields {
	headline: string
}

export type TeaserComponentProps = {
	blok: Partial<ITeaserComponent>
}

export type RefinedLogos = {
	light?: ImageProps
	dark?: ImageProps,
	_editable?: string
}

interface ImageProps {
	src: string
	alt: string
}
