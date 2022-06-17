import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent
} from "@storyblok/react";

import type {
  ProductResponseRawData,
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

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.productSlug, `params.productSlug is required`);

  const slug: string = params.productSlug;
  const productsEndpoint = Utilities.removeTrailingSlash(StoriesEndpoints.products);

  const path: string = `${productsEndpoint}/${slug}`;
  const sbApiOptions: StoryAPIQueryParams = { version: StoryVersions.draft }
  
  const storyblokApi = getStoryblokApi();
  const response = await storyblokApi.get<ProductResponseRawData>(path, sbApiOptions);

  if (!response.data) {
    throw new Response("Not Found", { status: 404 });
  }

  const story: Story = response.data.story;
  story.content = StoryHelpers.mapStoryContent<IProductStoryContent>(story);

  return json(story);
};

export default function Product() {
  let story = useLoaderData<Story>();
  story = useStoryblokState(story);

  return <StoryblokComponent blok = { story.content.blok } />;
}
