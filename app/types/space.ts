export type Space = {
	id: number
	name: string
	domain: string
	version: number
	language_codes: string[]
	languages?: Object
}

export type SpaceResponseRawData = {
	data: {
		space: Space
	}
}
