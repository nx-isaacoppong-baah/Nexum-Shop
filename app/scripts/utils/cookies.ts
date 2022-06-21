import type { IBrowserUtilities } from "~/types";

export default class CookieUtilities implements IBrowserUtilities {
	public setValue(name: string, value: string, days?: number): void {
		let expires = "";

		if (days) {
			let date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}
		
		document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	}

	public getValue(name: string, defaultCookies: string = ""): string | null {
		defaultCookies = defaultCookies || document.cookie;
		let cookies = defaultCookies.split(";");
		let nameEQ = name + "=";

		for(let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i];
			
			while (cookie.charAt(0)==" ") {
				cookie = cookie.substring(1, cookie.length);
			}

			if (cookie.indexOf(nameEQ) == 0) {
				return cookie.substring(nameEQ.length, cookie.length);
			}
		}

		return null;
	}

	public deleteValue(name: string): void {
		document.cookie = name +"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	}
}
