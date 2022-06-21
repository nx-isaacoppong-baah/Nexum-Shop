import type { IImageFieldType,  } from "./field";
import type { IBasicStoryFields } from "./story";
import type { IPageStoryContent } from "./data/page";

export interface ILogoComponent extends Partial<IBasicStoryFields> {
	logos: IImageFieldType[]
}

export type LogoComponentProps = {
	blok: IRefinedLogos
}

export interface IFeatureComponent extends IBasicStoryFields {
	id: string
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

export interface IRefinedLogos extends Partial<IBasicStoryFields> {
	light?: ImageProps
	dark?: ImageProps
}

export interface IGridComponent extends Partial<IBasicStoryFields> {
	columns: Array<any>
}

export type GridComponentProps = {
	bloks: IGridComponent
}

export type PageComponentProps = {
	blok: IPageStoryContent
}

export type HeaderComponentProps = {
	links: Map<string, RefinedCategory>
	logos: IRefinedLogos
}

interface ImageProps {
	src: string
	alt: string
}

export interface ICatalogGridComponent extends IBasicStoryFields {
	categories: ICategoryComponent[]
	columns?: ICategoryComponent[]
}

export interface ICategoryComponent extends IBasicStoryFields {
	id: string
	name?: string
	full_slug?: string
}

export type CountrySelectorProps = {
	selectedLocale: string
	rendered: boolean
}

export type RefinedCategory = Partial<Pick<ICategoryComponent, "name" | "full_slug" | "_editable" | "_uid">>