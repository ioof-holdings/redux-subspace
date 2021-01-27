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

    it('should return same state reference and wormhole value if state is unchanged', () => {
        const store = {
            rootStore: {
                getState: () => ({ value: "expected" })
            }
        }

        const state = { original: "test" }
        const getState = () => state

        const middleware = wormhole((state) => state.value, 'extra')(store).getState(getState)

        const state1 = middleware()
        const state2 = middleware()

        expect(state1).to.equal(state2)
    })

    it('should not break change state reference when middleware is applied to multiple stores', () => {
        const store1 = {
            rootStore: {
                getState: () => ({ value: "expected" })
            }
        }

        const state1 = { original: "test1" }
        const getState1 = () => state1

        const store2 = {
            rootStore: {
                getState: () => ({ value: "expected" })
            }
        }

        const state2 = { original: "test2" }
        const getState2 = () => state2
        
        const middlewareCreator = wormhole((state) => state.value, 'extra')

        const middleware1 = middlewareCreator(store1).getState(getState1)
        const middleware2 = middlewareCreator(store1).getState(getState2)

        const state11 = middleware1()
        const state21 = middleware2()
        const state12 = middleware1()
        const state22 = middleware2()

        expect(state11).to.equal(state12)
        expect(state21).to.equal(state22)

        expect(state11).to.not.equal(state21)
        expect(state12).to.not.equal(state22)
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
