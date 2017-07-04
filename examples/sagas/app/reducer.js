import { combineReducers } from 'redux'
import { reducer as component } from '../component'
import { namespaced } from '../../../lib'

const reducer = combineReducers({ 
  component1: namespaced(component, "component1"),
  component2: namespaced(component, "component2")
})

export { reducer }