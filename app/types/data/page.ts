import type { Story, IBasicStoryFields } from "../story";
import type { ILogoComponent, ITeaserComponent, IFeatureComponent } from "../component";

export type PageResponseRawData = {
	data: {
		story: Story,
		cv: number
		rels: string[]
		links: string[]
	}
}

// The order of the tuple matters. It must be the same as the order of the API response from storyblok
export interface IPageStoryContent extends IBasicStoryFields {
	body: [ILogoComponent, IFeatureComponent, ITeaserComponent]
}
