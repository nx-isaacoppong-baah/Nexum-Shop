export const refineEndpoint = (endpoint: string) => {
	if (endpoint.endsWith("/")) {
	  return endpoint.substring(0, endpoint.lastIndexOf("/"))
	}

	return endpoint;
}
