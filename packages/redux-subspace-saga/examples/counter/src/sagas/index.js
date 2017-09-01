import { put, call, takeEvery, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { subspaced } from 'redux-subspace-saga'

function* incrementAsync() {
  yield call(delay, 1000)
  yield put({type: 'INCREMENT'})
}

function* counterSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export default function* rootSaga() {
  yield all([
    call(subspaced(state => state.counter1, "counter1")(counterSaga)),
    call(subspaced(state => state.counter2, "counter2")(counterSaga))
  ])
}
