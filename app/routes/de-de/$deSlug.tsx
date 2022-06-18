import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent
} from "@storyblok/react";

import Utilities from "~/scripts/utils";
import StoryHelpers from "~/scripts/helpers/story";

import {
	StoryVersions,
	StoriesEndpoints,
} from "~/enums";

import type {
	StoryAPIQueryParams,
	PageResponseRawData,
	IPageStoryContent,
	Story
} from "~/types";

export const loader: LoaderFunction = async ({ params }) => {
	const slug = params?.deSlug ?? "startseite";
	const endpoint: string = Utilities.removeTrailingSlash(StoriesEndpoints.__init__);
	const path: string = `${endpoint}/${slug}`;
	const sbApiOptions: StoryAPIQueryParams = {
		version: StoryVersions.draft,
		language: "de-de",
	};

	let response = await getStoryblokApi().get<PageResponseRawData>(path, sbApiOptions);
		if (!response.data) {
		throw new Response("Not Found", { status: 404 });
	}

	const story: Story = response.data.story;
	story.content = StoryHelpers.mapStoryContent<IPageStoryContent>(story);

	return json(story);
};

export default function Page() {
	let story = useLoaderData<Story>();
	story = useStoryblokState(story);

	return (
		<StoryblokComponent blok = { story.content.blok } />
	)
}
