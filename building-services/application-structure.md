# Application structure

## Purpose

This page describes a maintainable structure for HOF applications.

## Key concepts

HOF resolves paths relative to the configured `root`. Route-specific files can be placed under `apps/<route-name>/`.

Common locations are:

- `server.js` - application bootstrap
- `hof.settings.json` - optional build/runtime settings
- `apps/<name>/index.js` - route configuration
- `apps/<name>/fields.js` - route field configuration
- `apps/<name>/views/` - route views
- `apps/<name>/translations/` - route translations
- `behaviours/` - service-owned behaviours
- `models/` - service-owned API models

## Usage guidance

Keep each route self-contained unless fields, behaviours or views are genuinely shared.

Use route `name` to let HOF infer default paths under `apps/<name>/`, or set explicit paths when your structure is different.

## Examples

Recommended layout:

```text
server.js
hof.settings.json
apps/
  application/
    index.js
    fields.js
    views/
      check-details.html
    translations/
      src/
        en/
          default.json
behaviours/
  submit-application.js
models/
  application-api.js
```

Bootstrap:

```js
'use strict';

const hof = require('hof');

hof({
  root: __dirname,
  appName: 'Application service',
  routes: [
    require('./apps/application')
  ]
});
```

Route:

```js
'use strict';

module.exports = {
  name: 'application',
  baseUrl: '/',
  steps: {
    '/start': {
      next: '/name'
    },
    '/name': {
      fields: ['full-name'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [require('../../behaviours/submit-application')],
      next: '/confirmation'
    },
    '/confirmation': {}
  }
};
```

With `name: 'application'`, HOF can resolve fields from `apps/application/fields` if no explicit `fields` path is supplied.

## Common issues

### Files are not found after moving a route

Check `root`, route `name`, and any explicit `fields`, `views` or `translations` paths.

### Shared fields are overwritten unexpectedly

Route-level fields override common fields with the same key.

## Related topics

- [Routes, steps and fields](routes-steps-fields.md)
- [Configuration](../reference/configuration.md)
- [Translations](translations.md)

