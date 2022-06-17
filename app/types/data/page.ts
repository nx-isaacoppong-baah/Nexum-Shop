import type { Story, IBasicStoryFields } from "../story";

export type PageResponseRawData = {
	data: {
		story: Story,
		cv: number
		rels: string[]
		links: string[]
	}
}

export interface IPageStoryContent extends IBasicStoryFields {
	body: Array<any>
}
