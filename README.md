# Personal Portfolio Site

Minimal, single-page personal portfolio for **Alper Semerci**.

## Overview

This project is a static HTML/CSS/JS portfolio focused on a clean editorial layout inspired by both light and dark minimal design directions.

## Features

- Minimal one-page layout
- Light and dark theme support
  - Toggle button in the top bar
  - Theme preference saved in `localStorage`
  - Uses system theme as fallback
- Click-to-toggle profile photo reveal
  - Starts with `2F1B37AD4236.PNG`
  - Toggles to `1689332889717.jpg` when clicked
- Responsive design for desktop and mobile
- DevTools easter egg
  - Prints colorful console messages when DevTools is detected open

## Project Structure

- `index.html`: Entire site (HTML, CSS, JS in one file)
- `2F1B37AD4236.PNG`: Primary profile image
- `1689332889717.jpg`: Alternate/reveal profile image

## Run Locally

No build step is required.

1. Open directly in your browser:
   - macOS: `open /Users/alper/Dev/GitLabProjects/personal-site/index.html`
2. Or serve with a local static server if preferred.

## Customize

Common edits in `index.html`:

- Contact email and LinkedIn link: footer section
- Theme colors: CSS variables in `:root` and `html[data-theme="dark"]`
- Profile image behavior: script block (`profile-image` click handler)
- DevTools message text/styling: script block (`logDevToolsMessage`)

## Deployment

Because this is static, you can deploy to:

- GitHub Pages
- Netlify
- Vercel
- Any static file host

Upload all files in this folder and use `index.html` as the entry point.

### Canonical domain and `www` redirect

The repository's `CNAME` file keeps `https://alpersemerci.com/` as the canonical GitHub Pages domain.
To make `https://www.alpersemerci.com/` redirect to the canonical apex domain, add this DNS record with the domain provider:

| Type | Host | Value |
| --- | --- | --- |
| `CNAME` | `www` | `alper-proteams.github.io` |

Point the `www` record directly to the GitHub Pages default domain, not to `alpersemerci.com`.
Once DNS has propagated and GitHub Pages has provisioned HTTPS for both hosts, GitHub Pages automatically redirects `www` to the apex domain.

## Credits

Built with Codex and OpenAI.
