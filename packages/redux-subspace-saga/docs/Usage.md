# Usage

Using Redux Subspace with [`redux-saga`](https://redux-saga.js.org/) is pretty similar to [using it with Redux](/docs/basics/CreatingSubspaces.md) itself, except rather than subspacing the store, you need to subspace the sagas.

## Saga Middleware

In order for `redux-saga` to work with `redux-subspace` you must use the `createSagaMiddleware` function from the `redux-subspace-saga` package instead of the default one.  This allows `redux-subspace` to intercept `subspaced` sagas to provide the extra bits it needs to work.

```javascript
import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import createSagaMiddleware from 'redux-subspace-saga'
import { reducer, saga } from 'some-dependency'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(saga)
```

## Subspacing a Saga

The `subspaced` higher-order saga is used to subspace sagas:

```javascript
import { subspaced } from 'react-redux-saga'
import saga from 'some-dependency'

const subspacedSaga = subspaced((state) => state.subApp, 'subApp')(saga)
```

Now any [`select`](https://redux-saga.js.org/docs/api/#selectselector-args) and [`put`](https://redux-saga.js.org/docs/api/#putaction) effects will use a subspace created by the provided selector and namespace.

### Nesting Subspaced Sagas

You can nest subspaces sagas by [composing them together](https://redux-saga.js.org/docs/advanced/ComposingSagas.html) like regular sagas. By doing this, the [standard nesting behavior](/docs/advanced/NestingSubspaces.md) of subspaces will still occur.

## Caveats

### Context

When using the `context` feature of `redux-saga`, only `context` provided when creating the saga middleware is preserved in the subspaced sagas:

```javascript
import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import createSagaMiddleware from 'redux-subspace-saga'
import { reducer, saga } from 'some-dependency'

const sagaMiddleware = createSagaMiddleware({ context: { providedToAllSubspaces: 'you can use this anywhere' } })

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(saga)
```

Context provided using the [`setContext` effect](https://redux-saga.js.org/docs/api/#setcontextprops) will not be preserved.  This is due to a limitation in redux-saga that the full `context` of a saga cannot be retrieved, so there is no way for `redux-subspace-saga` to transfer all context values to the subspaced saga's `context`.
