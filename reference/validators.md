# Validators reference

## Purpose

This page lists HOF built-in validators and shows how to use them.

## Key concepts

Validators return truthy for valid input and falsy for invalid input.

Many validators allow an empty string. Add `required` when a field must be completed.

## Usage guidance

Prefer built-in validators for common rules.

Use validator objects when the rule needs arguments.

Use custom functions for service-specific rules.

## Examples

Built-in validators:

```js
module.exports = {
  email: {
    validate: ['required', 'email']
  },
  website: {
    validate: ['url']
  },
  age: {
    validate: ['required', 'numeric', { type: 'min', arguments: 18 }]
  },
  postcode: {
    validate: ['required', 'postcode']
  }
};
```

Date validators:

```js
module.exports = {
  'start-date': {
    validate: [
      'required',
      'date',
      { type: 'after', arguments: ['2024-01-01'] }
    ]
  }
};
```

Options validator:

```js
module.exports = {
  country: {
    mixin: 'select',
    validate: ['required'],
    options: [
      { value: '', label: 'Select a country' },
      { value: 'GB', label: 'United Kingdom' },
      { value: 'FR', label: 'France' }
    ]
  }
};
```

HOF automatically applies an `equal` validator to option fields unless `groupedFieldsWithOptions` is set.

Custom validator:

```js
function isUppercase(value) {
  return value === '' || value === value.toUpperCase();
}

module.exports = {
  reference: {
    validate: ['required', isUppercase]
  }
};
```

## Built-in validator names

- `string`
- `decimal`
- `regex`
- `required`
- `url`
- `notUrl`
- `email`
- `between`
- `min`
- `max`
- `minlength`
- `maxlength`
- `maxword`
- `exactlength`
- `alphanum`
- `numeric`
- `equal`
- `internationalPhoneNumber`
- `ukPhoneNumber`
- `ukmobilephone`
- `date`
- `date-year`
- `date-month`
- `date-day`
- `before`
- `after`
- `over18`
- `postcode`

Deprecated:

- `phonenumber`

## Common issues

### Optional fields fail validation

Check whether the validator supports empty strings. If it does not, make the validator return `true` for empty values when the field is optional.

### Date arguments are unclear

Date validators operate on `YYYY-MM-DD` date strings. Use the date component when users enter day, month and year separately.

## Related topics

- [Validation](../building-services/validation.md)
- [Date component](../behaviours/date.md)
- [Deprecations](deprecations.md)
