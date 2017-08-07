# Usage

Using Redux Subspace with [`redux-saga`](https://redux-saga.js.org/) is pretty similar to [using it with Redux](/docs/basics/CreatingSubspaces.md) itself, except rather than subspacing the store, you need to subspace the sagas.

## Saga Middleware

In order for `redux-saga` middleware to work, it must only be applied to the root store and not to every subspace.  You can use the [`applyToRoot` utility](/docs/advanced/middleware/README.md#applyToRoot) yourself, but `redux-subspace-saga` provides a middleware that does that for you:

```javascript
import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import createSagaMiddleware from 'redux-subspace-saga'
import reducer from 'some-dependency'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))
```

## Subspacing a Saga

The `subspaced` higher-order saga is used to subspace sagas:

```javascript
import { subspaced } from 'react-redux-saga'
import saga from 'some-dependency'

const subspacedSaga = subspaced((state) => state.subApp, 'subApp')(saga)
```

Now any [`select`](https://redux-saga.js.org/docs/api/#selectselector-args) and [`put`](https://redux-saga.js.org/docs/api/#putaction) effects will use a subspace created by the provided selector and namespace.

For `subspaced` to work, the the store needs to be present in the saga's context. The `provideStore` higher-order saga will handle this for you.

```javascript
import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import createSagaMiddleware, { provideStore } from 'redux-subspace-saga'
import { reducer, saga } from 'some-dependency'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(provideStore(store)(saga))
```

### Nesting Subspaced Sagas

You can nest subspaces sagas by [composing them together](https://redux-saga.js.org/docs/advanced/ComposingSagas.html) like regular sagas. By doing this, the [standard nesting behavior](/docs/advanced/NestingSubspaces.md) of subspaces will still occur.
