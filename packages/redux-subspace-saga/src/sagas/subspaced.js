import { runSaga } from 'redux-saga'
import { getContext, takeEvery } from 'redux-saga/effects'
import { subspace, GlobalActions } from 'redux-subspace'
import withStore from './withStore'

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

function subspaced(saga, mapState, namespace) {
    return function* wrappedSaga() {
        const parentStore = yield getContext('store')

        const sagaEmitter = emitter()
        
        const store = {
            ...subspace(parentStore, mapState, namespace),
            subscribe: sagaEmitter.subscribe,
        }

        runSaga(store, withStore(saga, store))

        yield takeEvery('*', function* (action) {
            if (!namespace || GlobalActions.isGlobal(action)) {
                sagaEmitter.emit(action)
            } else if (action.type && action.type.indexOf(`${namespace}/`) === 0) {
                let theAction = {...action, type: action.type.substring(namespace.length + 1)}
                sagaEmitter.emit(theAction)
            }
        })
    }
}

export default subspaced
