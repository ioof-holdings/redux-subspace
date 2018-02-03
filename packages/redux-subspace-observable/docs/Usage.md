# Usage

Using Redux Subspace with [`redux-observable`](https://redux-observable.js.org/) is pretty similar to [using it with Redux](/docs/basics/CreatingSubspaces.md) itself, except rather than subspacing the store, you need to subspace the epics.

## Epic Middleware

In order for `redux-observable` to work with `redux-subspace` you must use the `createEpicMiddleware` function from the `redux-subspace-observable` package instead of the default one.  This allows `redux-subspace` to intercept `subspaced` epics to provide the extra bits it needs to work.

```javascript
import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import { createEpicMiddleware } from 'redux-subspace-observable'
import { reducer, epic } from 'some-dependency'

const epicMiddleware = createEpicMiddleware(epic)

const store = createStore(reducer, applyMiddleware(epicMiddleware))
```

## Subspacing an Epic

The `subspaced` higher-order epic is used to subspace epics:

```javascript
import { subspaced } from 'react-redux-observable'
import epic from 'some-dependency'

const subspacedEpic = subspaced((state) => state.subApp, 'subApp')(epic)
```

Now the epic will only recieve actions that match the subspace's namespace and any actions it emits will be automatically namespaced as well.

The [`store` parameter](https://redux-observable.js.org/docs/basics/Epics.html#accessing-the-stores-state) will also be a subspace created by the provided selector and namespace.

### Nesting Subspaced Epics

You can nest subspaces epics by [combining them together](https://redux-observable.js.org/docs/basics/Epics.html#combining-epics) like regular epics. By doing this, the [standard nesting behavior](/docs/advanced/NestingSubspaces.md) of subspaces will still occur.
