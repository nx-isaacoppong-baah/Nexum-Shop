import type { Space } from "~/types";
import { SpaceDecorators } from "./decorator";

export default class SpaceModel extends SpaceDecorators {
	private modelledSpace: Partial<Space> = {};

	constructor (apiSpace: Space) {
		super(apiSpace);
		this.apiSpace = apiSpace;
		this.model();
	}

	private model() {
		this.renameLanguageProperty();
		this.modelledSpace = this.apiSpace
	}

	public get space(): Partial<Space> {
		return this.modelledSpace;
	}
}
