import { applyToRoot } from 'redux-subspace'
import { createEpicMiddleware as baseCreateEpicMiddleware } from 'redux-observable'

export const createEpicMiddleware = (rootEpic, options = {}) =>
    applyToRoot(store =>
        baseCreateEpicMiddleware(rootEpic, { ...options, dependencies: { ...options.dependencies, store } })(store)
    )
