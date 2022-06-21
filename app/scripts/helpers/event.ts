import type { ChangeEvent } from "react";
import type { IBrowserUtilities } from "~/types";
 
const findCommonElements = (arrayOne: any[], arrayTwo: any[]) => {
    let commonElementsDictionary = new Map<string, boolean>();
    let commonElements = [];

    for (let i = 0; i < arrayOne.length; i++) {
        let element = arrayOne[i];

        if(!commonElementsDictionary.get(element)) {
            commonElementsDictionary.set(element, true);
        }
    }
        
    for (let j = 0; j < arrayTwo.length ; j++) {
        let element = arrayTwo[j];

        if(commonElementsDictionary.get(element)) {
            commonElements.push(element);
        }
    }

    return commonElements;
}

export default class EventHelpers {
    browserStorage: IBrowserUtilities;
    public static LOCALE = "locale";

    constructor(storage: IBrowserUtilities) {
        this.browserStorage = storage;
    }

	public setCurrentLocaleAndRedirect = (event: ChangeEvent<HTMLSelectElement>) => {
        this.setCurrentLocale(event.target.value);
        this.redirectToCurrentLocale(event.target.value);
    }

	public getCurrentLocale = (event: ChangeEvent<HTMLSelectElement>): string | null => {
		return this.browserStorage.getValue("locale");
	}

    public setCurrentLocale(value: string) {
        this.browserStorage.setValue(EventHelpers.LOCALE, value);
    }

    public redirectToCurrentLocale(locale: string) {
        const languages = ["de-de", "en-us"];
        let pathname = location.pathname;
        let pathnames = pathname.split("/");

        // find the locale used in the location url
        let pathLocales = findCommonElements(languages, pathnames);
        let pathLocale: string = "";
        let updatedPathname: string = "";

        // check if one one language exist in the path
        if (pathLocales.length === 1) {
            pathLocale = pathLocales.join();
        }

        if (pathLocale !== locale) {
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
