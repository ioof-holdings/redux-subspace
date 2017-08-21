/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { empty } from 'rxjs/observable/empty'
import { map } from 'rxjs/operator/map'
import { filter } from 'rxjs/operator/filter'
import { subspace } from 'redux-subspace'

const identity = (x) => x

const subspaced = (mapState, namespace) => {
    const subspaceDecorator = subspace(mapState, namespace)
    return epic => (action$, store, ...rest) => {
        const subspacedStore = subspaceDecorator(store)
        const filteredAction$ = action$
            ::map((action) => subspacedStore.processAction(action, identity))
            ::filter(identity)
        epic(filteredAction$, subspacedStore, ...rest).subscribe(subspacedStore.dispatch)
        return empty()
    }
}

export default subspaced