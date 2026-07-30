# Summary behaviour

## Purpose

The summary behaviour builds rows for a check answers page from values stored in the session model.

## Key concepts

The behaviour:

- reads configured sections
- resolves field labels from translations
- reads values from `req.sessionModel`
- adds `rows` to view locals
- creates change links for fields

If `sections` is not configured, it derives sections from step fields.

## Usage guidance

Use the summary behaviour on a check answers step.

Configure `sections` when you need explicit grouping, derived values, conditional rows or PDF-related omissions.

Pair it with `complete` if the check answers step is also the final step.

## Examples

Basic check answers page:

```js
const Summary = require('hof').components.summary;

module.exports = {
  steps: {
    '/name': {
      fields: ['full-name'],
      next: '/email'
    },
    '/email': {
      fields: ['email-address'],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: [Summary, 'complete'],
      next: '/confirmation'
    },
    '/confirmation': {}
  }
};
```

Explicit sections:

```js
const Summary = require('hof').components.summary;

module.exports = {
  steps: {
    '/confirm': {
      behaviours: [Summary, 'complete'],
      sections: {
        personalDetails: ['full-name'],
        contactDetails: ['email-address', 'phone-number']
      },
      next: '/confirmation'
    }
  }
};
```

Translation:

```json
{
  "pages": {
    "confirm": {
      "sections": {
        "personalDetails": {
          "header": "Personal details"
        },
        "contactDetails": {
          "header": "Contact details"
        }
      }
    }
  },
  "fields": {
    "full-name": {
      "label": "Full name"
    },
    "email-address": {
      "label": "Email address"
    }
  }
}
```

Derived row:

```js
sections: {
  details: [{
    field: 'full-name',
    derivation: {
      fromFields: ['first-name', 'last-name'],
      combiner: values => values.join(' ')
    }
  }]
}
```

## Common issues

### A row is missing

The behaviour filters out rows without values. Check the field key and session value.

### Change links point to the wrong step

The behaviour finds the first step containing the field. If a field appears on multiple steps, configure your journey carefully.

### Checkbox values are not translated

Ensure option translation keys exist under `fields.<field>.options.<value>`.

## Related topics

- [Complete](complete.md)
- [Routes, steps and fields](../building-services/routes-steps-fields.md)
- [Translations](../building-services/translations.md)
