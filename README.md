# Welcome to my portfolio!

This is made with NuxtJS, TailwindCSS and Typescript, if you want to fork and edit this to use for your portfolio, you can do it freely.
And I really recommend you to see the [Whole Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.


## How to change the data?

You can change the data in the `app/utils/profileData.ts` file. It's a static data that will be used throughout the portfolio.


## Setup

Make sure to install dependencies. If you don't have bun installed, you can install it by following the instructions on the [bun website](https://bun.sh/docs/getting-started/install):

```bash
# bun (Recommended)
bun install

# Or you can use npm

# npm
npm install
```

## Environment variables

To use the contact form you need will need a [Cloudflare Account](https://www.cloudflare.com/) to use [Turnstile Captcha](https://www.cloudflare.com/turnstile/) and you also need to setup a discord server and [Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) to receive the messages. After that you need to add the following environment variables to the `.env` file:

```env
NUXT_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
NUXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
NUXT_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash

# bun (Recommended)
bun dev

# npm
npm run dev
```

## Production

Build the application for production:

```bash
# bun
bun run build

# npm
npm run build
```

Locally preview production build:

```bash
# bun
bun run preview

# npm
npm run preview
```

## Deploying to a Host
I recommend you to use [Netlify](https://www.netlify.com/) but you also can use [Vercel](https://vercel.com/) to deploy this portfolio.

## Fork
You can fork this repo and use it for your portfolio, just remember to change the data in the `app/utils/profileData.ts` file and the .env file. Also, I would appreciate if you give me credits by leaving a link to my portfolio in your portfolio.