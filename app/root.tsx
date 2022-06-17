import type { MetaFunction, LinksFunction } from "@remix-run/node";
import React, { useContext, useEffect } from 'react';
import { withEmotionCache } from '@emotion/react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { storyblokInit, apiPlugin } from "@storyblok/react";

import { ServerStyleContext, ClientStyleContext } from './context';
import theme from "./theme";

import { Feature } from "./components/Feature";
import Grid from "./components/Grid";
import Page from "./components/Page";
import { Teaser } from "./components/Teaser";
import { Product } from "./components/Product";

import { process } from "../.env";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Nexum Post",
  viewport: "width=device-width,initial-scale=1"
});

export const links: LinksFunction = () => {
  return [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
    },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon_io/apple-touch-icon.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon_io/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon_io/favicon-16x16.png" },
    { rel: "manifest", href: "/favicon_io/site.webmanifest" }
  ]
}

interface DocumentProps {
  children: React.ReactNode;
}

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  Product: Product
}

storyblokInit({
  accessToken: process.env.PREVIEW_ACCESS_TOKEN,
  use: [apiPlugin],
  components
});

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
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
              data-emotion={`${key} ${ids.join(' ')}`}
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

export default function App() {
  return (
    <Document>
      <ChakraProvider theme = { theme }>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
