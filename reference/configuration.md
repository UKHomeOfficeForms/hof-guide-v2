# Configuration reference

## Purpose

This page lists the main HOF runtime configuration options.

## Key concepts

HOF merges defaults with service configuration. Many defaults can also be influenced by environment variables.

The most important required configuration is:

- `routes`
- `SESSION_SECRET`

Each route must contain `steps`, `pages` or both.

## Usage guidance

Keep runtime configuration close to `server.js`.

Keep build configuration in `hof.settings.json` or a build-specific config file.

Use environment variables for deployment-specific values such as secrets, Redis and ports.

## Examples

Typical bootstrap:

```js
'use strict';

const hof = require('hof');

hof({
  root: __dirname,
  appName: 'Permit application',
  port: process.env.PORT || 8080,
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || '6379'
  },
  session: {
    name: 'permit.sid',
    secret: process.env.SESSION_SECRET,
    ttl: Number(process.env.SESSION_TTL || 1800)
  },
  routes: [
    require('./apps/permit')
  ]
});
```

Disable automatic start for tests:

```js
const app = hof({
  root: __dirname,
  start: false,
  sessionStore: new session.MemoryStore(),
  routes: [require('./apps/permit')]
});

module.exports = app;
```

Service-unavailable mode:

```js
hof({
  root: __dirname,
  serviceUnavailable: process.env.SERVICE_UNAVAILABLE === 'true',
  routes: [require('./apps/permit')]
});
```

Build settings:

```json
{
  "build": {
    "sass": {
      "sourceMaps": true,
      "outputStyle": "expanded"
    },
    "js": {
      "sourceMaps": true
    }
  }
}
```

## Common issues

### `Must be called with a list of routes`

Pass `routes` as a non-empty array.

### `Each app must have steps and/or pages`

Every route object must define `steps`, `pages` or both.

### CSP blocks a script

Use the per-request `nonce` local for inline scripts or serve scripts using `src`.

## Related topics

- [Requirements](../getting-started/requirements.md)
- [Sessions and Redis](../operations/sessions-and-redis.md)
- [Security](../operations/security.md)

