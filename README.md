# HOF Guide v2 documentation service

This folder contains the proposed version 2 documentation service for Home Office Forms (HOF).

The site uses VitePress so the guide remains simple, fast and polished without recreating a custom documentation platform. VitePress is the only site generator dependency.

The guide is written against the `hof` framework source code, with the current analysis based on `hof@24.5.0`. When documentation and implementation disagree, the framework implementation is the source of truth.

## Run locally

Install dependencies:

```bash
yarn install
```

Start the documentation service:

```bash
yarn dev
```

Build the static site:

```bash
yarn build
```

Preview the built site:

```bash
yarn preview
```

Commit the generated `yarn.lock` after the first install so pipeline builds can use `yarn install --frozen-lockfile`.

## Documentation principles

- Use clear UK English.
- Explain concepts in plain language before showing implementation detail.
- If a topic involves code, include a working example.
- Document defaults, limits, errors and operational concerns.
- Mark deprecated, partial or service-owned behaviour clearly.
- Keep each page maintainable with the same structure:
  - Purpose
  - Key concepts
  - Usage guidance
  - Examples
  - Common issues
  - Related topics

## Guide structure

- `index.md` - polished landing page and evaluation journey.
- `.vitepress/` - site configuration, navigation and theme customisation.
- `getting-started/` - introduction, suitability, requirements and first app.
- `building-services/` - routes, steps, fields, validation, conditionals, views and translations.
- `extending-hof/` - controller lifecycle, middleware, models and API integration.
- `behaviours/` - behaviours overview and one page per built-in behaviour/component.
- `reference/` - configuration, validators, formatters and deprecations.
- `operations/` - sessions, Redis, security, deployment, health checks and troubleshooting.
- `architecture/` - runtime and request lifecycle.
- `tutorials/` - task-focused implementation guides.
- `migration/` - upgrade guidance.
- `contributing/` - documentation standards.

## Pipeline build

Once a lockfile exists, a pipeline only needs:

```bash
yarn install --frozen-lockfile

yarn build
```

The generated static site is written to:

```text
.vitepress/dist
```

## Deploy to GitHub Pages

The guide is configured for a GitHub Pages deployment from the same repository.

The workflow is defined in:

```text
.github/workflows/deploy-pages.yml
```

It runs when changes are pushed to `main`, builds the VitePress static site with Yarn and deploys `.vitepress/dist` using GitHub Pages.

After creating the repository:

1. Push this guide to the repository.
2. In GitHub, go to **Settings** > **Pages**.
3. Set **Build and deployment** > **Source** to **GitHub Actions**.
4. Push to `main` or run the workflow manually.

For a normal project Pages URL, such as `https://<org>.github.io/<repo>/`, the workflow automatically sets the VitePress base path to `/<repo>/`.

If the site is published at the domain root, for example through a custom domain, set a repository Actions variable:

```text
VITEPRESS_BASE=/
```

To test a project Pages build locally, run:

```bash
VITEPRESS_BASE=/hof-guide/ yarn build
```

The `public/.nojekyll` file is included so GitHub Pages serves the generated static files without Jekyll processing.

## Source modules used for this draft

- `index.js`
- `lib/router.js`
- `lib/sessions.js`
- `wizard/index.js`
- `wizard/middleware/*`
- `wizard/behaviours/*`
- `controller/*`
- `controller/validation/*`
- `controller/formatting/*`
- `components/*`
- `config/hof-defaults.js`
- `config/rate-limits.js`
- `model/index.js`
