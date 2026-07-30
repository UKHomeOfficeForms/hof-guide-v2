# Combine and loop fields behaviour

## Purpose

The combine and loop fields behaviour lets users add, review and remove repeated groups of field values.

## Key concepts

The behaviour is configured with:

- `returnTo`
- `groupName`
- `fieldsToGroup`
- optional `combineValuesToSingleField`
- optional `removePrefix`
- optional `groupOptional`

It stores grouped entries in the session under `groupName`.

It adds a yes/no add-another field called `<groupName>-add-another`.

It supports deleting an item with a `?delete=<id>` query parameter.

## Usage guidance

Use this behaviour when users can add multiple instances of the same structure, such as aliases, previous addresses or dependants.

Keep the repeated fields on a separate step and send users to a review/add-another step.

## Examples

Fields:

```js
module.exports = {
  'dependant-name': {
    validate: ['required']
  },
  'dependant-age': {
    validate: ['required', 'numeric']
  }
};
```

Route:

```js
const combineAndLoopFields = require('hof').components.combineAndLoopFields;

module.exports = {
  steps: {
    '/dependant': {
      fields: ['dependant-name', 'dependant-age'],
      next: '/dependants'
    },
    '/dependants': {
      behaviours: [combineAndLoopFields({
        returnTo: '/dependant',
        groupName: 'dependants',
        fieldsToGroup: ['dependant-name', 'dependant-age'],
        combineValuesToSingleField: 'summary'
      })],
      next: '/confirm'
    },
    '/confirm': {}
  }
};
```

Translations for add-another field:

```json
{
  "fields": {
    "dependants-add-another": {
      "legend": "Do you need to add another dependant?",
      "options": {
        "yes": {
          "label": "Yes"
        },
        "no": {
          "label": "No"
        }
      }
    }
  }
}
```

Delete link in a custom template:

```html
{{#items}}
  <p class="govuk-body">{{dependant-name}} - {{dependant-age}}</p>
  <a class="govuk-link" href="?delete={{id}}">Remove</a>
{{/items}}
```

## Common issues

### `returnTo is a string and is required for loops`

Set `returnTo` to the step that collects another item.

### `groupName is a string and is required for loops`

Set `groupName` to the session key for the list.

### Items are duplicated

Check that the add-another field is unset after the user chooses yes. The built-in behaviour handles this when configured correctly.

## Related topics

- [Summary](summary.md)
- [Routes, steps and fields](../building-services/routes-steps-fields.md)
- [Controller lifecycle](../extending-hof/controller-lifecycle.md)
