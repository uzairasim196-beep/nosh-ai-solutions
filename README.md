# NOSH AI Solutions

Agency website for custom AI solutions, automations, motion design and video editing, and social media marketing.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS, Radix UI, and server-side Upstash Redis for project inquiries.

## Run locally

Use Node.js 22.13 or newer.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Set both Upstash environment variables in `.env.local` to enable inquiry storage. Never commit credentials.

## Deploy to Vercel

1. Push this branch to a dedicated GitHub repository.
2. Import the repository into Vercel as a Next.js project.
3. Connect an Upstash Redis database from Vercel Marketplace to the project. Ensure `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are present in the target environment.
4. Deploy the main branch to production.

The UI can build without storage credentials. The inquiry endpoint deliberately returns an error until storage is connected; it never reports that an unsaved inquiry succeeded.

## Inquiries

`POST /api/inquiries` validates the request before storing each inquiry as a JSON value under its UUID in the Redis hash `nosh:inquiries`. Review entries in the private Upstash data browser. No public endpoint exposes inquiries. No email notification or calendar integration is configured.

The previous ChatGPT Site uses a separate Cloudflare D1 database. Existing inquiries are not migrated by this export.

## Visual assets

Typography and the two labeled visual-reference images originate from the user-supplied reference at https://grigoletti.ch/en/. The imagery is identified as visual inspiration on the page. No reference clients or projects are presented as NOSH client work.
