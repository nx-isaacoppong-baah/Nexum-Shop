import type { ChangeEvent } from "react";
import type { IBrowserUtilities } from "~/types";
import constants from "~/scripts/factories/constants";
import algorithms from "../utils/algorithms";

export default class EventHelpers {
    browserStorage: IBrowserUtilities;
    public static LOCALE = constants.locale;

    constructor(storage: IBrowserUtilities) {
        this.browserStorage = storage;
    }

	public setCurrentLocaleAndRedirect = (languageCodes: any, event: ChangeEvent<HTMLSelectElement>) => {
        this.setCurrentLocale(event.target.value);
        this.redirectToCurrentLocale(event.target.value, languageCodes);
    }

	public getCurrentLocale = (event: ChangeEvent<HTMLSelectElement>): string | null => {
		return this.browserStorage.getValue(constants.locale);
	}

    public setCurrentLocale(value: string) {
        this.browserStorage.setValue(EventHelpers.LOCALE, value);
    }

    public redirectToCurrentLocale(locale: string, languageCodes: any) {
        const languages = languageCodes;
        let pathname = location.pathname;
        let pathnames = pathname.split("/");

        // find the locale used in the location url
        let pathLocales = algorithms.findCommonElements(languages, pathnames);
        let pathLocale: string = "";
        let updatedPathname: string = "";

        // check if one one language exist in the path
        if (pathLocales.length === 1) {
            pathLocale = pathLocales.join();
            updatedPathname = pathname.replace(pathLocale, locale);
        }

        // changing language on default language
        if (pathLocales.length === 0) {
            pathLocale = "/";
            updatedPathname = pathname.replace(pathLocale, `/${locale}`);
        }

        let url = location.origin + updatedPathname;
        location.assign(url)
    }
}
