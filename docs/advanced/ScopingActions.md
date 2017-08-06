# Scoping Actions

When [namespacing](/docs/basics/Namespacing.md), actions are automatically scoped to the the relative namespace of the subspace they are dispatched from. Sometimes, it is necessary to dispatch actions with specific scoping requirements.

## Global Actions

If the sub-application knows that an action should be global it can use the `globalAction` function to ensure that it does not get namespaced:

```javascript
import { globalAction } from 'redux-subspace'

store.dispatch(globalAction({ type: 'MUST_BE_GLOBAL' }))
```

Alternatively, if an action type should always be considered global, the `globalActions` middleware can be used:

```javascript
import { createStore } from 'redux'
import { applyMiddleware, globalActions } from 'redux-subspace'

const store = createStore(reducer, applyMiddleware(globalActions('MUST_BE_GLOBAL')))

store.dispatch({ type: 'MUST_BE_GLOBAL' })
```

These actions will still be passed into a `namespaced` reducer, even if the namespace does not match.

## Namespaced Actions

Additional namepaces can be added to actions using the `namespacedAction` function:

```javascript
import { namespacedAction } from 'redux-subspace'

store.dispatch(namespacedAction('extraNamespaces')({ type: 'AN_ACTION' }))
```

This can be useful if a parent application needs to dispatch an action for a child application:

```javascript
import { createStore, combineReducers } from 'redux'
import { subspace, namespaced, namespacedAction } from 'redux-subspace'

const counter = (state = { value: 1 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, value: state.value + 1 }
        default:
            return state
    }
}

const reducer = combineReducers({
    subApp: namespaced('subApp')(counter),
})

const store = createStore(reducer)

const subAppStore = subspace((state) => state.subApp1, 'subApp1')(store)

console.log('subApp state:', subAppStore.getState()) // { "value": 1 }

store.dispatch(namespacedAction('subApp')({ type: 'INCREMENT' }))

console.log('subApp state:', subApp1Store.getState()) // { "value": 2 }
```
