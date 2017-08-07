# `subspace(mapState, [namespace])`

Creates a subspace that isolates state and actions from the root Redux store.

## Arguments

1. `mapState` (_Function|string_): A [selector to derive the state](/docs/basics/CreatingSubspaces.md) of the subspace. The selector is provided the parent state as the first parameter and the root state as the second parameter.  If passed as a string, a selector is created for that key on the provided state.
2. `namespace` (_string_): An optional [namespace to scope actions](/docs/basics/Namespacing.md) with.

If `mapState` is passed as a string and no namespace is provided, the provided string is used for both. To prevent this, pass `null` as the second parameter.

## Returns

(_Function_): A function that takes a store or subspace and returns a new subspace.

## Examples

```javascript
import { subspace } from 'redux-subspace'
import store from 'somewhere'

const subAppStore = subspace((state) => state.subApp)(store)
```

```javascript
import { subspace } from 'redux-subspace'
import store from 'somewhere'

const subAppStore = subspace((state, rootState) => ({ ...state.subApp, root: rootState }))(store)
```

```javascript
import { subspace } from 'redux-subspace'
import store from 'somewhere'

const subAppStore = subspace((state) => state.subApp, 'subApp')(store)
```

```javascript
import { subspace } from 'redux-subspace'
import store from 'somewhere'

const subAppStore = subspace('subApp', 'subAppNamespace')(store)
```

```javascript
import { subspace } from 'redux-subspace'
import store from 'somewhere'

const subAppStore = subspace('subApp')(store)
```
