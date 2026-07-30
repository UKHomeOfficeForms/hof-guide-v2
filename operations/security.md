# Security

## Purpose

This page summarises HOF security features and service responsibilities.

## Key concepts

HOF provides:

- Helmet middleware
- Content Security Policy support
- per-request CSP nonce
- `X-Content-Type-Options` no-sniff
- encrypted Redis session payloads
- secure, HTTP-only session cookies in production/HTTPS
- strict same-site cookie policy by default
- CSRF protection on wizard POST routes
- prototype pollution detection
- optional no-cache headers
- optional request and submission rate limits

Services remain responsible for:

- secrets management
- API authentication
- data minimisation
- access control
- dependency updates
- operational monitoring
- service-specific threat modelling

## Usage guidance

Do not disable security features unless you understand and document the risk.

Use CSP nonces for inline scripts.

Keep submitted data out of logs.

Use rate limits for high-risk public routes.

## Examples

Use CSP nonce in a template:

```html
<script {{#nonce}}nonce="{{nonce}}"{{/nonce}}>
  window.serviceReady = true;
</script>
```

Disable CSP only for a controlled diagnostic environment:

```js
hof({
  root: __dirname,
  csp: {
    disabled: process.env.DISABLE_CSP === 'true'
  },
  routes: [require('./apps/application')]
});
```

Enable no-cache headers:

```js
hof({
  root: __dirname,
  noCache: true,
  routes: [require('./apps/application')]
});
```

Enable request rate limiting:

```js
hof({
  root: __dirname,
  rateLimits: {
    requests: {
      active: true,
      windowSizeInMinutes: 5,
      maxWindowRequestCount: 100,
      windowLogIntervalInMinutes: 1,
      errCode: 'DDOS_RATE_LIMIT'
    }
  },
  routes: [require('./apps/application')]
});
```

CSRF is enabled by default. Disable only for a specific, justified test case:

```js
module.exports = {
  name: 'test-only',
  csrf: false,
  steps: {
    '/example': {
      fields: ['name'],
      next: '/done'
    },
    '/done': {}
  }
};
```

## Common issues

### Inline script is blocked

Add the `nonce` local to the script tag or move the script into a static file.

### POST returns a CSRF error

Check that the form includes the CSRF token and that the session has not expired.

### Prototype pollution is detected

HOF rejects suspicious request bodies. Investigate the submitted payload rather than bypassing the protection.

## Related topics

- [Sessions and Redis](sessions-and-redis.md)
- [Configuration](../reference/configuration.md)
- [Troubleshooting](troubleshooting.md)

