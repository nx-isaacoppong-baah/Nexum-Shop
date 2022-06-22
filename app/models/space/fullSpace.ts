import type { Space } from "~/types";
import { SpaceDecorators } from "./decorator";

export default class SpaceModel extends SpaceDecorators {
	constructor (apiSpace: Space) {
		super(apiSpace);
		this.apiSpace = apiSpace;

		this.model();
	}

	// add all the model decorators
	private model() {
		this.addDefaultLanguage();
		this.wrapLanguages();
	}

	public get space(): Partial<Space> {
		return this.apiSpace;
	}
}
