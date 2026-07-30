# Routes, steps and fields

## Purpose

This page explains how HOF routes, steps and fields work together.

## Key concepts

A route defines a form journey. A route can include:

- `name`
- `baseUrl`
- `fields`
- `views`
- `translations`
- `pages`
- `steps`
- route-level `behaviours`

A step defines one page in the journey. A step can include:

- `fields`
- `next`
- `forks`
- `behaviours`
- `template`
- `locals`
- `backLink`

A field defines the input rendered and validated on a step.

## Usage guidance

Use one route for one coherent journey.

Use `pages` for static GET pages and `steps` for pages that participate in the form wizard.

Keep field names stable. Values are stored in the session by field key.

## Examples

Route with three steps:

```js
'use strict';

module.exports = {
  name: 'permit',
  baseUrl: '/apply',
  fields: 'apps/permit/fields',
  steps: {
    '/start': {
      next: '/name'
    },
    '/name': {
      fields: ['full-name'],
      next: '/email'
    },
    '/email': {
      fields: ['email-address'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: ['complete'],
      next: '/done'
    },
    '/done': {
      backLink: false
    }
  }
};
```

Fields:

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

Route-level behaviour applied to all steps:

```js
'use strict';

const audit = require('../../behaviours/audit');

module.exports = {
  name: 'permit',
  behaviours: [audit],
  steps: {
    '/name': {
      fields: ['full-name'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: ['complete'],
      next: '/done'
    },
    '/done': {}
  }
};
```

## Common issues

### A field does not render

Check that the step lists the field key and that the field key exists in the loaded field configuration.

### A route has neither `steps` nor `pages`

HOF throws an error because each route must contain steps, pages or both.

### `/` redirects unexpectedly

If a wizard has no `/` step, HOF redirects `/` to the first configured step.

## Related topics

- [Application structure](application-structure.md)
- [Conditional routing and fields](conditional-routing-and-fields.md)
- [Behaviours overview](../behaviours/index.md)
