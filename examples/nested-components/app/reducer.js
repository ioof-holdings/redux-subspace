import { combineReducers } from 'redux'
import { reducer as component } from '../component1'

const reducer = combineReducers({ 
    component
})

export { reducer }