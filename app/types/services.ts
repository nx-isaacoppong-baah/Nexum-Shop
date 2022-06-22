import type { APIQueryParams } from "./common";

export interface IServicesAPIs {
	getOne: (slug?: string, queries?: APIQueryParams) => Promise<any>
}
