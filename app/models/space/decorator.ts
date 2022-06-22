import type { Space } from "~/types";
import { Languages } from "~/enums";

export abstract class SpaceDecorators {
	protected apiSpace: Space;

	constructor (apiSpace: Space) {
		this.apiSpace = apiSpace;
	}

	protected addDefaultLanguage () {
		this.apiSpace.language_codes?.push(Languages.default)
	}

	protected wrapLanguages () {
		let mappedLanguages: any = {};
		let languagesCodes = this.apiSpace.language_codes;

		for (let languageCode of languagesCodes) {
			// the statement in (*) will be needed for the country flags
			switch (languageCode) {
				case Languages.default:
					mappedLanguages[languageCode] = "Default";
					break;
				case Languages.englishUS:
					mappedLanguages[languageCode] = "English (US)";
					break;
				case Languages.germanGerman:
					mappedLanguages[languageCode] = "German (DE)";
					break;
				case Languages.spanish:
					mappedLanguages[languageCode] = "Spanish (ES)"
				default:
					break;
			}
		}

		this.apiSpace.languages = mappedLanguages;
	}
}
