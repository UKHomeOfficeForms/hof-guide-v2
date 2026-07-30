# Controller lifecycle

## Purpose

This page explains how HOF handles GET and POST requests for form steps.

## Key concepts

The base controller has separate GET and POST pipelines.

GET pipeline:

```text
configure
get errors
get values
locals
render
```

POST pipeline:

```text
configure
process
validate
sanitise
get historical values
save values
success handler
```

Field hooks can run before and after supported lifecycle methods.

## Usage guidance

Choose the lifecycle method that matches the task:

- use `configure` to modify field or step options
- use `process` to modify submitted values before validation
- use `validate` for custom validation
- use `saveValues` to change what is stored in the session
- use `locals` to add data used by the view
- use `successHandler` for final submission or notification

## Examples

Add a derived value before saving:

```js
'use strict';

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    req.form.values['full-name-normalised'] =
      req.form.values['full-name'].toLowerCase();

    super.saveValues(req, res, next);
  }
};
```

Use a field hook:

```js
function preProcess(req, res, next) {
  req.body.reference = req.body.reference && req.body.reference.trim();
  next();
}

module.exports = {
  reference: {
    validate: ['required'],
    hooks: {
      'pre-process': preProcess
    }
  }
};
```

Custom validation:

```js
'use strict';

module.exports = superclass => class extends superclass {
  validate(req, res, next) {
    super.validate(req, res, err => {
      if (err) {
        return next(err);
      }

      if (req.form.values.reference === 'INVALID') {
        return next({
          reference: new this.ValidationError('reference', {
            key: 'reference',
            type: 'invalidReference'
          }, req, res)
        });
      }

      return next();
    });
  }
};
```

## Common issues

### Validation sees unformatted input

Formatting happens during processing. Check whether your behaviour runs before or after `_process`.

### Data is saved but not displayed

Check whether `getValues` or `locals` needs to expose the value to the view.

### Errors are swallowed

Do not catch errors and continue as if the request succeeded. Pass errors to `next` or the callback.

## Related topics

- [Behaviours overview](../behaviours/index.md)
- [Validation](../building-services/validation.md)
- [Formatters](../building-services/formatters.md)

