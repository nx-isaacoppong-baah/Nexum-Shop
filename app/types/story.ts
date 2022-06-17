export type Story = {
	name: string
	created_at: string
	published_at?: string
	id: number
	uuid: string
	content: any
	slug: string
	full_slug: string
	position: number
	tag_list: string[]
	is_startpage: boolean
	parent_id: number
	group_id: string
	lang: string
	path: string
	alternates: IStoryAlternatives[]
	translated_slugs: IStoryTranslatedSlugs[]
}

export interface IStoryContent<StoryContent> {
	blok: StoryContent
}

interface IStoryAlternatives {
	id: number
	name: string
	slug: string
	full_slug: string
	is_folder: boolean
	parent_id: number
}

interface IStoryTranslatedSlugs {
	path: string
	name: string
	lang: string
}

export interface IBasicStoryFields {
	_uid: string
	component: string
	_editable: string
}

