import type {
	APIQueryParams,
	IServicesAPIs
} from "~/types";

export default class HomepageLoaderHelper {
	private services: IServicesAPIs[];

	constructor (services: IServicesAPIs[]) {
		this.services = services;
	}

	private processHomepageLoaderRequests(slug: string, queries: APIQueryParams): Promise<any>[] {
		let responses: any[] = [];

		this.services.forEach((service) => {
			let response = service.getOne(slug, queries);
			responses.push(response);
		});

		return responses;
	}
}
