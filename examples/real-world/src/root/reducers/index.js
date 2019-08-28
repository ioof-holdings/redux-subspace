import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'
import { connectRouter } from 'connected-react-router'
import { reducer as app } from '../../app'
import configuration from './configuration'

export default (history) => combineReducers({
  app: namespaced('app')(app),
  router: connectRouter(history),
  configuration
})
