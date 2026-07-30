# Date component

## Purpose

The date component creates a three-part date input that stores a single `YYYY-MM-DD` value.

## Key concepts

The component returns field configuration with hooks.

It creates child fields:

- `<key>-day`
- `<key>-month`
- `<key>-year`

It adds the `date` validator automatically.

It can allow optional day and month parts through options.

## Usage guidance

Use the date component for dates that should be entered as day, month and year.

Use validators such as `before`, `after` or `over18` to enforce date rules.

Do not use the date component as a step behaviour. Use it in `fields.js`.

## Examples

Basic date of birth:

```js
const date = require('hof').components.date;

module.exports = {
  'date-of-birth': date('date-of-birth', {
    isPageHeading: true,
    validate: [
      'required',
      'over18'
    ]
  })
};
```

Step:

```js
module.exports = {
  steps: {
    '/date-of-birth': {
      fields: ['date-of-birth'],
      next: '/confirm'
    },
    '/confirm': {}
  }
};
```

Translations:

```json
{
  "fields": {
    "date-of-birth": {
      "legend": "What is your date of birth?",
      "hint": "For example, 27 3 1984",
      "parts": {
        "day": "Day",
        "month": "Month",
        "year": "Year"
      }
    }
  },
  "validation": {
    "required": "Enter your date of birth",
    "date": "Enter a real date",
    "over18": "You must be 18 or over"
  }
}
```

Month and year only:

```js
const date = require('hof').components.date;

module.exports = {
  'permit-start-month': date('permit-start-month', {
    dayOptional: true,
    validate: ['required', { type: 'after', arguments: ['2020-01-01'] }]
  })
};
```

## Common issues

### Date values are saved as one string

This is expected. The component stores `YYYY-MM-DD` under the parent key.

### Partial dates fail validation

Set `dayOptional` or `monthOptional` only when your service accepts partial dates.

### Error messages appear on child inputs

The component adds child errors so the GOV.UK error state points to the correct input parts.

## Related topics

- [Validation](../building-services/validation.md)
- [Validators reference](../reference/validators.md)
- [Fields](../building-services/routes-steps-fields.md)
