import { runSaga } from 'redux-saga'
import { getContext, setContext, take, call, takeEvery } from 'redux-saga/effects'
import withStore from './withStore'
import { getSubState } from '../utils/subState'
import { subStateDispatch } from '../utils/dispatch'
import { GlobalActions } from '../actions/GlobalActions'

function subspacedSaga(saga, mapState, namespace) {

    function* wrappedSaga() {
        const parentStore = yield getContext('store')

        const rootStore = parentStore.rootStore || parentStore
        const getState = getSubState(parentStore.getState, rootStore.getState, mapState)
        const dispatch = subStateDispatch(parentStore.dispatch, getState, namespace)

        let callback

        const subscribe = (c) => {
            callback = c
            return () => runningSaga.cancel()
        }

        const store = {
            subscribe,
            dispatch,
            getState
        }

        function* scopedSaga(action) {
            if (!namespace || GlobalActions.isGlobal(action)) {
                callback(action)
            } else if(action.type && action.type.indexOf(`${namespace}/`) === 0) {
                let theAction = {...action, type: action.type.substring(namespace.length + 1)}
                callback(theAction)
            }
        }

        const runningSaga = runSaga(store, withStore(saga, store))

        yield takeEvery('*', scopedSaga)
    }

    return call(wrappedSaga)
}

export default subspacedSaga
