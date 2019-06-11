# `parentSpace(store)`

Given a subspaced store created by the [subspace](/packages/redux-subspace/docs/api/subspace.md) function, returns the store that the subspace was created from. This makes it the inverse of the `subspace` function, with `parentSpace(subspace(...)(store))` being a no-op.

## Arguments

1. `store` (_Object_): The store to fetch the parent store for.

## Returns

(_Object_): The parent store, or `store` if `store` has no parent.

## Examples

```javascript
import { parentSpace } from 'redux-subspace'
import store from 'somewhere'

const parentStore = parentSpace(store)
```
