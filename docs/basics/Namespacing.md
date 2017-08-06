# Namespacing

In the [previous section](/docs/basics/CreatingSubspaces) we had an example where actions being raised by sub-applications could affect the state of other applications.

Let's change our application to use the same reducer for both `subApp1` and `subApp2`:

``` javascript
import { createStore, combineReducers } from 'redux'

const counter = (state = { value: 1 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, value: state.value + 1 }
        default:
            return state
    }
}

const reducer = combineReducers({
    subApp1: counter,
    subApp2: counter
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
        "value": 1
    }
}
```

Now when we create our subspaces and dispatch an `'INCREMENT'` action, both sub-application states will change:

```javascript
import { subspace } from 'redux-subspace'

const subApp1Store = subspace((state) => state.subApp1)(store)
const subApp2Store = subspace((state) => state.subApp2)(store)

console.log('subApp1 state:', subApp1Store.getState()) // { "value": 1 }
console.log('subApp2 state:', subApp2Store.getState()) // { "value": 1 }

subApp1Store.dispatch({ type: 'INCREMENT' })

console.log('subApp1 state:', subApp1Store.getState()) // { "value": 2 }
console.log('subApp2 state:', subApp2Store.getState()) // { "value": 2 }

console.log('store state:', store.getState()) // { "subApp1": { value: 2 }, "subApp2": { value: 2 } }

subApp2Store.dispatch({ type: 'INCREMENT' })

console.log('subApp1 state:', subApp1Store.getState()) // { "value": 3 }
console.log('subApp2 state:', subApp2Store.getState()) // { "value": 3 }

console.log('store state:', store.getState()) // { "subApp1": { value: 3 }, "subApp2": { value: 3 } }
```

Likewise, if the root Redux store dispatched the action the state for both sub-applications will be updated:

```javascript
store.dispatch({ type: 'INCREMENT' })

console.log('subApp1 state:', subApp1Store.getState()) // { "value": 4 }
console.log('subApp2 state:', subApp2Store.getState()) // { "value": 4 }

console.log('store state:', store.getState()) // { "subApp1": { value: 4 }, "subApp2": { value: 4 } }
```

To prevent this type of action cross-talk, we can namespace the subspaces and the reducers to filter out actions destined the other sub-application:

```javascript
import { createStore, combineReducers } from 'redux'
import { subspace, namespaced } from 'redux-subspace'

const counter = (state = { value: 1 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, value: state.value + 1 }
        default:
            return state
    }
}

const reducer = combineReducers({
    subApp1: namespaced('subApp1')(counter),
    subApp2: namespaced('subApp2')(counter)
})

const store = createStore(reducer)

const subApp1Store = subspace((state) => state.subApp1, 'subApp1')(store)
const subApp2Store = subspace((state) => state.subApp2, 'subApp2')(store)

console.log('subApp1 state:', subApp1Store.getState()) // { "value": 1 }
console.log('subApp2 state:', subApp2Store.getState()) // { "value": 1 }

subApp1Store.dispatch({ type: 'INCREMENT' })

console.log('subApp1 state:', subApp1Store.getState()) // { "value": 2 }
console.log('subApp2 state:', subApp2Store.getState()) // { "value": 1 }

console.log('store state:', store.getState()) // { "subApp1": { value: 2 }, "subApp2": { value: 1 } }

subApp2Store.dispatch({ type: 'INCREMENT' })

console.log('subApp1 state:', subApp1Store.getState()) // { "value": 2 }
console.log('subApp2 state:', subApp2Store.getState()) // { "value": 2 }

console.log('store state:', store.getState()) // { "subApp1": { value: 2 }, "subApp2": { value: 2 } }

store.dispatch({ type: 'INCREMENT' })

console.log('subApp1 state:', subApp1Store.getState()) // { "value": 2 }
console.log('subApp2 state:', subApp2Store.getState()) // { "value": 2 }

console.log('store state:', store.getState()) // { "subApp1": { value: 2 }, "subApp2": { value: 2 } }
```

As you can now see, we namespacing gives us much better control over which subspaces interact with specific sections of the state.

We didn't need to use the exact same reducer for both sub-applications for this, but it does demonstrate how Redux Subspace can be used to create reusable redux applications.
