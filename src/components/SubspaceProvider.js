/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { getSubState } from '../utils/subState'
import { subStateDispatch } from '../utils/dispatch'

export default class SubspaceProvider extends Component {

    getChildContext() {
        let parentStore = this.context.store
        let rootStore = parentStore.rootStore || parentStore
        let getState = getSubState(parentStore.getState, rootStore.getState, this.props.mapState)
        let dispatch = subStateDispatch(parentStore.dispatch, getState, this.props.namespace)

        return { store: { ...parentStore, getState, dispatch, rootStore } }
    }

    render() {
        return Children.only(this.props.children)
    }
}

SubspaceProvider.propTypes = {
    mapState: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    namespace: PropTypes.string
}

SubspaceProvider.contextTypes = {
    store: PropTypes.object
}

SubspaceProvider.childContextTypes = {
    store: PropTypes.object
}
