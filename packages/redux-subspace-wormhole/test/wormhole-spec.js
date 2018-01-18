/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import wormhole from '../src/wormhole'

describe('wormhole Tests', () => {
    it('should map additional state from root state', () => {
        const store = {
            rootStore: {
                getState: () => ({ value: "expected" })
            }
        }

        const getState = () => ({ original: "test" })

        const state = wormhole((state) => state.value, 'extra')(store).getState(getState)()

        expect(state).to.deep.equal({ original: "test", extra: "expected" })
    })

    it('should map additional state from root state using string', () => {
        const store = {
            rootStore: {
                getState: () => ({ value: "expected" })
            }
        }

        const getState = () => ({ original: "test" })

        const state = wormhole('value', 'extra')(store).getState(getState)()

        expect(state).to.deep.equal({ original: "test", extra: "expected" })
    })

    it('should map additional state from root state using string key', () => {
        const store = {
            rootStore: {
                getState: () => ({ extra: "expected" })
            }
        }

        const getState = () => ({ original: "test" })

        const state = wormhole('extra')(store).getState(getState)()

        expect(state).to.deep.equal({ original: "test", extra: "expected" })
    })

    it('should handle array state', () => {
        const store = {
            rootStore: {
                getState: () => ({ value: "wrong" })
            }
        }

        const getState = () => [ "expected" ]

        const state = wormhole((state) => state.value, 'extra')(store).getState(getState)()

        expect(state).to.deep.equal([ "expected" ])
    })

    it('should handle primative state', () => {
        const store = {
            rootStore: {
                getState: () => ({ value: "wrong" })
            }
        }

        const getState = () => "expected"

        const state = wormhole((state) => state.value, 'extra')(store).getState(getState)()

        expect(state).to.deep.equal("expected")
    })
    
    it('should handle null state', () => {
        const store = {
            rootStore: {
                getState: () => ({ value: "wrong" })
            }
        }

        const getState = () => null

        const state = wormhole((state) => state.value, 'extra')(store).getState(getState)()

        expect(state).to.be.null
    })
        
    it('should handle undefined state', () => {
        const store = {
            rootStore: {
                getState: () => ({ value: "wrong" })
            }
        }

        const getState = () => undefined

        const state = wormhole((state) => state.value, 'extra')(store).getState(getState)()

        expect(state).to.be.undefined
    })
})
