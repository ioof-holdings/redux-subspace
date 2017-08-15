import { combineReducers } from 'redux';
import { namespaced } from 'redux-subspace';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
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
