import type { Story, IStoryContent } from "~/types";

export default class StoryHelpers {
	public static mapStoryContent<ComponentStoryContent = any>(story: Story)
	: Partial<IStoryContent<ComponentStoryContent>> {
		const mappedStoryContent: Partial<IStoryContent<ComponentStoryContent>> = {
		  blok: {
			...story.content
		  }
		}

		return mappedStoryContent;
	}
}
