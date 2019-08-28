import { put, takeEvery, delay } from 'redux-saga/effects'

function* incrementAsync() {
  yield delay(1000)
  yield put({type: 'INCREMENT'})
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
