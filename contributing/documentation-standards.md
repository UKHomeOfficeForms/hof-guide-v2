# Documentation standards

## Purpose

This page defines standards for maintaining the HOF Guide.

## Key concepts

The HOF framework source code is the source of truth.

Every guide page should include:

- Purpose
- Key concepts
- Usage guidance
- Examples
- Common issues
- Related topics

If a topic involves code, include a code example.

## Usage guidance

Write for multiple audiences:

- explain concepts in plain English
- add technical depth progressively
- avoid unexplained acronyms
- use active voice
- use UK English
- state limitations clearly

Do not document functionality unless it exists in the framework or is clearly marked as service-owned.

## Examples

Page template:

```md
# Page title

## Purpose

Explain why this page exists.

## Key concepts

Explain the important ideas.

## Usage guidance

Explain when to use it and when not to use it.

## Examples

Include code if the topic involves code.

## Common issues

List common mistakes and fixes.

## Related topics

- Link to related pages.
```

Code example rule:

Do not write:

```md
Add a behaviour to call your API.
```

Do write:

```js
module.exports = superclass => class extends superclass {
  successHandler(req, res, next) {
    api.submit(req.sessionModel.toJSON())
      .then(() => super.successHandler(req, res, next))
      .catch(next);
  }
};
```

## Common issues

### Copying old guide content without verification

Always check the framework implementation before publishing.

### Examples are incomplete

Include enough surrounding code for a developer to implement the pattern.

### Non-technical users are ignored

Start with purpose and plain-English concepts before implementation details.

## Related topics

- [What is HOF?](../getting-started/what-is-hof.md)
- [Framework overview](../architecture/framework-overview.md)
- [Configuration](../reference/configuration.md)
