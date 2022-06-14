import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  getStoryblokApi,
  useStoryblokState,
  StoryblokComponent
} from "@storyblok/react";
import dotenv from "dotenv";

export const loader = async ({ params }) => {
  dotenv.config();

  const slug = params.slug ?? "home";

  let { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, {
    version: "draft",
  });

  return json(data?.story);
};

export default function Page() {
  let story = useLoaderData();

  story = useStoryblokState(story);

  return <StoryblokComponent blok={story.content} />;
}
