import { combineReducers } from 'redux'
import { reducer as component } from '../component2'

const reducer = combineReducers({ 
    component
})

export { reducer }