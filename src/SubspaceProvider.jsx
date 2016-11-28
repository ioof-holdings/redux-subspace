/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, PropTypes, Children } from 'react'
import { getSubState, subStateDispatch, namespacedDispatch } from './subspaceWrappers'

export default class SubspaceProvider extends Component {

    getChildContext() {
        let rootStore = this.context.store
        let getState = getSubState(rootStore.getState, this.props.mapState)
        let dispatch = namespacedDispatch(rootStore.dispatch, getState, this.props.namespace) || subStateDispatch(rootStore.dispatch, getState)

        return { store: { ...rootStore, getState, dispatch } }
    }

    render() {
        const { children } = this.props
        return Children.only(children)
    }
}

SubspaceProvider.propTypes = {
    mapState: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    namespace: PropTypes.string
}

SubspaceProvider.contextTypes = {
    store: PropTypes.object
};

SubspaceProvider.childContextTypes = {
    store: PropTypes.object
};
