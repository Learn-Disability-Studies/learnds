# LearnDS

LearnDS is a lightweight public education site for accessible introductions to the social model and disability studies.

## Local Preview

```bash
python3 -m http.server 4173 --directory public
```

Open `http://localhost:4173`.

## Content Editing

Entry source files live in `content/`. To edit a page, update the matching Markdown file and the corresponding entry in `public/app.js`.

The live site includes GitHub edit links for each concept page.

## Cloudflare Workers

This project is configured for Cloudflare Workers static assets:

```bash
wrangler deploy
```

Static files are served from `public/`; the Worker entrypoint is `worker/index.js`.

## Notion Import Status

The requested Notion URL could not be accessed from this environment because the page content was not publicly readable. Export the Notion page as Markdown or make it public, then place the content under `content/` for import.
