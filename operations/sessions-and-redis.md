# Sessions and Redis

## Purpose

This page explains how HOF stores session data and what services must configure.

## Key concepts

HOF uses `express-session` with Redis by default.

Session payloads stored in Redis are encrypted with a key derived from `SESSION_SECRET`.

The session secret is required and must be exactly 32 bytes.

Form values are stored under a wizard namespace and accessed through `req.sessionModel`.

## Usage guidance

Use Redis in production.

Use a unique session cookie name for each service.

Do not store unnecessary personal data in the session.

Clear sessions after successful completion when values are no longer needed.

## Examples

Production-style session config:

```js
hof({
  root: __dirname,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  session: {
    name: 'permit.sid',
    secret: process.env.SESSION_SECRET,
    ttl: Number(process.env.SESSION_TTL || 1800)
  },
  routes: [require('./apps/permit')]
});
```

Access session values in a behaviour:

```js
module.exports = superclass => class extends superclass {
  locals(req, res) {
    return {
      ...super.locals(req, res),
      fullName: req.sessionModel.get('full-name')
    };
  }
};
```

Clear session on a confirmation page:

```js
const ClearSession = require('hof').components.clearSession;

module.exports = {
  steps: {
    '/confirmation': {
      behaviours: [ClearSession],
      clearSession: true
    }
  }
};
```

Test session store:

```js
const session = require('express-session');

const app = hof({
  root: __dirname,
  start: false,
  sessionStore: new session.MemoryStore(),
  routes: [require('./apps/permit')]
});
```

## Common issues

### Session secret error on startup

Set `SESSION_SECRET` to an exact 32-byte value.

### Users are logged out unexpectedly

Check Redis availability, `SESSION_TTL`, cookie settings and whether a behaviour clears the session.

### Redis logs `UNCERTAIN_STATE` for command `INFO`

HOF's Redis client sends `INFO` as part of its connection ready check. If this fails immediately after HOF logs `Connected to redis`, Redis may have accepted the TCP connection and then crashed while handling `INFO`.

When Redis runs in Docker Compose, check it directly:

```bash
docker compose logs redis
docker compose exec redis redis-cli ping
```

If the logs include `qemu: uncaught target signal 11`, Docker is running the Redis image under an incompatible emulated platform. On Apple Silicon, remove any forced `linux/amd64` platform for Redis or set the service platform to `linux/arm64/v8`, then recreate the Redis container.

### Secure cookies do not work locally

Cookies are secure in production or HTTPS mode. Use development settings locally.

## Related topics

- [Requirements](../getting-started/requirements.md)
- [Clear session](../behaviours/clear-session.md)
- [Security](security.md)
