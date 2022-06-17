import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getStoryblokApi } from "@storyblok/react";

import type {
	AllProductsResponseRawData,
	IProductStoryContent,
	Story,
	StoryAPIQueryParams
} from "~/types";

import {
	StoryVersions,
	StoriesEndpoints
  } from "~/enums";

import Utilities from "~/scripts/utils";
import StoryHelpers from "~/scripts/helpers/story";

import { ProductListing } from "~/folders/ProductListing";

export const loader: LoaderFunction = async () => {
	const path: string = Utilities.removeTrailingSlash(StoriesEndpoints.__init__);
	const sbApiOptions: StoryAPIQueryParams = {
		starts_with: "Main-product",
		version: StoryVersions.draft
	};

	const storyblokApi = getStoryblokApi();
	const response = await storyblokApi.get<AllProductsResponseRawData>(path, sbApiOptions);

	if (!response.data) {
		throw new Response("Not Found", { status: 404 });
	}

	let stories: Story[] = response.data.stories;

	// map the story content of the response data
	stories = stories.map(story => {
		story.content = StoryHelpers.mapStoryContent<IProductStoryContent>(story);
		return story;
	});

	return json(stories);
}

export default function Listing() {
	const stories = useLoaderData<Story[]>();

	return <ProductListing stories = { stories } />
}
