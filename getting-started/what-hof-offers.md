# What HOF offers

## Purpose

This page summarises the capabilities HOF provides so teams can assess whether the framework meets their service needs.

## Key concepts

HOF provides a form workflow foundation. It gives teams common routing, validation, rendering, session and security behaviour, while leaving service-specific business rules and integrations to the service team.

## Usage guidance

Use this page during discovery or technical assessment.

If your service needs most of the capabilities listed here, HOF is likely worth considering. If your service needs very few of them, a smaller Express application or another framework may be more appropriate.

## Examples

Capability overview:

| Capability | Provided by HOF | Service-owned |
|---|---:|---:|
| Multi-step form routing | Yes | Configure the journey |
| Static pages | Yes | Write service-specific content |
| Field rendering | Yes | Configure fields and content |
| Validation | Yes | Add service-specific rules |
| Formatting | Yes | Choose safe normalisation |
| Conditional routing | Yes | Define conditions |
| Conditional fields | Yes | Define `useWhen` rules |
| Session-backed form state | Yes | Minimise stored data |
| Redis session storage | Yes | Provide Redis infrastructure |
| CSRF protection | Yes | Keep it enabled |
| Content Security Policy | Yes | Add nonces or external scripts correctly |
| Rate limiting | Available | Enable and tune it |
| Health checks | Yes | Wire platform probes |
| API submission | Pattern supported | Implement service integration |
| Email notifications | Notify component available | Own templates, keys and failure handling |
| Permanent storage | No | Implement outside HOF |
| File uploads | Not confirmed as core | Implement and document service-specific approach |

Example decision:

```text
Our service collects user details over five pages, validates answers,
shows a check answers page, submits to a casework API and sends a Notify email.

HOF is a good fit because most of the journey and security features are provided.
The team must still implement the API submission and own the Notify template.
```

## Common issues

### Treating HOF as a complete product platform

HOF is a framework for form journeys. It does not remove the need for service design, data protection decisions, monitoring or operational support.

### Assuming every Home Office form capability is built in

Only document and rely on features that exist in the framework source or are explicitly implemented by your service.

## Related topics

- [Is HOF right for me?](is-hof-right-for-me.md)
- [Core concepts](core-concepts.md)
- [Models and API integration](../extending-hof/models-and-api-integration.md)

