import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";
import { StoryVersions } from "~/enums";
import type { StoryAPIQueryParams, Story } from "~/types";
import LoaderHelper from "~/scripts/helpers/loader";

export const loader: LoaderFunction = async ({ params }) => {
	const slug = params?.deSlug ?? "startseite";
	const sbApiOptions: StoryAPIQueryParams = {
		version: StoryVersions.draft,
		language: "de-de",
	};
  
	const story = await LoaderHelper.processHomepageLoader(slug, sbApiOptions);

	return json(story);
};

export default function Page() {
	let story = useLoaderData<Story>();
	story = useStoryblokState(story);

	return (
		<StoryblokComponent blok = { story.content.blok } />
	)
}
