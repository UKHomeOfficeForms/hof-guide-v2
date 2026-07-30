# First application

## Purpose

This page explains the smallest useful HOF journey: one data-entry page, one check answers page and one confirmation page.

If you are creating a real service repository, complete [Create a new HOF service](create-new-hof-service.md) first. This page uses the same conventions so there are no separate starter-repository assumptions.

## Key concepts

The example uses:

- `server.js` to bootstrap HOF
- a route config in `apps/example/index.js`
- field config in `apps/example/fields.js`
- split source translations in `apps/example/translations/src/en/*.json`
- `hof-build` to compile source translations into `apps/example/translations/en/default.json`
- Redis-backed sessions, configured through the service `.env`

## Usage guidance

Use this structure for a small HOF app:

```text
server.js
apps/
  example/
    index.js
    fields.js
    translations/
      src/
        en/
          journey.json
          pages.json
          fields.json
          validation.json
```

The route `translations` setting must point to the translations directory. HOF appends `/__lng__/__ns__.json` internally.

## Examples

Create `server.js`:

```js
'use strict';

const hof = require('hof');
const exampleRoute = require('./apps/example');

hof({
  root: __dirname,
  appName: 'Example service',
  routes: [exampleRoute]
});
```

Create `apps/example/index.js`:

```js
'use strict';

const Summary = require('hof').components.summary;

module.exports = {
  name: 'example',
  baseUrl: '/',
  fields: 'apps/example/fields',
  translations: 'apps/example/translations',
  steps: {
    '/name': {
      fields: ['full-name'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [Summary, 'complete'],
      sections: {
        applicant: ['full-name']
      },
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
```

Create `apps/example/fields.js`:

```js
'use strict';

module.exports = {
  'full-name': {
    validate: ['required', { type: 'maxlength', arguments: 200 }]
  }
};
```

Create `apps/example/translations/src/en/journey.json`:

```json
{
  "header": "Example service",
  "serviceName": "Example service",
  "confirmation": {
    "message": "Application successful",
    "details": "Your application has been submitted."
  }
}
```

Create `apps/example/translations/src/en/pages.json`:

```json
{
  "name": {
    "header": "What is your full name?",
    "title": "What is your full name?"
  },
  "confirm": {
    "header": "Check your answers",
    "title": "Check your answers",
    "sections": {
      "applicant": {
        "header": "Applicant details"
      }
    }
  },
  "confirmation": {
    "header": "Application complete",
    "title": "Application complete"
  }
}
```

Create `apps/example/translations/src/en/fields.json`:

```json
{
  "full-name": {
    "label": "Full name"
  }
}
```

Create `apps/example/translations/src/en/validation.json`:

```json
{
  "full-name": {
    "required": "Enter your full name",
    "maxlength": "Full name must be 200 characters or fewer"
  },
  "default": "Enter a valid value"
}
```

Build translations and assets:

```bash
yarn build
```

Start the service with local environment values loaded:

```bash
yarn dev
```

Open:

```text
http://localhost:8080/name
```

## Common issues

### `Set base fields or route fields or both`

HOF could not find field configuration. Check the route `fields` path points to the directory or file that contains your field definitions.

### Labels render as placeholder keys

Check that `translations` points to the translations directory:

```js
translations: 'apps/example/translations'
```

Do not include `__lng__` or `__ns__` in this value.

### Check answers has no rows

Use the Summary component and configure a `sections` object on the check answers step. The section field keys must match values stored in the session.

### The app redirects unexpectedly

Check the step `next` values and any `forks`.

## Related topics

- [Create a new HOF service](create-new-hof-service.md)
- [Routes, steps and fields](../building-services/routes-steps-fields.md)
- [Validation](../building-services/validation.md)
- [Translations](../building-services/translations.md)
