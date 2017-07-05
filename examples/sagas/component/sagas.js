import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'
import { READY_TO_CHANGE_VALUE, changeValue } from './actions'

function* changeValueGenerator() {
  yield put(changeValue())
}

export default function* sagas() {
  yield takeEvery(READY_TO_CHANGE_VALUE, changeValueGenerator)
}
