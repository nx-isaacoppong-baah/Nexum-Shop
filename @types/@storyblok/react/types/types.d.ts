import type { StoryblokConfig } from "storyblok-js-client";

export declare const getStoryblokApi: GetStoryblokAPI;
export declare const useStoryblokState: <T = any>(story: T, config?: any) => T;
export declare const storyblokEditable: <T = any>(blok: T) => T;
export declare const StoryblokComponent: any;

export declare type SbPluginFactory = (options: SbSDKOptions) => any;
export declare type GetStoryblokAPI = () => SbAPIResponse;

export interface SbSDKOptions {
    bridge?: boolean;
    accessToken: string;
    use?: [any];
    apiOptions?: StoryblokConfig;
    components: Object
}

export interface SbAPIResponse {
    get: <T = any>(path: string, options: SbAPIOptions) => Promise<T>
}

export interface SbAPIOptions {
    version: string
}
