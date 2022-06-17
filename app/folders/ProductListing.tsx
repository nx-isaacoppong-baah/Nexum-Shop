import { storyblokEditable } from "@storyblok/react";
import type {
	IImageFieldType,
	ProductListingProps
} from "../types";
import type { FC } from "react";

export const ProductListing: FC<ProductListingProps> = ({ stories }: ProductListingProps): JSX.Element => {
  return (
	<>
		{
			stories.map(story => (
				<div { ...storyblokEditable(story.content.blok) } key={story.content.blok._uid}>
				<h2> {story.content.blok.name} </h2>
				{
				  story.content.blok.images.map((image: IImageFieldType) => (
					  <img src={image.filename} alt={image.alt} key={image.id}></img>
				  ))
				}
			  </div>
			))
		}
	</>
  );
};
