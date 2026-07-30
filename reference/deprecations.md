# Deprecations

## Purpose

This page lists deprecated or upgrade-sensitive HOF features.

## Key concepts

Deprecated features may still work but should not be used for new services.

Upgrade-sensitive features can change service behaviour during framework upgrades.

## Usage guidance

Avoid deprecated features in new code.

When maintaining an existing service, replace deprecated patterns during planned maintenance rather than waiting for a breaking change.

## Examples

Use behaviours instead of custom step controllers:

```js
// Avoid for new code
steps: {
  '/confirm': {
    controller: CustomController
  }
}
```

Use:

```js
steps: {
  '/confirm': {
    behaviours: [SubmitApplication]
  }
}
```

Use route pages instead of global static page flags:

```js
// Avoid for new code
hof({
  getCookies: true,
  getTerms: true
});
```

Use:

```js
module.exports = {
  pages: {
    '/cookies': {
      template: 'cookies',
      title: 'Cookies'
    },
    '/terms-and-conditions': {
      template: 'terms',
      title: 'Terms and conditions'
    }
  },
  steps: {
    '/start': {}
  }
};
```

Use current phone validators:

```js
module.exports = {
  phone: {
    validate: ['required', 'internationalPhoneNumber']
  }
};
```

## Deprecated or discouraged features

- `baseController`
- custom step `controller`
- `getAccessibility`
- `getCookies`
- `getTerms`
- `phonenumber`
- old `this.Error` access pattern
- old built-in nodemailer/emailer functionality removed in v24

## Common issues

### Existing service uses removed email functionality

Implement and maintain service-owned email logic, usually with GOV.UK Notify.

### Static legal pages are generic

Replace framework defaults with service-specific pages.

### Session secret change invalidates sessions

HOF requires a 32-byte session secret. Changing it invalidates existing sessions.

## Related topics

- [Version 24](../migration/v24.md)
- [Static pages](../building-services/static-pages.md)
- [Notify](../behaviours/notify.md)
