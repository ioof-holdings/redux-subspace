import { createStore, compose } from 'redux'
import { applyMiddleware, applyToRoot } from 'redux-subspace'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import wormhole from 'redux-subspace-wormhole'
import api from '../../common/middleware/api'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        thunk, 
        api, 
        wormhole((state) => state.configuration, 'configuration'), 
        applyToRoot(createLogger())
      ),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
