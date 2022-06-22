import type { Story, StoryDecoratedContent } from "~/types";

export abstract class StoryDecorators {
	protected apiStory: Story;

	constructor (apiStory: Story) {
		this.apiStory = apiStory;
	}

	protected blokContent (): StoryDecoratedContent {
		return {
			blok: { ...this.apiStory.content }
		}
	}
}
