import { storyblokEditable } from "@storyblok/react";
import type { IProductStoryContent, IStoryContent } from "../types";

export const Product = ({ blok }: IStoryContent<IProductStoryContent>): JSX.Element => {
  return (
    <div { ...storyblokEditable(blok) } key={blok._uid}>
      <h2> {blok.name} </h2>
	  {
		blok.images?.map(image => (
			<img src={image.filename} alt={image.alt} key={image.id}></img>
		))
	  }
    </div>
  );
};
