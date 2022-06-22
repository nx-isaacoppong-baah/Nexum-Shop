import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";
import Factory from "~/scripts/factories/home";
import HomepageLoader from "~/scripts/loaders/home";

import type { PageResponseData, APIQueryParams } from "~/types";
import { StoryVersions } from "~/enums";

export const loader: LoaderFunction = async ({ params, request }) => {
  const localCookie = Factory.serverCookies().getCurrentLocalFromCookies(request);

  if (localCookie) {
    return redirect(`/${localCookie.trim()}`);
  }

  const sbApiOptions: APIQueryParams = {
		version: StoryVersions.draft,
	};
  
  const response = await HomepageLoader.getLoaderData(params, sbApiOptions, Factory);

  return json<PageResponseData>(response);
};

export default function Page() {
  let { story } = useLoaderData<PageResponseData>();
  story = useStoryblokState(story);

  return (
    <StoryblokComponent blok = { story.content.blok } />
  )
}
