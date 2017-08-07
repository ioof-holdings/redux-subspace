# `subspaced(mapState, [namespace])`

A higher-order saga that injects the provided store into the saga's context.

## Arguments

1. `mapState` (_Function|string_): A [selector to derive the state](/docs/basics/CreatingSubspaces.md) of the subspace. The selector is provided the parent state as the first parameter and the root state as the second parameter.  If passed as a string, a selector is created for that key on the provided state.
2. `namespace` (_string_): An optional [namespace to scope actions](/docs/basics/Namespacing.md) with.

If `mapState` is passed as a string and no namespace is provided, the provided string is used for both. To prevent this, pass `null` as the second parameter.

## Returns

(_Function_): A function that accepts a saga (generator function) and returns a new saga that runs the original saga within the context of a subspace.

## Examples

```javascript
import { subspaced } from 'redux-subspace-saga'
import saga from 'somewhere'

const subspacedSaga = subspaced((state) => state.subApp)(saga)
```

```javascript
import { subspaced } from 'redux-subspace-saga'
import saga from 'somewhere'

const subspacedSaga = subspaced((state, rootState) => ({ ...state.subApp, root: rootState }))(saga)
```

```javascript
import { subspaced } from 'redux-subspace-saga'
import saga from 'somewhere'

const subspacedSaga = subspaced((state) => state.subApp, 'subApp')(saga)
```

```javascript
import { subspaced } from 'redux-subspace-saga'
import saga from 'somewhere'

const subspacedSaga = subspaced('subApp', 'subAppNamespace')(saga)
```

```javascript
import { subspaced } from 'redux-subspace-saga'
import saga from 'somewhere'

const subspacedSaga = subspaced('subApp')(saga)
```
