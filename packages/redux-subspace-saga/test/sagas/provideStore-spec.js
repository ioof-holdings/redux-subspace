/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { take, put, setContext } from 'redux-saga/effects'
import provideStore from '../../src/sagas/provideStore'

describe('provideStore Tests', () => {
    it('should provide store to saga', () => {
        const store = { getState: "getState", dispatch: "dispatch" }

        function* saga() {
            yield take("TEST")
            yield put({ type: "USE_TEST" })
        }

        const sagaWithStore = provideStore(store)(saga)

        const iterator = sagaWithStore()

        expect(iterator.next().value).to.deep.equal(setContext({ store }))
        expect(iterator.next().value).to.deep.equal(take("TEST"))
        expect(iterator.next({ type: "TEST" }).value).to.deep.equal(put({ type: "USE_TEST" }))
        expect(iterator.next().done).to.be.true
    })
})
