import { combineReducers } from 'redux'
import { namespaced } from '../../../lib'
import { reducer as component } from '../component'

const reducer = combineReducers({ 
    component1: namespaced(component, "component1"),
    component2: namespaced(component, "component2")
})

export { reducer }