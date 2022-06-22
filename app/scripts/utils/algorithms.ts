export default class AlgosFactory {
	/**
	 * Algorithm to remove trailing slashes from urls
	 * @param url the string
	 * @returns the refined url
	 */
	public static removeTrailingSlash = (url: string): string => {
		if (url.endsWith("/")) {
		  return url.substring(0, url.lastIndexOf("/"));
		}
	
		return url;
	}

	/**
	 * Algorithm to find common elements in two arrays
	 * @param arrayOne First array
	 * @param arrayTwo Second array
	 * @returns the common elements
	 */
	public static findCommonElements (arrayOne: any[], arrayTwo: any[]): any[] {
		let commonElementsDictionary = new Map<string, boolean>();
		let commonElements = [];
	
		for (let i = 0; i < arrayOne.length; i++) {
			let element = arrayOne[i];
	
			if(!commonElementsDictionary.get(element)) {
				commonElementsDictionary.set(element, true);
			}
		}
			
		for (let j = 0; j < arrayTwo.length ; j++) {
			let element = arrayTwo[j];
	
			if(commonElementsDictionary.get(element)) {
				commonElements.push(element);
			}
		}
	
		return commonElements;
	}

	public static removeBrackets (value: string): string {
		if (!value) return "";

		let trimmed = value.split("(")[1]?.trim();
		return trimmed?.substring(0, trimmed?.lastIndexOf(")"));	}
}
