# Behaviours overview

## Purpose

This page explains how behaviours extend HOF form controllers.

## Key concepts

A behaviour is a function that receives a superclass and returns a subclass.

HOF mixes behaviours into the base controller for a step. Behaviours can override controller lifecycle methods such as:

- `configure`
- `process`
- `validate`
- `getValues`
- `saveValues`
- `locals`
- `successHandler`

Behaviours can be applied globally, at route level or at step level.

## Usage guidance

Use behaviours when configuration alone is not enough.

Good behaviour use cases:

- call an API when a form is submitted
- add derived values to the session
- customise validation
- customise page locals
- clear the session
- send a notification

Avoid behaviours for simple field labels, options or validators that can be configured directly.

Always call the superclass method unless the behaviour intentionally replaces the default lifecycle.

## Examples

Minimal behaviour:

```js
'use strict';

module.exports = superclass => class extends superclass {
  locals(req, res) {
    return {
      ...super.locals(req, res),
      supportEmail: 'support@example.gov.uk'
    };
  }
};
```

Step-level usage:

```js
const addSupportEmail = require('../../behaviours/add-support-email');

module.exports = {
  steps: {
    '/contact': {
      behaviours: [addSupportEmail],
      fields: ['email-address'],
      next: '/confirm'
    },
    '/confirm': {}
  }
};
```

Submit to an API on success:

```js
'use strict';

const ApplicationApi = require('../models/application-api');

module.exports = superclass => class extends superclass {
  successHandler(req, res, next) {
    const model = new ApplicationApi(null, {
      url: process.env.SUBMIT_URL,
      timeout: 5000
    });

    model.set(req.sessionModel.toJSON());

    model.save()
      .then(() => super.successHandler(req, res, next))
      .catch(next);
  }
};
```

## Common issues

### The page stops rendering

Check that the behaviour calls `super.locals`, `super.configure` or the relevant superclass method.

### The request hangs

Check that every asynchronous path calls `next`, `callback`, or delegates to `super`.

### Behaviour order matters

Behaviours are mixed into the controller. If two behaviours override the same method, order can affect the result.

## Related topics

- [Built-in behaviours](built-in.md)
- [Controller lifecycle](../extending-hof/controller-lifecycle.md)
- [Models and API integration](../extending-hof/models-and-api-integration.md)
