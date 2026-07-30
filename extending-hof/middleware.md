# Middleware

## Purpose

This page explains where and how to add Express middleware to a HOF application.

## Key concepts

HOF is an Express application. You can add middleware:

- before most framework runtime pieces using `options.middleware`
- after bootstrap using the returned instance `use()` method
- inside route-specific behaviours and controller lifecycle methods

Framework middleware includes cookies, error handling, not found handling, deep translation, rate limiting and service unavailable handling.

## Usage guidance

Use application middleware for cross-cutting HTTP concerns such as request IDs or security headers.

Use behaviours for form-step-specific logic.

Do not add middleware that consumes the request body before HOF body parsing unless you understand the impact.

## Examples

Middleware during bootstrap:

```js
'use strict';

const hof = require('hof');

function requestId(req, res, next) {
  req.requestId = req.get('x-request-id') || crypto.randomUUID();
  res.setHeader('x-request-id', req.requestId);
  next();
}

hof({
  root: __dirname,
  middleware: [requestId],
  routes: [require('./apps/application')]
});
```

Middleware after bootstrap:

```js
const app = hof({
  root: __dirname,
  start: false,
  routes: [require('./apps/application')]
});

app.use((req, res, next) => {
  req.log.info('Request reached user middleware');
  next();
});

app.start();
```

Use built-in rate limiter:

```js
hof({
  root: __dirname,
  rateLimits: {
    requests: {
      active: true,
      windowSizeInMinutes: 5,
      maxWindowRequestCount: 100,
      windowLogIntervalInMinutes: 1,
      errCode: 'DDOS_RATE_LIMIT'
    }
  },
  routes: [require('./apps/application')]
});
```

## Common issues

### Middleware runs in the wrong order

Middleware supplied in bootstrap options runs before sessions and routes. Middleware added with `instance.use()` is mounted later.

### Middleware cannot access `req.sessionModel`

`req.sessionModel` is created by wizard middleware for step routes. Application middleware should use `req.session` instead, or move logic into a behaviour.

## Related topics

- [Security](../operations/security.md)
- [Rate limiting](../operations/security.md)
- [Controller lifecycle](controller-lifecycle.md)

