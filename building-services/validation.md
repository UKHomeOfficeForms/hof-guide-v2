# Validation

## Purpose

This page explains how to validate user input in HOF.

## Key concepts

Validation runs during the POST pipeline after request processing and before values are saved.

Field `validate` entries can be:

- validator names, such as `required`
- validator objects with `type` and `arguments`
- custom validator functions

Many validators allow an empty string. Use `required` when the user must provide a value.

## Usage guidance

Always combine presence and format validation explicitly.

Use named built-in validators for common rules. Use custom validators for service-specific business rules.

Avoid doing API calls inside simple field validators. Put external calls in behaviours or models where errors can be handled clearly.

## Examples

Required email:

```js
module.exports = {
  'email-address': {
    validate: ['required', 'email']
  }
};
```

Maximum length:

```js
module.exports = {
  'full-name': {
    validate: [
      'required',
      { type: 'maxlength', arguments: 200 }
    ]
  }
};
```

Custom validator:

```js
function startsWithA(value) {
  return value === '' || value.toLowerCase().startsWith('a');
}

module.exports = {
  'reference-code': {
    validate: ['required', startsWithA]
  }
};
```

Custom controller validation in a behaviour:

```js
'use strict';

module.exports = superclass => class extends superclass {
  validate(req, res, next) {
    super.validate(req, res, err => {
      if (err) {
        return next(err);
      }

      if (req.form.values['start-date'] === req.form.values['end-date']) {
        return next({
          'end-date': new this.ValidationError('end-date', {
            key: 'end-date',
            type: 'sameAsStart'
          }, req, res)
        });
      }

      return next();
    });
  }
};
```

Translation:

```json
{
  "validation": {
    "required": "Enter a value",
    "email": "Enter an email address in the correct format",
    "sameAsStart": "The end date must be different from the start date"
  }
}
```

## Common issues

### Optional fields still show format errors

Check whether your custom validator returns `true` for empty strings when the field is optional.

### Option values fail validation

Fields with options automatically get an `equal` validator unless `groupedFieldsWithOptions` is set.

### Deprecated phone validator

Do not use `phonenumber`. Use `internationalPhoneNumber`, `ukPhoneNumber` or a service-specific validator.

## Related topics

- [Validators reference](../reference/validators.md)
- [Controller lifecycle](../extending-hof/controller-lifecycle.md)
- [Date component](../behaviours/date.md)
