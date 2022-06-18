import type {
	ILogoComponent,
	IImageFieldType,
	IBasicStoryFields,
	IFeatureComponent,
	ITeaserComponent,
	IRefinedLogos
} from "~/types";
import { Themes } from "~/enums";

export default class ComponentHelpers {
	static features: Map<string, IFeatureComponent> = new Map();

	public static processHomepageBloks(bloks: Array<IBasicStoryFields
	| ILogoComponent
	| IFeatureComponent
	| ITeaserComponent>): { logoComponent: ILogoComponent, features
	: Map<string, IFeatureComponent>, teaser: Partial<ITeaserComponent> } {
		let logoComponent: ILogoComponent = { logos: [] };
		let teaser: Partial<ITeaserComponent> = {};

		for (let blok of bloks) {
			blok = blok as IBasicStoryFields;
			if (blok.component.toLowerCase() === "logos") {
				logoComponent = this.processHomepageLogo(blok as ILogoComponent);
			}

			if (blok.component.toLowerCase() === "teaser") {
				teaser = this.processHomepageTeaser(blok as ITeaserComponent);
			}

			if (blok.component.toLowerCase() === "feature") {
				this.processHomepageFeature(blok as IFeatureComponent);
			}
		}

		return { logoComponent, features: this.features, teaser }
	}

	public static refineImages(images: IImageFieldType[]): Pick<IRefinedLogos, "light" | "dark"> {
		let refinedImages: IRefinedLogos = {};

		for (let logo of images) {
			if (logo.title === Themes.dark) {
				refinedImages.dark = {
					src: logo.filename,
					alt: logo.alt
				}
			}
		
			if (logo.title === Themes.light) {
				refinedImages.light = {
					src: logo.filename,
					alt: logo.alt
				}
			}
		}

		return refinedImages;
	}

	public static refineLogoComponent(component: ILogoComponent, refinedImages
	: Pick<IRefinedLogos, "light" | "dark">): IRefinedLogos {
		return Object.assign(refinedImages, {
			_editable: component._editable,
			component: component.component
		});
	}

	private static processHomepageLogo (blok: ILogoComponent) {
		return this.transformBasicBlok(blok, (basicBlok: IBasicStoryFields) => {
			blok = blok as ILogoComponent;
			return {
				_editable: blok._editable,
				component: blok.component,
				_uid: blok._uid,
				logos: [...blok.logos]
			}
		});
	}

	private static processHomepageTeaser (blok: ITeaserComponent) {
		return this.transformBasicBlok(blok, (_: IBasicStoryFields) => {
			return blok;
		});
	}

	private static processHomepageFeature (blok: IFeatureComponent) {
		this.transformBasicBlok(blok, (basicBlok: IBasicStoryFields) => {
			const specificBlok = basicBlok as IFeatureComponent;
			this.features.set(specificBlok.id.toLowerCase(), blok);
		});
	}

	private static transformBasicBlok (blok: any, callback: any) {
		const basicBlok = blok as IBasicStoryFields;
		return callback(basicBlok);
	}
}
