# Core concepts

## Purpose

This page explains the main building blocks used in a HOF application.

## Key concepts

### Application

A HOF application is an Express application created by calling the HOF bootstrap function.

### Route

A route defines a section of the service. A route can contain form `steps` and static `pages`.

### Step

A step is one page in a form journey. A step usually defines fields, a `next` route and optional behaviours.

### Field

A field defines one input or group of inputs. It can include validation, formatting, options, labels, hints and attributes.

### Behaviour

A behaviour is reusable controller logic mixed into a step controller.

### Session model

HOF stores in-progress form values in the session. Controllers access values through `req.sessionModel`.

## Usage guidance

Model your service as:

```text
Application
  Route
    Step
      Field
      Behaviour
```

Start with the simplest route and add behaviours only when configuration is no longer enough.

## Examples

Route, step and field together:

```js
// apps/example/index.js
'use strict';

module.exports = {
  name: 'example',
  baseUrl: '/',
  fields: 'apps/example/fields',
  steps: {
    '/contact-details': {
      fields: ['email-address'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: ['complete'],
      next: '/confirmation'
    },
    '/confirmation': {}
  }
};
```

```js
// apps/example/fields.js
'use strict';

module.exports = {
  'email-address': {
    validate: ['required', 'email']
  }
};
```

## Common issues

### Putting business logic in field configuration

Keep field configuration declarative. Put custom processing in behaviours or models.

### Replacing controllers too early

Custom step controllers are deprecated. Prefer behaviours.

## Related topics

- [Routes, steps and fields](../building-services/routes-steps-fields.md)
- [Behaviours overview](../behaviours/index.md)
- [Sessions and Redis](../operations/sessions-and-redis.md)
