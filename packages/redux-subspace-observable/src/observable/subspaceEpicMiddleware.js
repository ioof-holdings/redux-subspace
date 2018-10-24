import { applyToRoot } from 'redux-subspace'
import { createEpicMiddleware as baseCreateEpicMiddleware } from 'redux-observable'
import { SUBSPACE_STORE_KEY } from './subspaceStoreKey'

export const createEpicMiddleware = (options = {}) => {
    if (options.dependencies != null && (Array.isArray(options.dependencies) || typeof options.dependencies !== 'object')) {
        throw new TypeError('dependencies must be an object')
    }

    const subspaceEpicMiddleware = (store) => {
        const optionsWithStore = {
            ...options,
            dependencies: {
                ...options.dependencies,
                [SUBSPACE_STORE_KEY]: store
            }
        }
        const epicMiddleware = baseCreateEpicMiddleware(optionsWithStore)
        subspaceEpicMiddleware.run = (rootEpic) => epicMiddleware.run(rootEpic)
        return epicMiddleware(store)
    }

    return applyToRoot(subspaceEpicMiddleware)
}
