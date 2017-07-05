import { all } from 'redux-saga/effects'
import { subspacedSagas } from '../../../src'
import { sagas as componentSagas } from '../component'

export default function* sagas() {
  yield all([ 
    subspacedSagas(componentSagas, state => state.component1, 'component1'), 
    subspacedSagas(componentSagas, state => state.component2, 'component2'),
    subspacedSagas(componentSagas, state => state.component3)
  ])
}
