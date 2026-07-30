# Requirements

## Purpose

This page describes the runtime and development requirements for HOF applications.

## Key concepts

HOF is a Node.js framework. It uses Express for HTTP routing and Redis-backed sessions by default.

The analysed framework version supports modern Node.js runtimes. New HOF services should target Node.js `>=24.15.0`.

## Usage guidance

Use the same Node.js major version locally, in continuous integration and in production.

For normal development and production use, run Redis unless your application explicitly provides another session store.

Set a unique session secret for every deployed service.

## Examples

Local environment:

```bash
export NODE_ENV=development
export PORT=8080
export REDIS_HOST=127.0.0.1
export REDIS_PORT=6379
export SESSION_SECRET=12345678901234567890123456789012
```

The `SESSION_SECRET` value above is exactly 32 bytes. Use it only as a local example.

Minimal `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "build": "hof-build",
    "watch": "hof-build watch --env .env"
  },
  "dependencies": {
    "hof": "^24.5.0"
  },
  "engines": {
    "node": ">=24.15.0"
  }
}
```

## Common issues

### `Session secret is required`

Set `SESSION_SECRET`.

### `Session secret must be exactly 32 bytes`

Change `SESSION_SECRET` to a value that is exactly 32 bytes when encoded as UTF-8.

### Redis connection errors

Check that Redis is running and that `REDIS_HOST` and `REDIS_PORT` match your environment.

## Related topics

- [First application](first-application.md)
- [Sessions and Redis](../operations/sessions-and-redis.md)
- [Configuration](../reference/configuration.md)
