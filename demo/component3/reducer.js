import { combineReducers } from 'redux'
import value from './value'
import thunkValues from './thunkValues'

const reducer = combineReducers({ value, thunkValues })

export { reducer }