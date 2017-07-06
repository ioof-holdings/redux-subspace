import { runSaga } from 'redux-saga'
import { getContext, setContext, take, call, takeEvery } from 'redux-saga/effects'
import withStore from './withStore'
import subspaceStore from '../utils/subspaceStore'
import { GlobalActions } from '../actions/GlobalActions'

const remove = (array, item) => {
  const index = array.indexOf(item)
  if (index >= 0) {
    array.splice(index, 1)
  }
}

const emitter = () => {
    const subscribers = []

    function subscribe(sub) {
        subscribers.push(sub)
        return () => remove(subscribers, sub)
    }

    function emit(item) {
        const arr = subscribers.slice()
        for (var i = 0, len = arr.length; i < len; i++) {
        arr[i](item)
        }
    }

    return {
        subscribe,
        emit,
    }
}

function subspacedSaga(saga, mapState, namespace) {

    function* wrappedSaga() {
        const parentStore = yield getContext('store')

        const sagaEmitter = emitter()
        
        const store = {
            ...subspaceStore(parentStore, mapState, namespace),
            subscribe: sagaEmitter.subscribe,
        }

        function* scopedSaga(action) {
            if (!namespace || GlobalActions.isGlobal(action)) {
                sagaEmitter.emit(action)
            } else if (action.type && action.type.indexOf(`${namespace}/`) === 0) {
                let theAction = {...action, type: action.type.substring(namespace.length + 1)}
                sagaEmitter.emit(theAction)
            }
        }

        runSaga(store, withStore(saga, store))

        yield takeEvery('*', scopedSaga)
    }

    return call(wrappedSaga)
}

export default subspacedSaga
