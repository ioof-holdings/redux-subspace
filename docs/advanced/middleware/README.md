# Middleware

In standard Redux, [`applyMiddleware`](http://redux.js.org/docs/api/applyMiddleware.html) is used to extend Redux's functionality with [middleware](http://redux.js.org/docs/advanced/Middleware.html). This can cause some problems for namespaced subspaces if the middleware delays dispatch calls, such as async middleware like [`redux-thunk`](https://github.com/reactjs/react-redux).

Basically, when the dispatch occurs, it uses the `dispatch` function of the root Redux store, not the `dispatch` function of the subspace, so the namespacing is not applied properly.

The solution is to apply the middleware to the subspaces as well as the root store. Luckily, Redux Subspace provides a drop in replacement for `applyMiddleware` that does exactly this.

```javascript
import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import someMiddleware from 'some-dependency'

const store = createStore(reducer, applyMiddleware(someMiddleware))
```

## Using Existing Redux Middleware

By using Redux Subspace's `applyMiddleware` function, many existing Redux middlewares will just work. If a middleware is not behaving correctly, it is usually because it is not being applied to the correct layers.  Redux Subspace provides a few utilities to help apply the middleware to specific layers only:

### `applyToRoot`

This utility will only apply the middleware to the root store:

```javascript
import { createStore } from 'redux'
import { applyMiddleware, applyToRoot } from 'redux-subspace'
import someMiddleware from 'some-dependency'

const store = createStore(reducer, applyMiddleware(applyToRoot(someMiddleware)))
```

### `applyToNamespaceRoots`

This utility will apply the middleware to any subspace that is a namespace boundary, i.e. explicilty defines a namespace when the subspace is created:

```javascript
import { createStore } from 'redux'
import { applyMiddleware, applyToNamespaceRoots } from 'redux-subspace'
import someMiddleware from 'some-dependency'

const store = createStore(reducer, applyMiddleware(applyToNamespaceRoots(someMiddleware)))
```

The root store is considered to be the namespace root for any unnamespaced subspaces, so the utility will also apply the middleware to it.

### `applyToChildren`

This utility will apply the middleware to any subspace that is not the root store:

```javascript
import { createStore } from 'redux'
import { applyMiddleware, applyToChildren } from 'redux-subspace'
import someMiddleware from 'some-dependency'

const store = createStore(reducer, applyMiddleware(applyToChildren(someMiddleware)))
```

### Supported Redux Middleware

As previously stated, many Redux middlewares will just work with Redux Subspace, but the following list are actively supported:

* [redux-observable](/docs/advanced/middleware/redux-observable.md)
* [redux-promise](/docs/advanced/middleware/redux-promise.md)
* [redux-saga](/docs/advanced/middleware/redux-saga.md)
* [redux-thunk](/docs/advanced/middleware/redux-thunk.md)
* [redux-loop](/docs/advanced/middleware/redux-loop.md)

## Writing Custom Middleware

The next section will discuss how to write [custom middleware](/docs/advanced/middleware/CustomMiddleware.md) that is compatible with Redux Subspace.
