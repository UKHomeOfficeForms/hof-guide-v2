# Clear session behaviour

## Purpose

The clear session behaviour resets the wizard session model when a page has no next step or when `clearSession` is explicitly enabled.

## Key concepts

The behaviour overrides `getValues`.

It resets `req.sessionModel` when:

- the step has no `next` and `clearSession` is not `false`
- `clearSession` is `true`

It also resets some confirm-step PDF/submission flags when the current path is not the confirm step.

## Usage guidance

Use this behaviour for terminal pages where form values should not remain available.

Do not use it before data has been submitted or before the user has finished the journey.

## Examples

Clear session on confirmation:

```js
const ClearSession = require('hof').components.clearSession;

module.exports = {
  steps: {
    '/confirm': {
      behaviours: ['complete'],
      next: '/confirmation'
    },
    '/confirmation': {
      behaviours: [ClearSession],
      clearSession: true,
      backLink: false
    }
  }
};
```

Terminal step without `next`:

```js
const ClearSession = require('hof').components.clearSession;

module.exports = {
  steps: {
    '/done': {
      behaviours: [ClearSession],
      clearSession: true
    }
  }
};
```

Keep session values despite no `next`:

```js
const ClearSession = require('hof').components.clearSession;

module.exports = {
  steps: {
    '/debug-summary': {
      behaviours: [ClearSession],
      clearSession: false
    }
  }
};
```

## Common issues

### Values disappear before they are submitted

Move the behaviour to a later step or set `clearSession: false`.

### Confirmation page cannot display submitted values

If the confirmation page needs values, do not clear the session until after those values are no longer needed.

## Related topics

- [Complete](complete.md)
- [Sessions and Redis](../operations/sessions-and-redis.md)
- [Controller lifecycle](../extending-hof/controller-lifecycle.md)
