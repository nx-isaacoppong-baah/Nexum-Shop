import { getStoryblokApi } from "@storyblok/react";
import { StoriesEndpoints } from "~/enums";
import Utilities from "~/scripts/utils";
import StoryHelpers from "~/scripts/helpers/story";

import type {
  StoryAPIQueryParams,
  PageResponseRawData,
  IPageStoryContent,
  Story
} from "~/types";

export default class LoaderHelper {
	public static async processHomepageLoader(slug: string, queries: StoryAPIQueryParams)
	: Promise<Story> {
		const endpoint: string = StoriesEndpoints.__init__;
		return this.processLoader(endpoint, slug, queries);
	}

	private static async processLoader(endpoint: string, slug: string, queries: StoryAPIQueryParams)
	: Promise<Story> {
		const url: string = Utilities.removeTrailingSlash(endpoint);
		const path: string = `${url}/${slug}`;
	  
		let response = await getStoryblokApi().get<PageResponseRawData>(path, queries);
		if (!response.data) {
		  throw new Response("Not Found", { status: 404 });
		}
	  
		const story: Story = response.data.story;  
		story.content = StoryHelpers.mapStoryContent<IPageStoryContent>(story);

		return story;
	}
}
