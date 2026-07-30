# Upgrading HOF

## Purpose

This page describes a safe approach to upgrading HOF.

## Key concepts

HOF upgrades can affect:

- Node.js requirements
- frontend build tooling
- CSP behaviour
- sessions
- validators
- deprecated behaviours
- email implementation

## Usage guidance

Upgrade in a branch and test the full journey.

Read the changelog for every version between your current version and the target version.

Check deprecations before updating production services.

## Examples

Upgrade checklist:

```text
1. Confirm Node.js version.
2. Update hof dependency.
3. Run yarn install.
4. Run hof-build.
5. Run unit and journey tests.
6. Test Redis-backed sessions locally.
7. Check CSP console errors.
8. Complete a full submission.
9. Check confirmation and email/API behaviour.
10. Deploy to a non-production environment.
```

Dependency update:

```bash
yarn add hof@latest
yarn build
yarn test
```

Check session secret length:

```bash
node -e "console.log(Buffer.from(process.env.SESSION_SECRET || '', 'utf8').byteLength)"
```

## Common issues

### Build breaks after upgrade

Check Node version and Vite/Rollup optional dependencies.

### Existing sessions expire after deployment

Changing the session secret invalidates sessions.

### Email stops working after v24

Old built-in email functionality was removed. Implement service-owned email logic.

## Related topics

- [Version 24](v24.md)
- [Deprecations](../reference/deprecations.md)
- [Deployment](../operations/deployment.md)
