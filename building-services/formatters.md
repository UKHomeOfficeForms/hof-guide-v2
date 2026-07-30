# Formatters

## Purpose

This page explains how HOF formats submitted values before validation and saving.

## Key concepts

HOF applies default formatters unless a field sets `ignore-defaults`.

Default wizard formatters are:

- `trim`
- `singlespaces`
- `hyphens`

Field-specific formatters run after the defaults.

## Usage guidance

Use formatters for safe normalisation only. Do not use them to hide invalid input or to perform business decisions.

If whitespace is meaningful, set `ignore-defaults: true` and add only the formatters you want.

## Examples

Normalise a postcode:

```js
module.exports = {
  postcode: {
    validate: ['required', 'postcode'],
    formatter: ['removespaces', 'uppercase']
  }
};
```

Preserve line breaks in a textarea:

```js
module.exports = {
  'statement-details': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens'],
    validate: ['required', { type: 'maxlength', arguments: 5000 }]
  }
};
```

Custom formatter function:

```js
function removeReferencePrefix(value) {
  return typeof value === 'string' ? value.replace(/^REF-/, '') : value;
}

module.exports = {
  'case-reference': {
    formatter: ['trim', removeReferencePrefix],
    validate: ['required']
  }
};
```

## Common issues

### A value changes before validation

Remember that formatting happens before validation. Check default formatters and field-specific formatters.

### Textarea spacing is lost

Set `ignore-defaults: true` if the default `singlespaces` formatter is not appropriate.

## Related topics

- [Formatters reference](../reference/formatters.md)
- [Validation](validation.md)
- [Controller lifecycle](../extending-hof/controller-lifecycle.md)

