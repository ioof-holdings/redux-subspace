import { namespaced } from '../../../src'

const reducer = (state = "test") => {
    return state
}

const namespacedReducer = namespaced(reducer, "testNamespace");