import { call, all } from 'redux-saga/effects'
import { subspaced } from 'redux-subspace-saga'

import counterSaga from './counter'

export default function* rootSaga() {
  yield all([
    call(subspaced(state => state.counter1, "counter1")(counterSaga)),
    call(subspaced(state => state.counter2, "counter2")(counterSaga))
  ])
}
