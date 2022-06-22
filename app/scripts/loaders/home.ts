import type {
	APIQueryParams,
	PageResponseData
} from "~/types";

import type { Params } from "react-router";
import constants from "~/scripts/factories/constants";

export default class HomepageLoader {
	public static async getLoaderData(params: Params, queries: APIQueryParams, factory: any) {
		const slug = params?.slug ?? constants.homepageEnglish;
	  
		const unresolvedResponse = factory.loaderProcessor().processHomepageLoaderRequests(slug, queries);
		const resolvedResponse = await Promise.all(unresolvedResponse);
	  
		const storyModel = factory.storyModeller(resolvedResponse);
		const spaceModel = factory.spaceModeller(resolvedResponse);
	  
		const response: PageResponseData = {
		  story: storyModel?.story,
		  space: spaceModel?.space
		};

		return response;
	}
}
