import { getStoryblokApi } from "@storyblok/react";
import algorithms from "~/scripts/utils/algorithms";
import type { APIQueryParams } from "~/types";

export default abstract class Services {
	protected async get<T>(endpoint: string, slug: string = "", queries: APIQueryParams = {})
	: Promise<T> {
		const url: string = algorithms.removeTrailingSlash(endpoint);
		const path: string = `${url}/${slug}`;

		if (!queries) {
			return getStoryblokApi().get<T>(path);
		}
	  
		return getStoryblokApi().get<T>(path, queries);
	}
}
