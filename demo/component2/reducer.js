import { combineReducers } from 'redux'
import { namespaced } from '../../src'
import { reducer as subComponent } from '../component1'

const reducer = combineReducers({ subComponent: namespaced(subComponent, "test1") })

export { reducer }