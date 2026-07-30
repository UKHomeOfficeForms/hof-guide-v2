# Session timeout warning behaviour

## Purpose

The session timeout warning behaviour customises timeout warning, exit and save-and-exit content.

## Key concepts

The behaviour:

- resets the session model when the current route is `/exit`
- adds locals for custom session timeout warning content
- adds locals for exit page content
- adds locals for save-and-exit page content

The framework also provides a `/session-timeout` route unless custom session timeout handling is enabled.

## Usage guidance

Use this behaviour on `/exit` and `/save-and-exit` steps when your service uses HOF's timeout warning journey.

Set the relevant framework config flags to control whether default or custom content is used.

## Examples

Route:

```js
const SessionTimeoutWarning = require('hof').components.sessionTimeoutWarning;

module.exports = {
  steps: {
    '/details': {
      fields: ['full-name'],
      locals: {
        showSaveAndExit: true
      },
      next: '/confirm'
    },
    '/exit': {
      behaviours: [SessionTimeoutWarning]
    },
    '/save-and-exit': {
      behaviours: [SessionTimeoutWarning]
    },
    '/confirm': {}
  }
};
```

Bootstrap options:

```js
hof({
  root: __dirname,
  sessionTimeoutWarningContent: true,
  exitFormContent: true,
  saveExitFormContent: true,
  routes: [require('./apps/application')]
});
```

Translation for default content mode:

```json
{
  "exit": {
    "title": "You have left the form",
    "header": "You have left the form",
    "message": "Your answers have been cleared."
  },
  "save-and-exit": {
    "title": "You have saved and exited",
    "header": "You have saved and exited",
    "message": "You can return later using your saved link."
  }
}
```

## Common issues

### Exit page does not clear values

Check that the route path is `/exit` and the behaviour is applied to that step.

### Custom content does not appear

Check the relevant config flags and translation keys.

### Custom timeout handling conflicts with built-in route

If using `USE_CUSTOM_SESSION_TIMEOUT`, include your own `/session-timeout` step.

## Related topics

- [Sessions and Redis](../operations/sessions-and-redis.md)
- [Static pages](../building-services/static-pages.md)
- [Configuration](../reference/configuration.md)
