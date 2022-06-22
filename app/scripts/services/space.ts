import Services from "./service";
import { StoriesEndpoints } from "~/enums";


import type { IServicesAPIs, SpaceResponseRawData, Space } from "~/types";

export default class SpaceServices extends Services implements IServicesAPIs {
	private static ENDPOINT = StoriesEndpoints.spaces;

	public async getOne(): Promise<Space> {
		const response = await this.get<SpaceResponseRawData>(SpaceServices.ENDPOINT);
	  
		if (!response.data) {
		  throw new Response("Not Found", { status: 404 });
		}

		return response.data.space;
	}
}
