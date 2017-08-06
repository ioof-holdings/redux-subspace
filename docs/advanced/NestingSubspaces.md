# Nesting Subspaces

As subspaces behave, for all intents and purposes, the same as a regular Redux store, it is possible to create subspaces from other subspaces.  This is useful when you want to compose a sub-application from other sub-applications.

Given the following store set up:

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

subApp1 = combineReducers({
    childApp: namespaced('childApp')(counter),
    subApp: counter
})

const reducer = combineReducers({
    subApp1: namespaced('subApp1')(subApp1),
    subApp2: namespaced('subApp2')(counter)
})

const store = createStore(reducer)

const subApp1Store = subspace((state) => state.subApp1, 'subApp1')(store)
const subApp2Store = subspace((state) => state.subApp2, 'subApp2')(store)

const childAppStore = subspace((state) => state.childApp, 'childApp')(subApp1Store)
```

This store's state will now look like:

```json
{
    "subApp1": {
        "childApp": {
            "value": 1
        },
        "subApp": {
            "value": 1
        }
    },
    "subApp2": {
        "value": 1
    }
}
```

When dispatching actions into `childAppStore`, only the counter for the childApp will change:

```javascript
childAppStore.dispatch({ type: 'INCREMENT' })

console.log('childApp state:', childAppStore.getState()) // { "value": 2 }

console.log('subApp1 state:', subApp1Store.getState()) // { "childApp": { "value": 2 }, "subApp": { "value": 1 } }
console.log('subApp2 state:', subApp2Store.getState()) // { "value": 1 }

console.log('store state:', store.getState()) // { "subApp1": { "childApp": { "value": 2 }, "subApp": { "value": 1 } }, subApp2: { value: 1 } }
```

When dispatching actions into `subApp1Store`, the child app counter is not affected:

```javascript
subApp1Store.dispatch({ type: 'INCREMENT' })

console.log('childApp state:', childAppStore.getState()) // { "value": 2 }

console.log('subApp1 state:', subApp1Store.getState()) // { "childApp": { "value": 2 }, "subApp": { "value": 2 } }
console.log('subApp2 state:', subApp2Store.getState()) // { "value": 1 }

console.log('store state:', store.getState()) // { subApp1: { "childApp": { "value": 2 }, "subApp": { "value": 2 } }, subApp2: { value: 1 } }
```

Likewise, when dispatching actions into `subApp2Store` or the root Redux store, the child app counter is not affected:

```javascript
subApp2Store.dispatch({ type: 'INCREMENT' })

console.log('childApp state:', childAppStore.getState()) // { "value": 2 }

console.log('subApp1 state:', subApp1Store.getState()) // { "childApp": { "value": 2 }, "subApp": { "value": 2 } }
console.log('subApp2 state:', subApp2Store.getState()) // { "value": 2 }

console.log('store state:', store.getState()) // { subApp1: { "childApp": { "value": 2 }, "subApp": { "value": 2 } }, subApp2: { value: 2 } }

store.dispatch({ type: 'INCREMENT' })

console.log('childApp state:', childAppStore.getState()) // { "value": 2 }

console.log('subApp1 state:', subApp1Store.getState()) // { "childApp": { "value": 2 }, "subApp": { "value": 2 } }
console.log('subApp2 state:', subApp2Store.getState()) // { "value": 2 }

console.log('store state:', store.getState()) // { subApp1: { "childApp": { "value": 2 }, "subApp": { "value": 2 } }, subApp2: { value: 2 } }
```

Subspaces can be nested arbitrarily deep, so you can slice your application into sub-applications in whatever way make the most sense to you.
