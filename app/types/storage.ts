export interface IBrowserUtilities {
	setValue: (name: string, value: string, days?: number) => void
	getValue: (name: string, defaultCookies?: string) => string | null
	deleteValue: (name: string) => void
}
