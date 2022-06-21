import type { MetaFunction, LinksFunction } from "@remix-run/node";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "@remix-run/react";
import { storyblokInit, apiPlugin } from "@storyblok/react";

import { Feature } from "./components/nested/Feature";
import { Grid } from "./components/nested/Grid";
import { Teaser } from "./components/nested/Teaser";
import { Page } from "./components/content-types/Page";
import { Product } from "./components/content-types/Product";
import { Logos } from "./components/nested/Logos";

import { Document } from "~/document";
import theme from "~/theme";
import { process } from "../.env";

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
  Product: Product,
  logos: Logos
}

storyblokInit({
  accessToken: process.env.PREVIEW_ACCESS_TOKEN,
  use: [apiPlugin],
  components
});

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Nexum Post",
  viewport: "width=device-width,initial-scale=1"
});

export const links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
    },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon_io/apple-touch-icon.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon_io/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon_io/favicon-16x16.png" },
    { rel: "manifest", href: "/favicon_io/site.webmanifest" }
  ]
}

export default function App() {
  return (
    <Document>
      <ChakraProvider theme = { theme }>
        <Outlet />
      </ChakraProvider>
    </Document>
  );
}
