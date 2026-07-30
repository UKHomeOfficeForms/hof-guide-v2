# Build a simple form

## Purpose

This tutorial extends the new-service example into a simple HOF form that collects a name and email address.

## Key concepts

The service has:

- one route app
- two data-entry steps
- one check answers step
- one confirmation page
- field, page, validation and journey translations

## Usage guidance

Use this tutorial after [Create a new HOF service](../getting-started/create-new-hof-service.md). It assumes your service already has:

- `hof` installed with Yarn
- the package scripts from the new-service tutorial
- a valid `.env` with `SESSION_SECRET`, `REDIS_HOST` and `REDIS_PORT`
- Redis running locally

## Examples

`server.js`:

```js
'use strict';

const hof = require('hof');

hof({
  root: __dirname,
  appName: 'Simple form',
  routes: [require('./apps/form')]
});
```

`apps/form/index.js`:

```js
'use strict';

const Summary = require('hof').components.summary;

module.exports = {
  name: 'form',
  baseUrl: '/',
  fields: 'apps/form/fields',
  translations: 'apps/form/translations',
  steps: {
    '/name': {
      fields: ['full-name'],
      next: '/email'
    },
    '/email': {
      fields: ['email-address'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [Summary, 'complete'],
      sections: {
        details: ['full-name', 'email-address']
      },
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
```

`apps/form/fields.js`:

```js
'use strict';

module.exports = {
  'full-name': {
    validate: ['required', { type: 'maxlength', arguments: 200 }]
  },
  'email-address': {
    validate: ['required', 'email']
  }
};
```

`apps/form/translations/src/en/journey.json`:

```json
{
  "header": "Simple form",
  "serviceName": "Simple form",
  "confirmation": {
    "message": "Application successful",
    "details": "Your form has been submitted."
  }
}
```

`apps/form/translations/src/en/pages.json`:

```json
{
  "name": {
    "header": "What is your full name?",
    "title": "What is your full name?"
  },
  "email": {
    "header": "What is your email address?",
    "title": "What is your email address?"
  },
  "confirm": {
    "header": "Check your answers",
    "title": "Check your answers",
    "sections": {
      "details": {
        "header": "Your details"
      }
    }
  },
  "confirmation": {
    "header": "Application complete",
    "title": "Application complete"
  }
}
```

`apps/form/translations/src/en/fields.json`:

```json
{
  "full-name": {
    "label": "Full name"
  },
  "email-address": {
    "label": "Email address"
  }
}
```

`apps/form/translations/src/en/validation.json`:

```json
{
  "full-name": {
    "required": "Enter your full name",
    "maxlength": "Full name must be 200 characters or fewer"
  },
  "email-address": {
    "required": "Enter your email address",
    "email": "Enter an email address in the correct format, like name@example.com"
  },
  "default": "Enter a valid value"
}
```

Build and run:

```bash
yarn build
yarn dev
```

Open `http://localhost:8080/name` and complete the journey.

## Common issues

### Check answers has no rows

Check that the fields were completed and that the summary `sections` field keys are correct.

### Labels render as placeholder keys

Check that the route `translations` value points to the translations directory, for example `apps/form/translations`. Do not include `__lng__` or `__ns__`.

### Confirmation page can be reached too early

Use the wizard journey and avoid linking directly to terminal pages.

## Related topics

- [First application](../getting-started/first-application.md)
- [Summary](../behaviours/summary.md)
- [Validation](../building-services/validation.md)
