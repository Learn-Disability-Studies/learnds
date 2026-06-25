# LearnDS

LearnDS is a lightweight public education site for accessible introductions to the social model and disability studies.

## Local Preview

```bash
python3 -m http.server 4173 --directory public
```

Open `http://localhost:4173`.

## Content Editing

Entry source files live in `public/content/*.md`. The live site reads these Markdown files at runtime.

To update copy:

1. Edit the matching Markdown file in `public/content/`.
2. Commit the change to `main`.
3. Cloudflare Workers Builds redeploys the Worker from GitHub.
4. The site serves the updated copy.

The live site includes GitHub edit links for each concept page.

## Cloudflare Workers

This project is configured for Cloudflare Workers static assets:

```bash
wrangler deploy
```

Static files are served from `public/`; the Worker entrypoint is `worker/index.js`.

## Notion Import Status

The requested Notion URL could not be accessed from this environment because the page content was not publicly readable. Export the Notion page as Markdown or make it public, then place the content under `content/` for import.
