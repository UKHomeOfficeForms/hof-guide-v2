# Models and API integration

## Purpose

This page explains how to integrate a HOF service with APIs.

## Key concepts

HOF includes a generic `model` abstraction for local data and HTTP requests.

The model supports:

- `set`
- `get`
- `toJSON`
- `fetch`
- `save`
- `delete`

`save` sends JSON with `POST` by default. You can pass another method when needed.

HOF does not provide permanent data persistence for your service automatically. API submission is service-owned.

## Usage guidance

Use a model when a behaviour needs to call an external service.

Keep API-specific configuration in the model or service config, not directly in route definitions.

Handle API failures explicitly and show an appropriate error page or validation error.

## Examples

API model:

```js
'use strict';

const Model = require('hof').model;

module.exports = class ApplicationApi extends Model {
  url() {
    return this.options.url;
  }

  prepare() {
    return {
      fullName: this.get('full-name'),
      emailAddress: this.get('email-address')
    };
  }
};
```

Submit behaviour:

```js
'use strict';

const ApplicationApi = require('../models/application-api');

module.exports = superclass => class extends superclass {
  successHandler(req, res, next) {
    const application = new ApplicationApi(req.sessionModel.toJSON(), {
      url: process.env.APPLICATION_API_URL,
      timeout: 5000
    });

    application.save()
      .then(() => super.successHandler(req, res, next))
      .catch(next);
  }
};
```

Route usage:

```js
const submitApplication = require('../../behaviours/submit-application');

module.exports = {
  steps: {
    '/confirm': {
      behaviours: [submitApplication, 'complete'],
      next: '/confirmation'
    },
    '/confirmation': {}
  }
};
```

Use `PUT` instead of `POST`:

```js
application.save({ method: 'PUT' })
  .then(() => super.successHandler(req, res, next))
  .catch(next);
```

## Common issues

### Submissions appear successful when the API failed

Only call `super.successHandler` after the API request succeeds.

### API calls contain too much session data

Implement `prepare()` and only send the fields the receiving API needs.

### Timeout errors reach users as generic errors

Set a timeout and add service-specific error handling where appropriate.

## Related topics

- [Submit data to an API](../tutorials/submit-data-to-an-api.md)
- [Behaviours overview](../behaviours/index.md)
- [Troubleshooting](../operations/troubleshooting.md)

