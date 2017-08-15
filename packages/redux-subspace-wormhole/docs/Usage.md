# Usage

Wormhole's create references to a section of the state that gets merged into any subspaced store's state.

For example, given a reducer setup like this:

``` javascript
import { createStore, combineReducers } from 'redux'

const configuration = (state= { api: '/api' }) => state
const subApp = (state = { value: 1 }) => state

const reducer = combineReducers({
    configuration,
    subApp
})
```

This store's state will now look like:

```json
{
    "configuration": {
        "api": "/api"
    },
    "subApp": {
        "value": 1
    }
}
```

To create a wormhole, you must apply the middleware to the root store.  It is important to use [Redux Subspace's applyMiddleware](/docs/api/applyMiddleware.md) to do this, instead of the Redux built in version:

```javascript
import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import wormhole from 'redux-subspace-wormhole'

const store = createStore(reducer, applyMiddleware(wormhole((state) => state.configuration, 'configuration')))
```

Now, if we create a subspace for `subApp`, it will also contain a `configuration` node.

```javascript
import { subspace } from 'redux-subspace'

const subAppStore = subspace((state) => state.subApp)(store)

console.log(subAppStore.getState()) // { "value": 1, "configuration": { "api": "/api" } }
```

Wormholes will appear in all subspaces that have a plain object as their state, even when [nesting subspaces](/docs/advanced/NestingSubspaces.md).  If the `mapState` selector returns anything other than a plain object, the wormhole is ignored.
