import type { Story, IBasicStoryFields } from "../story";
import type { IImageFieldType } from "../field";

export type ProductResponseRawData = {
	data: {
		story: Story,
		cv: number
		rels: string[]
		links: string[]
	}
}

export type AllProductsResponseRawData = {
	data: {
		stories: Story[]
	}
}

export type ProductListingProps = {
	stories: Story[]
}

export interface IProductStoryContent extends IBasicStoryFields {
	name?: string
	sku?: string
	price?: number
	description?: string
	images?: IImageFieldType[]
}
