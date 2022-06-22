import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getStoryblokApi } from "@storyblok/react";
import { StoryVersions, StoriesEndpoints } from "~/enums";
import algorithms from "~/scripts/utils/algorithms";
import { ProductListing } from "~/folders/ProductListing";
import Factory from "~/scripts/factories/home";

import type {
	AllProductsResponseRawData,
	Story,
	APIQueryParams
} from "~/types";

export const loader: LoaderFunction = async () => {
	// const path: string = algorithms.removeTrailingSlash(StoriesEndpoints.stories);
	// const sbApiOptions: APIQueryParams = {
	// 	starts_with: "Main-product",
	// 	version: StoryVersions.draft
	// };

	// const storyblokApi = getStoryblokApi();
	// const response = await storyblokApi.get<AllProductsResponseRawData>(path, sbApiOptions);

	// if (!response.data) {
	// 	throw new Response("Not Found", { status: 404 });
	// }

	// let stories: Story[] = response.data.stories;

	// map the story content of the response data
	// stories = stories.map(story => Factory.storyModeller(story).story);

	return json({ stories: [{}] });
}

export default function Listing() {
	const stories = useLoaderData<Story[]>();

	return <ProductListing stories = { stories } />
}
