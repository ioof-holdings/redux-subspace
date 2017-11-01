# Global State

Sometimes, there is some state that is global to your application, e.g. configuration, authentication tokens, user details, etc., and you need to access them within sub-applications.

To cater for this, `subspace` passes the root state of the application into the `mapState` selector function as the second parameter, which can be used to combine additional state into the subspace's state.

For example, given a store setup like this:

``` javascript
import { createStore, combineReducers } from 'redux'

const configuration = (state= { api: '/api' }) => state
const subApp = (state = { value: 1 }) => state

const reducer = combineReducers({
    configuration,
    subApp
})

const store = createStore(reducer)
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

Using the second parameter, `rootState`, we can merge the configuration into the state for the sub-application:

```javascript
import { subspace } from 'redux-subspace'

const subAppStore = subspace((state, rootState) => ({ ...state.subApp, configuration: rootState.configuration }))(store)

console.log(subAppStore.getState()) // { "value": 1, "configuration": { "api": "/api" } }
```

When [nesting subspaces](/docs/advanced/NestingSubspaces.md), the `rootState` will always refer to the state of the root redux store.

## Wormholes

Often, the global state is required by all sub-applications. Rather than repetitively merging the state in the `mapState` selector, the [`wormhole'](/packages/redux-subspace-wormhole/README.md) middleware can be used to provide it to all subspaces. For details, see the [`redux-subspace-wormhole' documentation](/packages/redux-subspace-wormhole/docs/README.md).
