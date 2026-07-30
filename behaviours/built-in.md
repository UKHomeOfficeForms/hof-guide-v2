# Built-in behaviours and components

## Purpose

This section documents each behaviour and component exported by HOF.

## Key concepts

HOF exports behaviours and components through:

```js
const hof = require('hof');

hof.components.summary;
hof.components.clearSession;
hof.components.notify;
```

The wizard also includes the string behaviour:

```js
behaviours: ['complete']
```

Some exports are behaviours mixed into controllers. Others are field components that return field configuration with hooks.

## Usage guidance

Use built-in behaviours before writing custom logic.

Read the individual page before using a behaviour because each one expects different configuration and runs at different lifecycle points.

## Examples

Import a component behaviour:

```js
const Summary = require('hof').components.summary;

module.exports = {
  steps: {
    '/confirm': {
      behaviours: [Summary, 'complete'],
      next: '/confirmation'
    },
    '/confirmation': {}
  }
};
```

Import a configurable behaviour:

```js
const notify = require('hof').components.notify;

const sendConfirmation = notify({
  notifyApiKey: process.env.NOTIFY_API_KEY,
  notifyTemplate: process.env.NOTIFY_TEMPLATE_ID,
  recipient: 'email-address',
  subject: 'Application received',
  template: require.resolve('../../emails/confirmation.txt')
});
```

## Common issues

### Treating field components as controller behaviours

`date` and `amountWithUnitSelect` return field configuration. Use them in `fields.js`, not in a step `behaviours` array.

### Mixing behaviour order randomly

If multiple behaviours override the same controller method, order can matter.

## Related topics

- [Behaviours overview](index.md)
- [Controller lifecycle](../extending-hof/controller-lifecycle.md)
- [Summary](summary.md)
