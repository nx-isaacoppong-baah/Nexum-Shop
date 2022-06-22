import EventHelpers from "../helpers/event";
import HomeLoaderHelper from "../helpers/loaders/home";
import CookiesHelper from "../helpers/cookies";

import StoryServices from "../services/story";
import SpaceServices from "../services/space";
import CookieUtilities from "../services/cookies";

import StoryModel from "~/models/story/fullStory";
import SpaceModel from "~/models/space/fullSpace";

export default class HomeFactory {
	public static browserCookies() {
		const cookies = new CookieUtilities();
		return new EventHelpers(cookies);
	}

	public static serverCookies() {
		const cookie = new CookieUtilities();
		return new CookiesHelper(cookie);
	}

	public static loaderProcessor(): HomeLoaderHelper {
		const services = [
			new StoryServices(),
			new SpaceServices()
		]

		return new HomeLoaderHelper(services);
	}

	public static storyModeller(services: any[]): Partial<StoryModel> {
		let storyModel: Partial<StoryModel> = {};

		for (let service of services) {
			if (service.hasOwnProperty("content")) {
				storyModel = new StoryModel(service);
			}
			break;
		}

		return storyModel;
	}
	
	public static spaceModeller(services: any[]): Partial<SpaceModel> {
		let spaceModel: Partial<SpaceModel> = {};

		for (let service of services) {
			if (service.hasOwnProperty("id") && service.hasOwnProperty("version")) {
				spaceModel = new SpaceModel(service);
				break;
			}
		}

		return spaceModel;
	}
}
