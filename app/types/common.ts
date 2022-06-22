import type { StoryVersions } from "../enums";

export type APIQueryParams = {
	version?: StoryVersions
	starts_with?: string
	by_uuids?: string // eg: starts_with=products/MEGASHOP001 || starts_with=en/posts
	by_slugs?: string // eg: by_slugs=authors/john,authors/max || by_slugs=authors/*,articles/*
	sort_by?: string // eg: content.YOUR_FIELD:asc || created_at:desc
	page?: number // for pagination, default is 1
	per_page?: number // for pagination, default is 25 and max is 100
	language?: string
	fallback_lang?: string
}

export interface ServerStyleContextData {
	key: string
	ids: Array<string>
	css: string
}

export interface ClientStyleContextData {
	reset: () => void
}

export interface ClientCacheProviderProps {
	children: React.ReactNode;
}

export interface DocumentProps {
	children: React.ReactNode
}
