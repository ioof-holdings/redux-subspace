# Migrating

There were some significant breaking changing introduced in version 2 of `redux-subspace`.  These were mostly caused by seperating the library up into multiple packages for use with different frameworks, or by utilising the new middleware pipeline for subspaces.

The following sections describe the major changes from `redux-subspace` version 1 to 2.

## React bindings

The React binding have moved from the `redux-subspace` package to `react-redux-subspace`.

Firstly, you must install the new package:

```sh
npm i -S react-redux-subspace
```

### `SubspaceProvider`

```diff
-import { SubspaceProvider } from 'redux-subspace'
+import { SubspaceProvider } from 'react-redux-subspace'
```

### `subspaced`

```diff
-import { subspaced } from 'redux-subspace'
+import { subspaced } from 'react-redux-subspace'
```

## Namespaced Reducers

The `namespaced` higher-order reducer has had it's signature changed to be more composable with other higher-order reducers:

```diff
import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'

const reducer = combineReducers({
-  myReducer: namespaced(myReducer, 'myNamespace')
+  myReducer: namespaced('myNamespace')(myReducer)
})
```

## redux-thunk

In version 1, `redux-thunk` was implicilty supported as a hard-coded behaviour.  With the introduction of a middleware pipeline to redux-subspace, `redux-thunk` must now be applied as middleware to the store.

Assuming you already had `redux-thunk` installed and applied to your root store, you only need change it to apply the middleware to subspaces as well.

To apply the middleware to subspaces, an alternative `applyMiddleware` function is provided by `redux-subspace`:

```diff
-import { createStore, applyMiddleware } from 'redux'
+import { createStore } from 'redux'
+import { applyMiddleware } from 'redux-subspace'
import thunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(thunk))
```

Middleware applied to subspaces will also be applied to the root store, so there is not need to apply it twice.

## The `root` node

The `root` node is no longer appended to the subspace state.  The same functionality can be obtained from the `redux-subspace-wormhole` middleware.

Firstly, install the middleware:

```sh
npm i -S redux-subspace-wormhole
```

Then we must apply the middleware to the subspaces using `applyMiddleware` provided be `redux-subspace`:

```diff
import { createStore } from 'redux'
+import { applyMiddleware } from 'redux-subspace'
+import wormhole from 'redux-subspace-wormhole'

-const store = createStore(reducer)
+const store = createStore(reducer, applyMiddleware(wormhole((state) => state, 'root')))
```

## Global Actions

The `GlobalActions.register` function has been replaced by a `globalActions` middleware:

```diff
import { createStore } from 'redux'
-import { GlobalActions } from 'redux-subspace'
+import { applyMiddleware, globalActions } from 'redux-subspace'

-GlobalActions.register('GLOBAL_ACTION')

-const store = createStore(reducer)
+const store = createStore(reducer, applyMiddleware(globalActions('GLOBAL_ACTION')))
```

The `asGlobal` action wrapper has also been renamed to `globalAction` to be more consistent with the new action wrappers:

```diff
-import { asGlobal } from 'redux-subspace`
+import { globalAction } from 'redux-subspace`

-store.dispatch(asGlobal({ type: 'GLOBAL_ACTION' }))
+store.dispatch(globalAction({ type: 'GLOBAL_ACTION' }))
```
