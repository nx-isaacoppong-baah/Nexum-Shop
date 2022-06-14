import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { storyblokInit, apiPlugin } from "@storyblok/react";

import Feature from "./components/Feature";
import Grid from "./components/Grid";
import Page from "./components/Page";
import Teaser from "./components/Teaser";

import { process } from "../.env";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Nexum Shop",
  viewport: "width=device-width,initial-scale=1"
});

storyblokInit({
  accessToken: process.env.PREVIEW_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    feature: Feature,
    grid: Grid,
    teaser: Teaser,
    page: Page
  }
});

export default function App() {
  const { env } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(env)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
