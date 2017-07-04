import { sagas as componentSagas } from '../component'

export default function* sagas() {
  yield [ componentSagas('component1') , componentSagas('component2') ]
}
