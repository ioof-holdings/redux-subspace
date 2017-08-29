# Usage

Using Redux Subspace with [`redux-loop`](https://github.com/redux-loop/redux-loop) is pretty straightforward and should require no additional enhancer or middleware configuration. The only difference is that you have to import the `namespaced` function from `redux-subspace-loop` instead of using the default one from redux-subspace package. This extends the functionality provided by redux-subspace to also namespace the commands returned by your reducer.

```sh
npm install --save redux-subspace-loop
```

```diff
import { createStore, combineReducers } from 'redux'
- import { subspace, namespaced } from 'redux-subspace'
+ import { subspace } from 'redux-subspace'
+ import { namespaced } from 'redux-subspace-loop'

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
```