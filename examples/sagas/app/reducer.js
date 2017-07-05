import { combineReducers } from 'redux'
import { reducer as component } from '../component'
import { namespaced } from '../../../lib'

const logger = (state = {}, action) => {
    console.log('action', action);
    return state
}

const reducer = combineReducers({ 
  logger,
  component1: namespaced(component, "component1"),
  component2: namespaced(component, "component2"),
  component3: component,
})

export { reducer }