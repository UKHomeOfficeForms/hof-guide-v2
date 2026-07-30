# Troubleshooting

## Purpose

This page helps support engineers and developers diagnose common HOF issues.

## Key concepts

Most HOF issues fall into one of these areas:

- startup configuration
- route or field resolution
- sessions and Redis
- validation
- translations
- CSRF or security middleware
- build output
- custom behaviours

## Usage guidance

Start with the error message and the last changed area.

Check framework defaults before assuming old guide behaviour is still valid.

For custom behaviours, check that every asynchronous path calls `next`, a callback or `super`.

## Examples

Startup check:

```bash
node -v
echo "$SESSION_SECRET" | wc -c
redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" ping
yarn build
yarn start
```

Route resolution debug behaviour:

```js
module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    req.log.info(`Route ${req.form.options.route}`);
    req.log.info(`Fields ${Object.keys(req.form.options.fields).join(', ')}`);
    super.configure(req, res, next);
  }
};
```

Inspect session values in development:

```js
module.exports = superclass => class extends superclass {
  locals(req, res) {
    return {
      ...super.locals(req, res),
      debugValues: JSON.stringify(req.sessionModel.toJSON(), null, 2)
    };
  }
};
```

Do not expose debug session values in production.

## Common issues

### `Cannot find route fields`

Check the route `fields` path or route `name`.

### Validation message is missing

Check translation keys for the field and validation type.

### User sees session timeout

Check Redis, session TTL, cookies and whether the session secret changed.

### Redis logs `UNCERTAIN_STATE` for command `INFO`

HOF uses the Redis `INFO` command during the Redis ready check. If the app logs `UNCERTAIN_STATE` for `INFO` immediately after `Connected to redis`, confirm Redis is healthy before changing HOF code:

```bash
docker compose logs redis
docker compose exec redis redis-cli ping
```

If Redis logs `qemu: uncaught target signal 11`, the Redis image is running under an incompatible emulated platform. On Apple Silicon, use a native Redis platform such as `linux/arm64/v8`, recreate the container, then check `redis-cli ping` returns `PONG`.

### API submission fails after check answers

Check the submit behaviour and ensure it passes errors to `next`.

### Page renders raw translation keys

Check compiled translation output and route translation path.

## Related topics

- [Configuration](../reference/configuration.md)
- [Sessions and Redis](sessions-and-redis.md)
- [Controller lifecycle](../extending-hof/controller-lifecycle.md)
