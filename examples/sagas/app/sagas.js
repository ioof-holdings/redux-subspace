import { sagas as componentSagas } from '../component'
import { all } from 'redux-saga/effects'

export default function* sagas() {
  yield all([ componentSagas('component1') , componentSagas('component2') ])
}
