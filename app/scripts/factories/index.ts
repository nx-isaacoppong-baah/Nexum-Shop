import EventHelpers from "~/scripts/helpers/event";
import CookieUtilities from "../utils/cookies";

export class Factory {
	public static cookieStorage() {
		const cookies = new CookieUtilities();
		return new EventHelpers(cookies);
	}
}