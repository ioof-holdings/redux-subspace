# redux-subspace

This is a library to create subspaces for Redux stores.

## What it does

`subspace` allows you to present a sub-view of the state in the Redux store, allowing it to be ignorant of parent state structure. This means you can completely isolate sections of the state from others without having to know where the root if sub-state is in the global state of the app.

Actions dispatched from sub-stores can be automatically namespaced to prevent them from being picked up by unrelated reducers that inadvertently use the same action types. Actions dispatched inside thunks executed by redux-thunk middleware will be automatically namespaced.

## Use this library if:

* You are using a single global Redux store, but would like to create decoupled sections of your app.
* You want actions dispatched from these components to not be picked up by reducers in other components (i.e. avoid action cross talk).

## How to use

### In parent component/app

```javascript
npm i --save redux-subspace
```

Create the store

```javascript
import { createStore, combineReducers } from 'redux'
import { reducer as substate } from 'some-dependency'

...

const store = createStore(combineReducers({ substate }))
```

Create subspace of the store

```javascript
import { subspace } from 'redux-subspace'

...

const substore = subspace(store, (state) => state.substate)
```

The root state of the store is also provided as a second parameter to `mapState` as well.  This can be useful for accessing global in nested components (e.g. configuration).

```javascript
import { subspace } from 'redux-subspace'

...

const substore = subspace(store, (state, rootState) => ({ ...state.substate, configuration: rootState.configuration)
```

### Namespacing

Namespacing subspaces will automatically scope actions dispatched from the substore so that they will only be recieved by reducers with a matching namespace.

The namespace is applied to the action by prefixing the `type` of the action for every subspace it passes through. The `type` of any dispatched namespaced actions will be in the format `givenNamespace/originalType`.

#### Provider

```javascript
import { subspace } from 'redux-subspace'

...

const substore = subspace(store, (state) => state.substate, "child")
```

#### Reducers

```javascript
import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'
import { reducer as substate } from 'some-dependency'

...

const reducer = combineReducers({ substate: namespaced(substate, 'child') })
```

#### Global Actions

Occasionally you may have actions that need to go beyond your small view of the world.

If you have control over the action creator, passing your action to the `asGlobal` function before it is dispatched will ensure your action does not get namespaced.

```javascript
import { asGlobal } from 'redux-subspace'

const globalActionCreator = globalValue => {
    return asGlobal({ type = "GLOBAL_ACTION", globalValue})
}
```

This method gives you more control over if and when an action should be treated as global.

To exclude all instances of an action type from namespacing, the `GlobalActions.register` function can be used.

```javascript
import { GlobalActions } from 'redux-subspace'

GlobalActions.register("GLOBAL_ACTION")

const globalActionCreator = globalValue => {
    return { type = "GLOBAL_ACTION", globalValue}
}
```

This is particularly useful when using actionsCreators of dependencies that are unaware that they are being dispatched within a namespaced subspace, such as the navigation actions from [react-router-redux](https://github.com/reactjs/react-router-redux) (see our [example](./examples/react-router-redux/index.jsx) for more details).

### Thunks

Any actions dispatched by your thunks are wrapped with the same subspace and namespacing rules as standard actions.  If they use the `getState` function, they will receive the state provided by the subspace.

### Nesting Subspaces

When nesting subspaces, the `root` node will reflect the top most root state. Namespaced actions and reducers will be prefixed with the parent's namespace, if provided.

## Examples

Examples can be found [here](./examples).

## Caveats

* You cannot use `root` as a field in your state. It will be replaced with the root of the state tree.  Sorry.
