import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getStoryblokApi } from "@storyblok/react";

import type {
	AllProductsResponseRawData,
	IProductStoryContent,
	Story,
	IStoryContent,
	StoryAPIQueryParams
} from "../../types";

import {
	StoryVersions,
	StoriesEndpoints
  } from "../../enums";

import { refineEndpoint } from "../../scripts/utils/endpoints";

import { ProductListing } from "../../folders/ProductListing";

export const loader: LoaderFunction = async () => {
	const path: string = refineEndpoint(StoriesEndpoints.__init__);
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
		const mappedStoryContent: Partial<IStoryContent<IProductStoryContent>> = {
			blok: {
				...story.content
			}
		}

		story.content = mappedStoryContent;
		return story;
	});


	return json(stories);
}

export default function Listing() {
	const stories = useLoaderData<Story[]>();

	return <ProductListing stories = { stories } />
}
