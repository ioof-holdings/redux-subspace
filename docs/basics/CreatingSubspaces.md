# Creating Subspaces

Consider an application whose store is created like:

```javascript
import { createStore, combineReducers } from 'redux'

const subApp1 = (state = { value: 1 }, action) => {
    switch (action.type) {
        case 'INCREMENT_APP_1':
            return { ...state, value: state.value + 1 }
        default:
            return state
    }
}

const subApp2 = (state = { value: 2 }, action) => {
    switch (action.type) {
        case 'INCREMENT_APP_2':
            return { ...state, value: state.value + 1 }
        default:
            return state
    }
}

const reducer = combineReducers({
    subApp1,
    subApp2
})

const store = createStore(reducer)
```

This store's state will now look like:

```json
{
    "subApp1": {
        "value": 1
    },
    "subApp2": {
        "value": 2
    }
}
```

We can create a subspace for `subApp1` using the `subspace` function with a selector mapping it's state:

```javascript
import { subspace } from 'redux-subspace'

const subApp1Store = subspace((state) => state.subApp1)(store)
```

In the above example, `subApp1Store` looks like a regular store, but the state returned from `getState()` is that returned by the selector:

```javascript
console.log('subApp1 state:', subApp1Store.getState()) // { "value": 1 }
```

Calling `dispatch` on `subApp1Store` will delegate the action handling to the root store to pass to it's reducer:

```javascript
subApp1Store.dispatch({ type: 'INCREMENT_APP_1' })

console.log('subApp1 state:', subApp1Store.getState()) // { "value": 2 }

console.log('store state:', store.getState()) // { "subApp1": { value: 2 }, "subApp2": { value: 2 } }
```

Obviously, we could just have easily created a subspace for `subapp2`:

```javascript
const subApp2Store = subspace((state) => state.subApp2)(store)

console.log('subApp2 state:', subApp2Store.getState()) // { "value": 2 }

subApp2Store.dispatch({ type: 'INCREMENT_APP_2' })

console.log('subApp2 state:', subApp2Store.getState()) // { "value": 3 }

console.log('store state:', store.getState()) // { "subApp1": { value: 2 }, "subApp2": { value: 3 } }
```

However, in this scenario, if `'INCREMENT_APP_2'` was dispatched by `subApp1Store` the state for `subApp2` would still update

```javascript

subApp1Store.dispatch({ type: 'INCREMENT_APP_2' })

console.log('subApp1 state:', subApp1Store.getState()) // { "value": 2 }

console.log('subApp2 state:', subApp2Store.getState()) // { "value": 4 }

console.log('store state:', store.getState()) // { "subApp1": { value: 2 }, "subApp2": { value: 4 } }
```

This may be fine for if you can guarantee all action types are unique across all the sub-applications, but if two or more sub-applications want to use the same action type, then there may by unwanted state changes when unrelated actions are dispatched.

In the [next section](/docs/basics/Namespacing.md) we will look at how we can namespace our sub-applications so that they don't affect each other.
