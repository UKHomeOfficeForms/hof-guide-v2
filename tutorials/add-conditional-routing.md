# Add conditional routing

## Purpose

This tutorial shows how to route users to different steps based on an answer.

## Key concepts

Use `forks` when the next page depends on submitted or session values.

A fork checks a field value after validation and sends the user to the fork target when the condition matches.

## Usage guidance

Make the normal path the step `next`. Add forks for exceptions.

This example builds on the simple form tutorial. It adds a radio question that asks whether the user has a reference number. Users who answer `yes` enter the reference before continuing to email.

## Examples

Add these fields to `apps/form/fields.js`:

```js
module.exports = {
  'has-reference': {
    mixin: 'radio-group',
    validate: ['required'],
    options: ['yes', 'no']
  },
  reference: {
    validate: ['required']
  },
  'email-address': {
    validate: ['required', 'email']
  }
};
```

Update the route in `apps/form/index.js`:

```js
'use strict';

const Summary = require('hof').components.summary;

module.exports = {
  name: 'form',
  baseUrl: '/',
  fields: 'apps/form/fields',
  translations: 'apps/form/translations',
  steps: {
    '/has-reference': {
      fields: ['has-reference'],
      next: '/email',
      forks: [{
        target: '/reference',
        condition: {
          field: 'has-reference',
          value: 'yes'
        }
      }]
    },
    '/reference': {
      fields: ['reference'],
      next: '/email'
    },
    '/email': {
      fields: ['email-address'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [Summary, 'complete'],
      sections: {
        details: ['has-reference', 'reference', 'email-address']
      },
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
```

Add or merge page text in `apps/form/translations/src/en/pages.json`:

```json
{
  "has-reference": {
    "header": "Do you have a reference number?",
    "title": "Do you have a reference number?"
  },
  "reference": {
    "header": "What is your reference number?",
    "title": "What is your reference number?"
  },
  "email": {
    "header": "What is your email address?",
    "title": "What is your email address?"
  },
  "confirm": {
    "header": "Check your answers",
    "title": "Check your answers",
    "sections": {
      "details": {
        "header": "Your details"
      }
    }
  },
  "confirmation": {
    "header": "Application complete",
    "title": "Application complete"
  }
}
```

Add or merge field and option text in `apps/form/translations/src/en/fields.json`:

```json
{
  "has-reference": {
    "legend": "Do you have a reference number?",
    "options": {
      "yes": {
        "label": "Yes"
      },
      "no": {
        "label": "No"
      }
    }
  },
  "reference": {
    "label": "Reference number"
  },
  "email-address": {
    "label": "Email address"
  }
}
```

Add or merge validation messages in `apps/form/translations/src/en/validation.json`:

```json
{
  "has-reference": {
    "required": "Select yes if you have a reference number"
  },
  "reference": {
    "required": "Enter your reference number"
  },
  "email-address": {
    "required": "Enter your email address",
    "email": "Enter an email address in the correct format, like name@example.com"
  }
}
```

Build and restart after changing route or translation files:

```bash
yarn build
yarn dev
```

## Common issues

### User always goes to the default next step

Check that the fork condition field and value match the submitted value. For this example, the submitted value is `yes` or `no`.

### Radio options render as placeholder keys

Check that `fields.json` contains `fields.has-reference.options.yes.label` and `fields.has-reference.options.no.label` through the nested JSON structure shown above.

### Multiple forks match

The last matching fork wins. Put the most specific fork last.

## Related topics

- [Conditional routing and fields](../building-services/conditional-routing-and-fields.md)
- [Routes, steps and fields](../building-services/routes-steps-fields.md)
- [Validation](../building-services/validation.md)
