import { createStore } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import thunk from 'redux-thunk'
import api from '../../common/middleware/api'
import wormhole from 'redux-subspace-wormhole'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(
    thunk, 
    api, 
    wormhole((state) => state.configuration, 'configuration')
  )
)

export default configureStore
