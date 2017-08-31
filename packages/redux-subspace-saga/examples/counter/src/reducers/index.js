import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'

function counter(state = 0, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'INCREMENT_IF_ODD':
        return (state % 2 !== 0) ? state + 1 : state
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }

export default combineReducers({
  counter1: namespaced('counter1')(counter),
  counter2: namespaced('counter2')(counter)
})
