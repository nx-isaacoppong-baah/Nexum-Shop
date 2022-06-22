import type { Space } from "~/types";

export abstract class SpaceDecorators {
	protected apiSpace: Space;

	constructor (apiSpace: Space) {
		this.apiSpace = apiSpace;
	}

	protected renameLanguageProperty () {
		this.apiSpace.languages = this.apiSpace.language_codes;
		delete this.apiSpace.language_codes;
	}
}
