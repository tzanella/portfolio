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
 
To use the contact form you will need a [Cloudflare Account](https://www.cloudflare.com/) to use [Turnstile Captcha](https://www.cloudflare.com/turnstile/), and you also need to set up a Discord server and [Webhooks](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) to receive the messages.
 
After that, add the following environment variables to your `.env` file:
 
```env
NUXT_TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
NUXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
NUXT_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
NUXT_LASTFM_API_KEY=...
```
 
### Last.fm "Now Playing" integration
 
The site can also display what you're currently listening to in real time, using the [Last.fm API](https://www.last.fm/api).
 
To set this up:
 
1. Get a Last.fm API key by creating an API account [here](https://www.last.fm/api/account/create). This will give you the `NUXT_LASTFM_API_KEY` value used above.
2. Update your user info in `utils/profileData.ts`, replacing the values with your own Last.fm username, WakaTime user ID, and social links:
```ts
socials: {
  instagram: "https://instagram.com/your_username",
  github: "https://github.com/your_username",
  wakatime: "https://wakatime.com/@your_username",
  discord: "https://discordapp.com/users/your_discord_id",
  lastfm: "https://www.last.fm/user/your_lastfm_username"
},
apis: {
  wakatime: {
    stats: "https://wakatime.com/api/v1/users/your_wakatime_user_id/stats"
  },
  lastfm: {
    getRecentTracks: "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=your_lastfm_username&api_key={lastfm_api_key}&format=json",
    getTrackInfo: "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key={lastfm_api_key}&mbid={mbid}&format=json"
  },
},
```
 
- `socials.lastfm`: link to your public Last.fm profile.
- `apis.wakatime.stats`: your WakaTime stats endpoint, using your WakaTime user ID.
- `apis.lastfm.getRecentTracks`: fetches your most recently played (or currently playing) track. Replace `user` with your Last.fm username.
- `apis.lastfm.getTrackInfo`: fetches extra info about a specific track by its MBID.
> **Note:** the `{lastfm_api_key}` placeholder in the URLs is automatically replaced at runtime with the value of `NUXT_LASTFM_API_KEY` from your `.env` file — you don't need to hardcode it here.
 


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