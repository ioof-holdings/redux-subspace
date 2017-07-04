import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'
import { READY_TO_CHANGE_VALUE, changeValue } from './actions'

const decorateWithComponentName = (namespace) => {
  const appendComponentName = (action) => {
    return {...action, type: `${namespace}/${action.type}`}
  }

  return function* changeValueGenerator() {
    yield put(appendComponentName(changeValue()))
  }  
}

export default function* sagas(namespace) {
  const actionType = `${namespace}/${READY_TO_CHANGE_VALUE}`;
  yield takeEvery(actionType, decorateWithComponentName(namespace))
}
