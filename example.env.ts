interface IEnvironment {
	PREVIEW_ACCESS_TOKEN: string
};

type Process = {
	env: IEnvironment
};

export const process: Process = {
	env: {
		PREVIEW_ACCESS_TOKEN: "your-preview-token"
	}
};
