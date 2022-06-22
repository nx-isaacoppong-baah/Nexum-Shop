import Services from "./service";
import { StoriesEndpoints } from "~/enums";

import type {
  APIQueryParams,
  StoryResponseRawData,
  Story,
  IServicesAPIs
} from "~/types";

export default class StoryServices extends Services implements IServicesAPIs {
	private static ENDPOINT = StoriesEndpoints.stories;

	public async getOne(slug?: string, queries?: APIQueryParams)
	: Promise<Story> {
		const response = await this.get<StoryResponseRawData>(StoryServices.ENDPOINT, slug, queries);
	  
		if (!response.data) {
		  throw new Response("Not Found", { status: 404 });
		}

		return response.data.story;
	}
}
