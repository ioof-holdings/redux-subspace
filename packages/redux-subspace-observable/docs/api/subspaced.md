# `subspaced(mapState, [namespace])`

A higher-order epic that runs the epic in a subspace.

## Arguments

1. `mapState` (_Function|string_): A [selector to derive the state](/docs/basics/CreatingSubspaces.md) of the subspace. The selector is provided the parent state as the first parameter and the root state as the second parameter.  If passed as a string, a selector is created for that key on the provided state.
2. `namespace` (_string_): An optional [namespace to scope actions](/docs/basics/Namespacing.md) with.

If `mapState` is passed as a string and no `namespace` is provided, the provided string is used for both. To prevent this, pass `null` as the second parameter.

## Returns

(_Function_): A function that accepts an [epic](https://redux-observable.js.org/docs/basics/Epics.html) and returns a new epic that runs the original epic within the context of a subspace.

## Examples

```javascript
import { subspaced } from 'redux-subspace-observable'
import epic from 'somewhere'

const subspacedEpic = subspaced((state) => state.subApp)(epic)
```

```javascript
import { subspaced } from 'redux-subspace-observable'
import epic from 'somewhere'

const subspacedEpic = subspaced((state, rootState) => ({ ...state.subApp, root: rootState }))(epic)
```

```javascript
import { subspaced } from 'redux-subspace-observable'
import epic from 'somewhere'

const subspacedEpic = subspaced((state) => state.subApp, 'subApp')(epic)
```

```javascript
import { subspaced } from 'redux-subspace-observable'
import epic from 'somewhere'

const subspacedEpic = subspaced('subApp', 'subAppNamespace')(epic)
```

```javascript
import { subspaced } from 'redux-subspace-observable'
import epic from 'somewhere'

const subspacedEpic = subspaced('subApp')(epic)
```
