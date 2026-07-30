# Translations

## Purpose

This page explains how HOF loads and uses translation files.

## Key concepts

HOF uses translation middleware at application and route level.

Route translations are resolved from the route configuration. If route `name` is set, HOF can resolve route files under `apps/<name>/translations`.

Translation keys are used for:

- page titles and headers
- field labels, legends and hints
- option labels
- validation messages
- error pages
- component content

## Usage guidance

Keep translation keys aligned with field keys and step names.

Prefer explicit text in translation files rather than hard-coded labels inside field config.

Compile translation sources as part of the build pipeline.

## Examples

Route configuration:

```js
module.exports = {
  name: 'application',
  translations: 'apps/application/translations/__lng__/__ns__.json',
  steps: {
    '/name': {
      fields: ['full-name'],
      next: '/confirm'
    },
    '/confirm': {}
  }
};
```

Translation source:

```json
{
  "pages": {
    "name": {
      "title": "What is your full name?",
      "header": "What is your full name?"
    },
    "confirm": {
      "title": "Check your answers",
      "header": "Check your answers"
    }
  },
  "fields": {
    "full-name": {
      "label": "Full name"
    }
  },
  "validation": {
    "required": "Enter a value",
    "maxlength": "Enter a shorter value"
  }
}
```

Build translations:

```bash
hof-build translate
```

Use translated content in a behaviour:

```js
module.exports = superclass => class extends superclass {
  locals(req, res) {
    return {
      ...super.locals(req, res),
      supportMessage: req.translate('support.message')
    };
  }
};
```

## Common issues

### Raw translation keys appear on the page

The key was not found. Check the translation path, compiled output and key spelling.

### Validation messages are generic

Add field-level or validation-level messages for the specific error type.

## Related topics

- [First application](../getting-started/first-application.md)
- [Build a simple form](../tutorials/build-a-simple-form.md)
- [Configuration](../reference/configuration.md)

