import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'
import { reducer as todos } from '../../todos'
import { reducer as visibilityFilter } from '../../footer'

const app = combineReducers({
  todos: namespaced('todos')(todos),
  visibilityFilter: namespaced('footer')(visibilityFilter)
})

export default app
