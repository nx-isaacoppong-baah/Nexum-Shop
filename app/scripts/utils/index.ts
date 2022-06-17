export default class Utilities {
	public static removeTrailingSlash = (endpoint: string): string => {
		if (endpoint.endsWith("/")) {
		  return endpoint.substring(0, endpoint.lastIndexOf("/"))
		}
	
		return endpoint;
	}
}

