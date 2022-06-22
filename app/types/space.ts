export type Space = {
	id: number
	name: string
	domain: string
	version: number
	language_codes?: string[]
	languages?: string[]
}

export type SpaceResponseRawData = {
	data: {
		space: Space
	}
}
