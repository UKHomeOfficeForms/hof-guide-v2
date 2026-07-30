# Complete behaviour

## Purpose

The `complete` behaviour marks a wizard journey as complete when a step succeeds.

## Key concepts

The behaviour is included by the wizard and can be referenced by string:

```js
behaviours: ['complete']
```

It sets the wizard application-complete flag in the session model during `successHandler`.

If the completed step has a `next` step, the behaviour allows the next step to be accessed after completion.

## Usage guidance

Use `complete` on the final processing or check answers step before the confirmation page.

Do not use it on early journey steps. Once a journey is complete, HOF can reset or restrict access depending on wizard completion rules.

## Examples

Check answers step:

```js
module.exports = {
  steps: {
    '/name': {
      fields: ['full-name'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: ['complete'],
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
```

With summary behaviour:

```js
const Summary = require('hof').components.summary;

module.exports = {
  steps: {
    '/confirm': {
      behaviours: [Summary, 'complete'],
      sections: {
        details: ['full-name', 'email-address']
      },
      next: '/confirmation'
    },
    '/confirmation': {}
  }
};
```

## Common issues

### Users cannot revisit previous steps after confirmation

That is usually expected after a journey is complete. Check whether the confirmation page is the correct step after `complete`.

### The complete flag is set before submission logic runs

If you also submit to an API, order your behaviours carefully and only continue after submission succeeds.

## Related topics

- [Summary](summary.md)
- [Submit data to an API](../tutorials/submit-data-to-an-api.md)
- [Controller lifecycle](../extending-hof/controller-lifecycle.md)
