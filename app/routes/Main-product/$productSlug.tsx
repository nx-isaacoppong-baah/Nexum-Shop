import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Factory from "~/scripts/factories/home";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";
import type { Story, APIQueryParams } from "~/types";
import { StoryVersions } from "~/enums";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.productSlug, `params.productSlug is required`);

  // const slug: string = params.productSlug;
  // const sbApiOptions: APIQueryParams = { version: StoryVersions.draft };

	// const unresolvedResponse = Factory.loaderProcessor()
  //   .processHomepageLoaderRequests(slug, sbApiOptions);
	// const resolvedResponse = await Promise.all(unresolvedResponse);
	// const response = Factory.loaderProcessor()
	// 	.processHomepageLoaderResponse(resolvedResponse);

  // response.story = Factory.storyModeller(response.story).story;

	return json({ story: {} });
};

export default function Product() {
  let story = useLoaderData<Story>();
  story = useStoryblokState(story);

  return <StoryblokComponent blok = { story.content.blok } />;
}
