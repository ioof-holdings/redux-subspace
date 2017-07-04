import { combineReducers } from 'redux'
import { reducer as component } from '../component'
import { namespaced } from '../../../lib'

const logger = (state = {}, action) => {
    console.log('action', action);
    return state
}

function lastAction(state = {}, action) {
  return action;
}

const reducer = combineReducers({ 
  logger,
  component1: namespaced(component, "component1"),
  component2: namespaced(component, "component2"),
  lastAction
})

export { reducer }