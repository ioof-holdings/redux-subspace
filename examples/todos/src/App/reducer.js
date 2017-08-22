import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'
import { reducer as todos } from '../Todos'
import { reducer as visibilityFilter } from '../Footer'

const app = combineReducers({
  todos: namespaced('todos')(todos),
  visibilityFilter: namespaced('footer')(visibilityFilter)
})

export default app
