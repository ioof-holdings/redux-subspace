/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import processAction from '../../src/actions/processAction'

describe('processAction Tests', () => {

    it('should process action if no namespace provided', () => {
        const action = { type: 'test/TEST', value: 'expected' }
        const callback = sinon.mock().returns(true)
        
        expect(processAction()(action, callback)).to.true
        expect(callback).to.be.calledWithMatch({ type: 'test/TEST', value: 'expected' })
    })

    it('should process action with provided namespace', () => {
        const action = { type: 'test/TEST', value: 'expected' }
        const callback = sinon.mock().returns(true)
        
        expect(processAction('test')(action, callback)).to.true
        expect(callback).to.be.calledWithMatch({ type: 'TEST', value: 'expected' })
    })

    it('should process global action with provided namespace', () => {
        const action = { type: 'TEST', value: 'expected', globalAction: true  }
        const callback = sinon.mock().returns(true)
        
        expect(processAction('test')(action, callback)).to.true
        expect(callback).to.be.calledWithMatch({ type: 'TEST', value: 'expected', globalAction: true })
    })

    it('should ignore action without provided namespace', () => {
        const action = { type: 'TEST', value: 'expected' }
        const callback = sinon.mock().throws()
        
        expect(processAction('test')(action, callback)).to.be.undefined
        expect(callback).to.not.be.calledWithMatch({ type: 'TEST', value: 'expected' })
    })

    it('should return default value when action is ignored', () => {
        const action = { type: 'TEST', value: 'expected' }
        const callback = sinon.mock().throws()
        
        expect(processAction('test')(action, callback, true)).to.be.true
        expect(callback).to.not.be.calledWithMatch({ type: 'TEST', value: 'expected' })
    })
})