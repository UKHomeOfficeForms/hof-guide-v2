# Submit data to an API

## Purpose

This tutorial shows how to submit completed form data to an API.

## Key concepts

HOF stores in-progress data in the session. Permanent submission is service-owned.

Use a behaviour on the final form step to call an API before redirecting to confirmation.

## Usage guidance

Only redirect to confirmation after the API call succeeds.

Send only the data required by the receiving API.

Do not log full submission payloads.

This example assumes you already have a check answers step that uses the Summary component and redirects to `/confirmation`.

## Examples

Create `models/submission.js`:

```js
'use strict';

const Model = require('hof').model;

module.exports = class Submission extends Model {
  url() {
    return process.env.SUBMISSION_API_URL;
  }

  prepare() {
    return {
      fullName: this.get('full-name'),
      emailAddress: this.get('email-address')
    };
  }
};
```

`save()` sends a `POST` request by default. Override `prepare()` so only the required fields leave the service.

Create `behaviours/submit-application.js`:

```js
'use strict';

const Submission = require('../models/submission');

module.exports = superclass => class extends superclass {
  successHandler(req, res, next) {
    const submission = new Submission(req.sessionModel.toJSON(), {
      timeout: 5000
    });

    submission.save()
      .then(() => super.successHandler(req, res, next))
      .catch(next);
  }
};
```

Add the behaviour to the existing check answers step. Only the relevant route configuration is shown here; keep your existing data-entry steps in the same `steps` object:

```js
const Summary = require('hof').components.summary;
const SubmitApplication = require('../../behaviours/submit-application');

module.exports = {
  name: 'form',
  baseUrl: '/',
  fields: 'apps/form/fields',
  translations: 'apps/form/translations',
  steps: {
    '/confirm': {
      behaviours: [Summary, SubmitApplication, 'complete'],
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

Add the API URL to your local `.env` and deployment secrets:

```bash
SUBMISSION_API_URL=https://example.internal/submit
```

## Common issues

### API failures still show the confirmation page

Ensure `super.successHandler` only runs after the API promise resolves. Pass errors to `next` so HOF can render an error response instead of confirming submission.

### Too much data is submitted

Implement `prepare()` and map the payload explicitly. Do not submit the full session model unless the receiving API requires every value.

### Duplicate submissions

Consider idempotency keys in the receiving API and submission rate limiting.

### Summary labels render as placeholder keys

The Summary component uses the same translation setup as the rest of the journey. Check the route `translations` value points to the translations directory and that `pages.confirm.sections.<section>.header` exists.

## Related topics

- [Models and API integration](../extending-hof/models-and-api-integration.md)
- [Complete](../behaviours/complete.md)
- [Security](../operations/security.md)
