import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'
import { READY_TO_CHANGE_VALUE, changeValue } from './actions'

const changeValueGeneratorWithNamespace = (namespace) => {
  const appendNamespace = (action) => {
    return {...action, type: `${namespace}/${action.type}`}
  }

  return function* changeValueGenerator() {
    yield put(appendNamespace(changeValue()))
  }  
}

export default function* sagas(namespace) {
  const actionType = `${namespace}/${READY_TO_CHANGE_VALUE}`;
  yield takeEvery(actionType, changeValueGeneratorWithNamespace(namespace))
}
