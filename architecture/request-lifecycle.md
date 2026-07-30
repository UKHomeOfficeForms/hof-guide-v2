# Request lifecycle

## Purpose

This page explains how a request moves through a HOF application.

## Key concepts

At startup, HOF mounts middleware in a defined order. Important stages include:

1. Helmet and CSP
2. common locals
3. user bootstrap middleware
4. logging
5. static assets and view settings
6. sessions
7. health checks
8. translations, mixins and markdown
9. rate limiting if enabled
10. GOV.UK assets
11. service-unavailable redirect if enabled
12. user middleware added with `instance.use`
13. cookie middleware
14. route apps
15. error middleware

## Usage guidance

Place logic at the correct layer:

- application middleware for cross-cutting HTTP concerns
- route configuration for journey structure
- field config for input rules
- behaviours for step-specific custom logic
- models for external APIs

## Examples

Request through a form POST:

```text
POST /apply/name
  Express app middleware
  Session middleware
  Route app
  Wizard session model
  CSRF check
  Controller POST pipeline
    configure
    process
    validate
    sanitise
    saveValues
    successHandler
  Redirect to next step
```

Middleware that needs a session:

```js
module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    req.session.lastVisitedStep = req.form.options.route;
    super.configure(req, res, next);
  }
};
```

Middleware that does not need wizard state:

```js
function securityHeader(req, res, next) {
  res.setHeader('x-service-name', 'permit');
  next();
}

hof({
  root: __dirname,
  middleware: [securityHeader],
  routes: [require('./apps/permit')]
});
```

## Common issues

### Middleware needs `req.sessionModel` but runs too early

Move the logic into a behaviour because `req.sessionModel` is created inside the wizard route.

### Errors are not shown as validation errors

Validation errors must be returned as field-specific `ValidationError` objects.

## Related topics

- [Framework overview](framework-overview.md)
- [Middleware](../extending-hof/middleware.md)
- [Controller lifecycle](../extending-hof/controller-lifecycle.md)

