# What is HOF?

## Purpose

Home Office Forms, usually called HOF, is a Node.js framework for building server-rendered form services using GOV.UK patterns.

It helps teams build services that collect information from users through a sequence of form pages. HOF provides common form-service features so teams do not need to rebuild them for every service.

## Key concepts

A HOF service is built from:

- an application bootstrap configuration
- one or more route definitions
- steps within each route
- field configuration used by those steps
- views and translations
- optional behaviours for custom logic

HOF runs on Express and renders pages on the server.

## Usage guidance

Use HOF when your service is primarily a form journey. A good HOF service usually has:

- a clear start and end
- one or more pages that collect user input
- validation rules
- conditional routes or fields
- a final confirmation or submission step

Do not treat HOF as a general-purpose frontend framework. It is designed for form workflows, not rich client-side applications.

## Examples

Minimal HOF application:

```js
'use strict';

const path = require('path');
const hof = require('hof');

hof({
  root: __dirname,
  appName: 'Example HOF service',
  routes: [{
    name: 'example',
    baseUrl: '/',
    fields: 'apps/example/fields',
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
  }]
});
```

The app above tells HOF to:

1. load fields from `apps/example/fields`
2. render a `/name` step
3. store the submitted value in the session
4. continue to `/confirm`
5. mark the journey complete before `/done`

## Common issues

### HOF is chosen for the wrong type of service

If your product needs a highly interactive browser application, an API-only service or real-time updates, HOF is probably not the right core framework.

### Teams expect permanent storage automatically

HOF stores in-progress form data in the session. Services must implement their own permanent submission, casework or API integration logic.

## Related topics

- [Is HOF right for me?](is-hof-right-for-me.md)
- [Core concepts](core-concepts.md)
- [First application](first-application.md)

