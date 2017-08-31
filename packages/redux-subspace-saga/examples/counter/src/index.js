import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { subspace, applyMiddleware } from 'redux-subspace'
import createSagaMiddleware from 'redux-subspace-saga'

import Counter from './components/Counter'
import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

const counter1Store = subspace(state => state.counter1, "counter1")(store);
const counter2Store = subspace(state => state.counter2, "counter2")(store);

const counter1Action = type => counter1Store.dispatch({type})
const counter2Action = type => counter2Store.dispatch({type})

function render() {
  ReactDOM.render(
    <div>
      <Counter
        value={counter1Store.getState()}
        onIncrement={() => counter1Action('INCREMENT')}
        onDecrement={() => counter1Action('DECREMENT')}
        onIncrementIfOdd={() => counter1Action('INCREMENT_IF_ODD')}
        onIncrementAsync={() => counter1Action('INCREMENT_ASYNC')} />
      <Counter
        value={counter2Store.getState()}
        onIncrement={() => counter2Action('INCREMENT')}
        onDecrement={() => counter2Action('DECREMENT')}
        onIncrementIfOdd={() => counter2Action('INCREMENT_IF_ODD')}
        onIncrementAsync={() => counter2Action('INCREMENT_ASYNC')} />
    </div>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
