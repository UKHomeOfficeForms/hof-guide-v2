# Address lookup behaviour

## Purpose

The address lookup behaviour provides a postcode lookup sub-journey inside one HOF step.

## Key concepts

The behaviour is configured with `addressKey`.

It creates sub-steps using the query string:

- `?step=postcode`
- `?step=lookup`
- `?step=address`
- `?step=manual`

It can use the default postcode lookup model or a service-provided model.

It stores selected or manual address text in the session using `addressKey`.

## Usage guidance

Use this behaviour when users should search for an address by postcode but still have a manual entry fallback.

Provide a custom model if your service uses a different address API.

Make address lookup optional only when your service genuinely allows no address.

## Examples

Route:

```js
const addressLookup = require('hof').components.addressLookup;

module.exports = {
  steps: {
    '/address': {
      behaviours: [addressLookup({
        addressKey: 'home-address',
        required: true
      })],
      next: '/confirm'
    },
    '/confirm': {}
  }
};
```

Translations:

```json
{
  "fields": {
    "home-address-postcode": {
      "label": "Postcode"
    },
    "home-address-select": {
      "label": "Select an address"
    },
    "home-address": {
      "label": "Address"
    }
  },
  "pages": {
    "address-lookup": {
      "cantfind": "I cannot find the address in the list",
      "postcode-entered": "Postcode you entered: "
    }
  }
}
```

Custom model:

```js
'use strict';

const Model = require('hof').model;

class AddressApi extends Model {
  url() {
    return `${process.env.ADDRESS_API_URL}/addresses/${this.get('postcode')}`;
  }

  parse(response) {
    return response.addresses;
  }
}

module.exports = AddressApi;
```

Use custom model:

```js
const addressLookup = require('hof').components.addressLookup;
const AddressApi = require('../../models/address-api');

behaviours: [addressLookup({
  addressKey: 'home-address',
  Model: AddressApi,
  required: true,
  validate: true
})]
```

## Common issues

### `addressKey must be provided`

Pass an `addressKey` in the behaviour config.

### Address lookup service cannot be reached

The behaviour falls back to manual entry and stores an API metadata message. Check API configuration and logs.

### Selected address is not saved

Check that the selected option value is returned by the lookup sub-step and that the user continues from `?step=lookup`.

## Related topics

- [Models and API integration](../extending-hof/models-and-api-integration.md)
- [Validation](../building-services/validation.md)
- [Translations](../building-services/translations.md)
