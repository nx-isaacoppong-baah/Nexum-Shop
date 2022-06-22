import type {
	IServicesAPIs
} from "~/types";

export default class LoaderHelper {
	private services: IServicesAPIs[];

	constructor (services: IServicesAPIs[]) {
		this.services = services;
	}
}
