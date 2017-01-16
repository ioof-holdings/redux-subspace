import { combineReducers } from 'redux'
import { reducer as component } from '../component'

const reducer = combineReducers({ 
    component
})

export { reducer }