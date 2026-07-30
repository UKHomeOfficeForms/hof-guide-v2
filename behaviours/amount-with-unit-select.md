# Amount with unit select component

## Purpose

The amount with unit select component lets a user enter an amount and choose a unit in one field component.

## Key concepts

The component returns field configuration with hooks.

It creates child fields:

- `<key>-amount`
- `<key>-unit`

It combines the submitted amount and unit into one parent value.

It moves most validators to the amount child field and validates unit options separately.

## Usage guidance

Use this component when the value only makes sense as an amount with a unit, such as weight, length or volume.

Use `amountOptional` and `unitOptional` only when the service accepts incomplete values.

Do not use this component as a step behaviour. Use it in `fields.js`.

## Examples

Field:

```js
const amountWithUnitSelect = require('hof').components.amountWithUnitSelect;

module.exports = {
  'package-weight': amountWithUnitSelect('package-weight', {
    mixin: 'input-amount-with-unit-select',
    legend: 'What is the package weight?',
    amountLabel: 'Amount',
    unitLabel: 'Unit',
    hint: 'For example, 5 kilograms',
    validate: ['required', 'numeric'],
    options: [
      { value: '', label: 'Select a unit' },
      { value: 'kg', label: 'Kilograms' },
      { value: 'g', label: 'Grams' }
    ]
  })
};
```

Step:

```js
module.exports = {
  steps: {
    '/package-weight': {
      fields: ['package-weight'],
      next: '/confirm'
    },
    '/confirm': {}
  }
};
```

Optional amount with required unit:

```js
const amountWithUnitSelect = require('hof').components.amountWithUnitSelect;

module.exports = {
  'estimated-weight': amountWithUnitSelect('estimated-weight', {
    amountOptional: 'true',
    unitOptional: 'false',
    options: [
      { value: '', label: 'Select a unit' },
      { value: 'kg', label: 'Kilograms' }
    ]
  })
};
```

Translations:

```json
{
  "fields": {
    "package-weight": {
      "legend": "What is the package weight?"
    },
    "package-weight-amount": {
      "label": "Amount"
    },
    "package-weight-unit": {
      "label": "Unit"
    }
  }
}
```

## Common issues

### Unit validation fails for valid options

Check the `options` values. The component creates an `equal` validator from option values.

### Numeric validation applies to the combined value

The component moves non-required and non-equal validators to the amount child field.

### Optional flags do not behave as expected

The component checks string values such as `'true'`. Be consistent with existing HOF component conventions.

## Related topics

- [Validation](../building-services/validation.md)
- [Formatters](../building-services/formatters.md)
- [Fields](../building-services/routes-steps-fields.md)
