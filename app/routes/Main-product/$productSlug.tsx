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
  IStoryContent,
  StoryAPIQueryParams
} from "../../types";

import {
  StoryVersions,
  StoriesEndpoints
} from "../../enums";

import { refineEndpoint } from "../../scripts/utils/endpoints";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.productSlug, `params.productSlug is required`);

  const slug: string = params.productSlug;
  const productsEndpoint = refineEndpoint(StoriesEndpoints.products);

  const path: string = `${productsEndpoint}/${slug}`;
  const sbApiOptions: StoryAPIQueryParams = { version: StoryVersions.draft }
  
  const storyblokApi = getStoryblokApi();
  const response = await storyblokApi.get<ProductResponseRawData>(path, sbApiOptions);

  if (!response.data) {
    throw new Response("Not Found", { status: 404 });
  }

  const story: Story = response.data.story;
  // map the story content of the response data
  const mappedStoryContent: Partial<IStoryContent<IProductStoryContent>> = {
    blok: {
      ...story.content
    }
  }

  story.content = mappedStoryContent;

  return json(story);
};

export default function Product() {
  let story = useLoaderData<Story>();
  story = useStoryblokState(story);

  return <StoryblokComponent blok = { story.content.blok } />;
}
