import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'
import { readyToChangeValue, changeValue } from './actions'

export function* changeValueGenerator() {
  yield put(changeValue())
}

export default function* sagas() {
  yield takeEvery(readyToChangeValue().type, changeValueGenerator)
}
