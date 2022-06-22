import type { Story, StoryDecoratedContent } from "~/types";
import { StoryDecorators } from "./decorator";

export default class StoryModel extends StoryDecorators {
	private modelledStory: Partial<Story<StoryDecoratedContent>> = {};

	constructor (apiStory: Story) {
		super(apiStory);
		this.model();
	}

	private model() {
		this.modelledStory = {
			content: this.blokContent()
		};
	}

	public get story(): Partial<Story<StoryDecoratedContent>> {
		return this.modelledStory;
	}
}
