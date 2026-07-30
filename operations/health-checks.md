# Health checks

## Purpose

This page explains HOF health checks.

## Key concepts

HOF mounts a health endpoint at:

```text
/healthz
```

The endpoint is mounted after the session store is created and is intended for platform readiness checks.

## Usage guidance

Configure platform probes to call `/healthz`.

Do not put user-facing behaviour on the health endpoint.

Exclude health check paths from noisy request logging where appropriate.

## Examples

Kubernetes-style readiness probe:

```yaml
readinessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 10
```

Smoke test:

```bash
curl -f http://localhost:8080/healthz
```

Ignore health logs:

```js
hof({
  root: __dirname,
  ignoreMiddlewareLogs: ['/healthz'],
  routes: [require('./apps/application')]
});
```

## Common issues

### Health check fails when Redis is unavailable

Check Redis connectivity. Sessions depend on Redis by default.

### Health traffic fills logs

Use `ignoreMiddlewareLogs` or platform log filtering.

## Related topics

- [Sessions and Redis](sessions-and-redis.md)
- [Deployment](deployment.md)
- [Troubleshooting](troubleshooting.md)

