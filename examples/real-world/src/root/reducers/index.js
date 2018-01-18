import { combineReducers } from 'redux'
import { namespaced } from 'redux-subspace'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as app } from '../../app'
import configuration from './configuration'

export default combineReducers({
  app: namespaced('app')(app),
  configuration,
  routing
})
