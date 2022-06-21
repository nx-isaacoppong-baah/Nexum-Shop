import { json, redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";

import { StoryVersions } from "~/enums";
import type { StoryAPIQueryParams, Story } from "~/types";
import LoaderHelpers from "~/scripts/helpers/loader";

export const loader: LoaderFunction = async ({ params, request }) => {
  const localCookie = LoaderHelpers.getCurrentLocalFromCookies(request);

  if (localCookie) {
    return redirect(`/${localCookie.trim()}`);
  }
  
  const slug = params?.slug ?? "homepage";
  const sbApiOptions: StoryAPIQueryParams = {
    version: StoryVersions.draft
  };

  const story = await LoaderHelpers.processHomepageLoader(slug, sbApiOptions);

  return json(story);
};

export default function Page() {
  let story = useLoaderData<Story>();
  story = useStoryblokState(story);

  return (
    <StoryblokComponent blok = { story.content.blok } />
  )
}
