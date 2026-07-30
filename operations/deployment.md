# Deployment

## Purpose

This page describes production deployment considerations for HOF applications.

## Key concepts

A production HOF application needs:

- Node.js `>=24.15.0`
- compiled assets and translations
- Redis
- a 32-byte session secret
- secure environment variables
- health checks
- logging and monitoring
- suitable CSP and cookie configuration

## Usage guidance

Build assets before starting the application.

Do not omit optional Rollup dependencies in Docker or CI images that run Vite builds.

Set `NODE_ENV=production` in production.

Use a unique `SESSION_NAME` per service.

## Examples

Build and start scripts:

```json
{
  "scripts": {
    "build": "hof-build",
    "start": "node server.js"
  }
}
```

Production environment:

```bash
export NODE_ENV=production
export PORT=8080
export REDIS_HOST=redis
export REDIS_PORT=6379
export SESSION_NAME=permit.sid
export SESSION_SECRET="${SECRET_FROM_SECRET_MANAGER}"
```

Dockerfile outline:

```dockerfile
FROM node:24.15-bookworm-slim

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

ENV NODE_ENV=production
CMD ["yarn", "start"]
```

Service-unavailable mode:

```bash
export SERVICE_UNAVAILABLE=true
```

## Common issues

### Build fails in CI but works locally

Check Node version and whether optional dependencies were omitted.

### Secure cookies fail behind a proxy

HOF sets `trust proxy`. Check platform TLS termination and forwarded headers.

### Assets return 404

Run `hof-build` and check static asset paths.

## Related topics

- [Requirements](../getting-started/requirements.md)
- [Security](security.md)
- [Health checks](health-checks.md)
