# Formatters reference

## Purpose

This page lists HOF built-in formatters and shows how to use them.

## Key concepts

Formatters run during request processing before validation.

Default wizard formatters are:

- `trim`
- `singlespaces`
- `hyphens`

## Usage guidance

Use formatters to normalise values before validation and saving.

Avoid destructive formatting unless the user expectation is clear.

## Examples

Use built-in formatters:

```js
module.exports = {
  postcode: {
    formatter: ['removespaces', 'uppercase'],
    validate: ['required', 'postcode']
  },
  email: {
    formatter: ['trim', 'lowercase'],
    validate: ['required', 'email']
  }
};
```

Ignore defaults:

```js
module.exports = {
  statement: {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim'],
    validate: ['required']
  }
};
```

Custom formatter:

```js
function removeSlashesAndSpaces(value) {
  return typeof value === 'string' ? value.replace(/[\\/\s]/g, '') : value;
}

module.exports = {
  reference: {
    formatter: [removeSlashesAndSpaces, 'uppercase'],
    validate: ['required']
  }
};
```

## Built-in formatter names

- `trim`
- `boolean`
- `uppercase`
- `lowercase`
- `removespaces`
- `singlespaces`
- `hyphens`
- `removeroundbrackets`
- `removehyphens`
- `removeslashes`
- `ukphoneprefix`
- `base64decode`
- `ukPostcode`

## Common issues

### Formatting removes user-intended spacing

Set `ignore-defaults: true` and apply only the formatters needed.

### Validation appears to receive a different value

Validation sees the formatted value, not the raw request body.

## Related topics

- [Formatters](../building-services/formatters.md)
- [Validation](../building-services/validation.md)
- [Controller lifecycle](../extending-hof/controller-lifecycle.md)

