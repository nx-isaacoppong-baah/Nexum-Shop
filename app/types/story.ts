export type StoryResponseRawData = {
	data: {
		story: Story,
		cv: number
		rels: string[]
		links: string[]
	}
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

export type Story<ContentType = any> = {
	name: string
	created_at: string
	published_at?: string
	id: number
	uuid: string
	content: ContentType
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

export type StoryDecoratedContent = {
	blok: Story
}

export interface IStoryContent<StoryContent> {
	blok: StoryContent
}

export interface IBasicStoryFields {
	_uid: string
	component: string
	_editable: string
}
