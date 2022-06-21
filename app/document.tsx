import { ServerStyleContext, ClientStyleContext } from "./context";
import { ColorModeScript } from "@chakra-ui/react";
import { withEmotionCache } from "@emotion/react";
import React, { useContext, useEffect } from "react";
import theme from "./theme";
import type { DocumentProps } from "~/types";

import {
	Links,
	LiveReload,
	Meta,
	Scripts,
	ScrollRestoration
 } from "@remix-run/react";

export const Document = withEmotionCache(({ children }: DocumentProps, emotionCache) => {
	  const serverStyleData = useContext(ServerStyleContext);
	  const clientStyleData = useContext(ClientStyleContext);
  
	  useEffect(() => {
		emotionCache.sheet.container = document.head;
		const tags = emotionCache.sheet.tags;
		emotionCache.sheet.flush();
		tags.forEach((tag) => {
		  (emotionCache.sheet as any)._insertTag(tag);
		});
		clientStyleData?.reset();
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	  }, []);
  
	  return (
		<html lang="en">
		  <head>
			<Meta />
			<Links />
			{serverStyleData?.map(({ key, ids, css }) => (
			  <style
				key={key}
				data-emotion={`${key} ${ids.join(" ")}`}
				dangerouslySetInnerHTML={{ __html: css }}
			  />
			))}
		  </head>
		  <body>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			{children}
			<ScrollRestoration />
			<Scripts />
			<LiveReload />
		  </body>
		</html>
	  );
	}
);
