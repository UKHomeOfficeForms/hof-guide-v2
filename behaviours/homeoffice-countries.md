# Home Office countries behaviour

## Purpose

The Home Office countries behaviour populates configured country fields with countries from the `homeoffice-countries` package.

## Key concepts

The behaviour runs during `configure`.

It looks for field keys listed in HOF component defaults and replaces their `options` with country options.

Each option has:

- `label`
- `value`

The first option is an empty value labelled `Please select a country`.

## Usage guidance

Use this behaviour when your service needs standard Home Office country options.

Apply it to a route or step containing country fields expected by the component defaults.

If you need a service-specific country list, define explicit field options instead.

## Examples

Route-level use:

```js
const HomeOfficeCountries = require('hof').components.homeOfficeCountries;

module.exports = {
  behaviours: [HomeOfficeCountries],
  steps: {
    '/nationality': {
      fields: ['nationality'],
      next: '/confirm'
    },
    '/confirm': {}
  }
};
```

Field:

```js
module.exports = {
  nationality: {
    mixin: 'select',
    validate: ['required'],
    options: []
  }
};
```

Step-level use:

```js
const HomeOfficeCountries = require('hof').components.homeOfficeCountries;

module.exports = {
  steps: {
    '/country-of-birth': {
      behaviours: [HomeOfficeCountries],
      fields: ['country-of-birth'],
      next: '/confirm'
    },
    '/confirm': {}
  }
};
```

## Common issues

### Options do not appear

Check that the field key is one of the configured Home Office country fields and that the field has an `options` property.

### The country list is not suitable

Use explicit options in the field config for service-specific lists.

## Related topics

- [Fields](../building-services/routes-steps-fields.md)
- [Validation](../building-services/validation.md)
- [Translations](../building-services/translations.md)
