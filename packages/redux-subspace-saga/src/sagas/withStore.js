import { setContext } from 'redux-saga/effects'

function withStore(saga, store) {
    return function* () {
        yield setContext({ store })
        yield* saga()
    }
}

export default withStore
