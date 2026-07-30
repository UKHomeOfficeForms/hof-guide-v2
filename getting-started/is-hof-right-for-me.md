# Is HOF right for me?

## Purpose

This page helps teams decide whether HOF is a good fit for their service.

## Key concepts

HOF is strongest when the service can be described as a sequence of form pages. It provides the journey engine, validation, session state, GOV.UK templates and extension points.

HOF does not replace service design, data architecture, operational planning or security assessment.

## Usage guidance

HOF is usually a good choice when your service:

- collects information through forms
- follows a step-by-step journey
- needs GOV.UK-style pages and components
- needs server-rendered pages
- needs validation, session state and error handling
- has conditional routes or fields
- must be built quickly using established Home Office patterns

HOF may not be the right choice when your service:

- is mainly an API
- needs a rich single-page application
- needs real-time collaboration or live updates
- has complex long-running workflow state outside a form journey
- cannot use Redis or an equivalent session store
- does not follow GOV.UK design patterns
- needs permanent data persistence without custom integration work

## Examples

Good fit:

```text
A user applies for a permit.
They answer eligibility questions, provide contact details, check answers,
then submit the application to a caseworking API.
```

Poor fit:

```text
A dashboard streams live operational metrics, updates charts every second
and allows multiple users to edit the same record at the same time.
```

Decision checklist:

```text
Choose HOF if:
- users complete a sequence of form pages
- server-rendered GOV.UK pages are suitable
- session-backed in-progress data is acceptable
- custom submission logic can run at the end of the journey
```

## Common issues

### Choosing HOF because another team uses it

Choose HOF because its workflow model fits your service, not because it is familiar or already present in another repository.

### Underestimating custom integration work

HOF gives you form infrastructure. Your service still owns API calls, data retention, audit requirements and business-specific processing.

## Related topics

- [What is HOF?](what-is-hof.md)
- [Models and API integration](../extending-hof/models-and-api-integration.md)
- [Deployment](../operations/deployment.md)

