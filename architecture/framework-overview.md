# Framework overview

## Purpose

This page describes the major HOF modules and how they fit together.

## Key concepts

HOF is structured around these modules:

| Module | Role |
|---|---|
| `index.js` | Express bootstrap and runtime lifecycle |
| `lib/router.js` | Route app creation |
| `wizard/` | Multi-step form routing |
| `controller/` | Form request handling |
| `model/` | Local and HTTP model abstraction |
| `middleware/` | Framework middleware |
| `components/` | Reusable behaviours and field components |
| `frontend/` | GOV.UK templates, mixins and partials |
| `build/` | Asset and translation build tasks |
| `transpiler/` | Translation compilation |

## Usage guidance

Understand the runtime model before extending HOF.

Most service code should use public configuration, behaviours and models rather than importing internal framework files.

## Examples

Public imports:

```js
const hof = require('hof');

const Summary = hof.components.summary;
const Model = hof.model;
const middleware = hof.middleware;
```

Avoid service code that reaches into internal files:

```js
// Avoid in service code
const internalController = require('hof/controller/base-controller');
```

High-level runtime:

```text
bootstrap
  express app
    framework middleware
    sessions
    translations
    route apps
      static pages
      wizard steps
        controller pipeline
    error middleware
```

## Common issues

### Extending internal modules directly

Prefer behaviours and public exports. Internal structure can change between versions.

### Confusing route apps with wizard steps

Routes are mounted Express apps. Steps are wizard routes inside a route app.

## Related topics

- [Request lifecycle](request-lifecycle.md)
- [Controller lifecycle](../extending-hof/controller-lifecycle.md)
- [Behaviours overview](../behaviours/index.md)

