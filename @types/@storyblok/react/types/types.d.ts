import type { StoryblokConfig } from "storyblok-js-client";

export declare type SbPluginFactory = (options: SbSDKOptions) => any;

export interface SbSDKOptions {
    bridge?: boolean;
    accessToken: string;
    use?: [any];
    apiOptions?: StoryblokConfig;
    components: Object
}
