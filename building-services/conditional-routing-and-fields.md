# Conditional routing and fields

## Purpose

This page explains how to send users through different routes and how to conditionally include fields.

## Key concepts

HOF supports two common conditional patterns:

- step-level `forks` to change the next route
- field-level `useWhen` to include or omit fields

Fork conditions can use a field/value object or a function.

If more than one fork matches, the last matching fork wins.

## Usage guidance

Use `forks` when the user's answer changes the page they should see next.

Use `useWhen` when the page remains the same but a field should only apply in some circumstances.

Keep condition functions simple and deterministic.

## Examples

Fork using a field value:

```js
module.exports = {
  steps: {
    '/has-reference': {
      fields: ['has-reference'],
      next: '/contact-details',
      forks: [{
        target: '/reference-number',
        condition: {
          field: 'has-reference',
          value: 'yes'
        }
      }]
    },
    '/reference-number': {
      fields: ['reference-number'],
      next: '/contact-details'
    },
    '/contact-details': {
      fields: ['email-address'],
      next: '/confirm'
    },
    '/confirm': {}
  }
};
```

Fork using a function:

```js
module.exports = {
  steps: {
    '/age': {
      fields: ['age'],
      next: '/adult-details',
      forks: [{
        target: '/under-18',
        condition: req => Number(req.form.values.age) < 18
      }]
    },
    '/under-18': {},
    '/adult-details': {}
  }
};
```

Conditional field:

```js
module.exports = {
  'has-other-name': {
    mixin: 'radio-group',
    validate: ['required'],
    options: ['yes', 'no']
  },
  'other-name': {
    validate: ['required'],
    useWhen: {
      field: 'has-other-name',
      value: 'yes'
    }
  }
};
```

Step using both fields:

```js
module.exports = {
  steps: {
    '/names': {
      fields: ['has-other-name', 'other-name'],
      next: '/confirm'
    },
    '/confirm': {}
  }
};
```

## Common issues

### A fork does not run

Check that the condition uses the submitted field key and value exactly.

### The wrong fork runs

If multiple forks match, the last matching fork wins. Order your forks deliberately.

### A hidden field still has an old value

HOF removes omitted `useWhen` fields and unsets their values during the controller flow.

## Related topics

- [Routes, steps and fields](routes-steps-fields.md)
- [Validation](validation.md)
- [Controller lifecycle](../extending-hof/controller-lifecycle.md)

