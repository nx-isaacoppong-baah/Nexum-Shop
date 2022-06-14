# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

Start the Remix development asset server and the Express server by running:

```sh
npm run dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying express applications you should be right at home just make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

### Setting the Environment
- Rename the file `example.env.ts` to `.env.ts`
- Replace "your-preview-token" with the actual token from storyBlok

**NB: Make sure the .env.ts is added to the gitignore file**

### Connecting to StoryBlok v2 Visual Studio
In order to view the components in the storyBlok v2 visual studio, you need to proxy the http server through an https server since storyBlok v2 only support https requests. To start the proxy server, use the command below.

`npm run start:proxy`

The proxy server will be started on `<hostname>:3000` or `0.0.0.0:3000` when running on localhost.

**NB: This proxy server is only used for development purposes. The certificates are not signed and secured from a trusted source**
