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

By default, the workflow reads the repository Pages URL from the GitHub API and sets `VITEPRESS_BASE` from that URL path automatically.

This avoids the most common cause of unstyled Pages deployments (base path mismatch).

- Public project site URL like `https://ukhomeofficeforms.github.io/hof-guide-v2/` -> detected base `/hof-guide-v2/`
- Private Pages URL like `https://<unique>.pages.github.io/` -> detected base `/`

If you set `VITEPRESS_BASE` and it does not match the detected Pages URL path, the workflow ignores it and uses the detected value.

If you intentionally need to override this behaviour, set both:

```text
VITEPRESS_BASE=/your-path/
VITEPRESS_BASE_FORCE=true
```

If you want a fixed public hostname instead of an auto-generated `*.pages.github.io` domain, configure a custom domain and set:

```text
PAGES_CUSTOM_DOMAIN=docs.example.gov.uk
```

The workflow writes this value to `public/CNAME` during deployment.

If your site URL is still a random `*.pages.github.io` hostname and you want `https://ukhomeofficeforms.github.io/hof-guide-v2/`, check:

1. The repository is under the `UKHomeOfficeForms` organisation.
2. The repository name is exactly `hof-guide-v2`.
3. The Pages visibility is public (private Pages use unique `*.pages.github.io` hostnames).
4. **Settings > Pages > Build and deployment > Source** is **GitHub Actions**.

To test a non-root Pages build locally, run:

```bash
VITEPRESS_BASE=/hof-guide/ yarn build
```

The `public/.nojekyll` file is included so GitHub Pages serves the generated static files without Jekyll processing.

## Automated guide sync from `hof` framework changes

This repository includes an agentic sync workflow that can be triggered by framework changes in `UKHomeOfficeForms/hof`.

The cross-repository trigger is designed to work with a GitHub App installation token rather than a user PAT.

### What is included

- Guide-side workflow: `.github/workflows/hof-guide-sync-from-hof.yml`
- PR-to-issue tracking workflow: `.github/workflows/comment-sync-pr-on-issue.yml`
- Reusable skill: `.github/skills/hof-doc-sync/SKILL.md`
- Custom agent profile: `.github/agents/hof-guide-sync.agent.md`
- Diff context generator: `.github/skills/hof-doc-sync/scripts/build-sync-context.mjs`

### Intended flow

1. A change is merged to `hof` (`master`/`main`).
2. `hof` workflow dispatches `hof-framework-changed` to this repository.
3. This repository builds a sync context from:
   - framework compare diff (`before_sha...after_sha`)
   - latest changelog section
4. A sync issue is created and automatically assigned to Copilot.
5. Copilot uses the `HOF Guide Sync Agent` (or `hof-doc-sync` skill), opens a PR with `Closes #<sync-issue-number>` in the body, and a workflow comments the PR link back onto the sync issue.

Repeated dispatches for the same framework head SHA update the existing open sync issue instead of creating duplicates.

The issue is still used as orchestration state, but no manual assignment step is required when auto-assignment succeeds. Human review starts at the PR.

### Setup required

#### In `UKHomeOfficeForms/hof`

The workflow `.github/workflows/notify-hof-guide-sync.yml` expects:

- Repository variable: `HOF_GUIDE_SYNC_APP_ID`
  - GitHub App ID for the app used to dispatch to the guide repository
- Repository secret: `HOF_GUIDE_SYNC_APP_PRIVATE_KEY`
  - Private key for that GitHub App
- Optional repository variable: `HOF_GUIDE_SYNC_APP_OWNER`
  - Default: `UKHomeOfficeForms`
- Optional repository variable: `HOF_GUIDE_REPO`
  - Default: `UKHomeOfficeForms/hof-guide-v2`
- Optional repository variable: `HOF_GUIDE_REPO_NAME`
  - Default: `hof-guide-v2`

The GitHub App should be installed on the target guide repository and have repository access sufficient to create a repository dispatch event.

To test the full cross-repository flow without merging to `master`/`main`, run the
`Notify HOF Guide sync` workflow manually in the `hof` repository and provide:

- `before_sha` - existing framework commit to compare from
- `after_sha` - existing framework commit to compare to
- optional `changelog_notes` - override for test wording
- optional `guide_repo` - alternative target repository for safe testing

This triggers the same repository dispatch event used by the push-based automation.

#### In `hof-guide-v2`

No extra secret is needed for the sync workflow itself.

You can also trigger sync manually from **Actions** using the
`HOF guide sync from framework changes` workflow if you want to test only the guide-side processing.

Optional repository variable:

- `HOF_GUIDE_SYNC_BASE_BRANCH`
  - Base branch used for Copilot agent assignment (default: `main`)

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
