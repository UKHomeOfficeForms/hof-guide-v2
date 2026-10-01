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

### HOF 24.5.1: session timeout dialog no longer uses jQuery

HOF 24.5.1 removes jQuery from the framework dependencies and replaces the session timeout dialog's jQuery operations with native browser APIs. If service code imports jQuery only because HOF provided it, add jQuery as a direct service dependency or remove that use.

If service code customises `window.GOVUK.sessionDialog`, update any use of its jQuery-wrapped properties: `closeButton`, `fallBackElement`, `timer`, `accessibleTimer` and `lastFocusedEl` are now native DOM elements, and `$el` has been removed (`el` is the native dialog element). Replace jQuery methods such as `.on()`, `.text()` and `.addClass()` with the corresponding DOM APIs.

Closing the dialog still requests a session refresh. That request now uses `fetch`; the dialog updates its refresh time and restarts its controller only for an OK response. Failed responses and network errors are logged to the console and do not reset the client-side timer. Missing or unparsable timeout values now fall back to 1,800 seconds for the session timeout and 300 seconds for the warning.

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
11. For HOF 24.5.1, check service code for jQuery imports and custom session-dialog integrations.
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
