import { combineReducers } from 'redux'
import { reducer as visibilityFilter } from '../../filterFooter'
import todos  from './todos'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp