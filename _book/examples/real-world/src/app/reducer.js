import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'
import { reducer as errorMessage } from '../errorMessage'
import { reducer as userPage } from '../userPage'
import { reducer as repoPage } from '../repoPage'

export default combineReducers({
  errorMessage,
  userPage: namespaced('userPage')(userPage),
  repoPage: namespaced('repoPage')(repoPage),
})
