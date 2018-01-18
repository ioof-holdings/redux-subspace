import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'

import counter from './counter'

export default combineReducers({
  counter1: namespaced('counter1')(counter),
  counter2: namespaced('counter2')(counter)
})
