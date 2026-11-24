# Form Studio

A packaging and brand workspace built with Next.js. Edit a brand and product, create local packaging images and animated video previews, and export packaging artwork as SVG or PNG. Optionally import images or videos created elsewhere.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Brand edits, uploads, and results are held in memory and disappear when the page is reloaded; download your work before leaving.

## Brand kits

On Brand, expand **Import brand** to extract a public website or upload a `.md` brand kit. Website extraction reads the HTML, up to two linked stylesheets, and an identified PNG, JPEG or WebP logo. It is heuristic: review the detected values, and enter anything missing. Sites requiring login, JavaScript rendering, IPv6-only access, nonstandard ports, or blocking automated requests may not import. Only public network destinations are allowed.

Markdown import recognizes a title or labeled brand name, category, tagline, tone of voice, target audience, typography, hex colors, a `Scene directions` list, and a PNG/JPEG/WebP logo embedded in the kit or referenced by an absolute public URL. Upload relative logo files separately on Brand. Download kit saves the current fields, palette, logo (when available), and selected scenes in a re-importable Markdown file. The identity board displays the imported logo and font name as references. The packaging SVG embeds a raster logo when available but does not embed the referenced font.

## Local previews and optional AI

On Create, choose Image or Video and select **Create local**. These previews are rendered in the browser without an AI service or subscription. Images are PNG; video is a four-second, 1280 × 720 WebM animation recorded in real time. Keep the tab open during recording. Video requires a browser supporting canvas capture and WebM MediaRecorder, such as a current Chromium browser. If a browser cannot play the result in Review, download it from Export and open it in a compatible player. A product reference appears beside the packaging, rather than being applied to its surface. Custom scene names use the default studio background.

For optional AI images, copy the brief from Create into GitHub Copilot chat, save the resulting image, and import it into the studio. The copied text includes the entire imported Markdown brief; review it before sharing. Copilot image generation is separate from this app, subject to availability, and may use AI credits. The studio does not automatically call Copilot or generate AI video. Imported PNG, JPEG, WebP, MP4 and WebM files can be reviewed and downloaded unchanged.

The SVG is an original editable packaging layout based on the entered brand details; any embedded logo remains a raster image. It is not a trace or vectorization of an uploaded product photo or imported AI image. Review AI-generated labels manually.

The `pages/` JSX files are unrelated legacy template fragments, so Next.js is configured to exclude `.jsx` route files. Components can still use `.jsx`.
