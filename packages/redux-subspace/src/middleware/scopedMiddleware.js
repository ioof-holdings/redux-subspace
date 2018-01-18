/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const copyProperties = (source, target) => Object.keys(source).forEach(key => target[key] = source[key])

const scopedMiddleware = (middleware, predicate) => {
    const wrappedMiddleware = (store) => {
        if (predicate(store)) {
            const appliedMiddleware = middleware(store)
            copyProperties(middleware, wrappedMiddleware)
            return appliedMiddleware
        }
        return {}
    }
    copyProperties(middleware, wrappedMiddleware)
    return wrappedMiddleware
}

export default scopedMiddleware
