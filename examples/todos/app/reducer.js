import { combineReducers } from 'redux'
import { namespaced } from '../../../lib'
import { reducer as todoApp } from '../todoApp'

const reducer = combineReducers({ 
    todoApp, 
    shoppingList: namespaced(todoApp, "shoppingList"), 
})

export { reducer }