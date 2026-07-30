# Notify behaviour

## Purpose

The Notify behaviour sends an email using GOV.UK Notify during `successHandler`.

## Key concepts

The behaviour is configured with:

- `notifyApiKey`
- `notifyTemplate`
- `recipient`
- `subject`
- `template`
- optional `parse`
- optional `attachment`

It reads a local Hogan template file, renders it with session data, then sends the rendered body through GOV.UK Notify.

HOF v24 removed old built-in nodemailer email functionality. Services must own their email implementation. This component provides a Notify-based behaviour but services still own Notify configuration and templates.

## Usage guidance

Use the Notify behaviour when a successful form submission should send an email.

Only call Notify after the form has enough validated data.

Do not hard-code production API keys. Use environment variables or a secret manager.

## Examples

Email template file:

```text
Application received

Name: {{full-name}}
Email: {{email-address}}
```

Behaviour setup:

```js
'use strict';

const path = require('path');
const notify = require('hof').components.notify;

module.exports = notify({
  notifyApiKey: process.env.NOTIFY_API_KEY,
  notifyTemplate: process.env.NOTIFY_TEMPLATE_ID,
  recipient: 'email-address',
  subject: 'Application received',
  template: path.resolve(__dirname, '../emails/application-received.txt')
});
```

Route usage:

```js
const sendEmail = require('../../behaviours/send-email');

module.exports = {
  steps: {
    '/confirm': {
      behaviours: [sendEmail, 'complete'],
      next: '/confirmation'
    },
    '/confirmation': {}
  }
};
```

Use a dynamic recipient:

```js
const notify = require('hof').components.notify;

module.exports = notify({
  notifyApiKey: process.env.NOTIFY_API_KEY,
  notifyTemplate: process.env.NOTIFY_TEMPLATE_ID,
  recipient: values => values['caseworker-email'],
  subject: values => `Application from ${values['full-name']}`,
  template: require.resolve('../emails/caseworker.txt'),
  parse: values => ({
    'full-name': values['full-name'],
    'email-address': values['email-address']
  })
});
```

## Common issues

### `Email recipient must be defined`

Set `recipient` in the behaviour config.

### `Email template must be defined`

Set `template` to the local Hogan template file path.

### `hof-behaviour-emailer: invalid recipient`

The resolved recipient is not an email address string. Check the field key or recipient function.

### Notify errors appear as server errors

The behaviour passes Notify failures to error middleware. If users need a specific recovery journey, wrap Notify in a service-owned behaviour.

## Related topics

- [Models and API integration](../extending-hof/models-and-api-integration.md)
- [Complete](complete.md)
- [Security](../operations/security.md)
