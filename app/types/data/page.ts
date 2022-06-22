import type { StoryDecoratedContent, IBasicStoryFields } from "../story";
import type { Space } from "../space";

export type PageResponseData = {
	story: StoryDecoratedContent | any
	space: Space | any
}

export interface IPageStoryContent extends IBasicStoryFields {
	body: Array<any>
}
