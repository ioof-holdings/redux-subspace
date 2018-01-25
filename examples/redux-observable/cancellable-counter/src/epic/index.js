import { combineEpics } from 'redux-observable'
import { subspaced } from 'redux-subspace-observable'

import { rootEpic as counterEpic } from './counter'

export const rootEpic = combineEpics(
  subspaced(state => state.counter1, 'counter1')(counterEpic),
  subspaced(state => state.counter2, 'counter2')(counterEpic)
)
