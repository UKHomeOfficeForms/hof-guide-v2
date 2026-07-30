# Static pages

## Purpose

This page explains how to add static pages to a HOF route.

## Key concepts

Static pages are GET-only pages configured with route `pages`.

Use static pages for content that does not need wizard state, validation or form submission.

The older global options `getCookies`, `getTerms` and `getAccessibility` exist, but are deprecated for service-specific content. Prefer route `pages`.

## Usage guidance

Use `pages` for:

- start pages
- accessibility statements
- privacy notices
- cookies pages
- terms and conditions
- help pages

Use `steps` when the page collects or processes form input.

## Examples

Static pages:

```js
module.exports = {
  name: 'public',
  baseUrl: '/',
  pages: {
    '/': 'start',
    '/cookies': {
      template: 'cookies',
      title: 'Cookies'
    },
    '/accessibility': {
      template: 'accessibility',
      title: 'Accessibility statement'
    }
  },
  steps: {
    '/name': {
      fields: ['full-name'],
      next: '/confirm'
    },
    '/confirm': {}
  }
};
```

View file:

```html
{{<partials-page}}
  {{$page-content}}
    <h1 class="govuk-heading-l">Cookies</h1>
    <p class="govuk-body">This service uses cookies to keep your session secure.</p>
  {{/page-content}}
{{/partials-page}}
```

## Common issues

### Static page content cannot access form values

Static pages do not run the wizard controller. Use a step if the page needs form state.

### Deprecated global static pages are too generic

Use route `pages` for service-specific legal and accessibility content.

## Related topics

- [Routes, steps and fields](routes-steps-fields.md)
- [Translations](translations.md)
- [Deprecations](../reference/deprecations.md)

