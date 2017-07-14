/**
 * Copyright 2016, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { subspace }  from 'redux-subspace'

export default class SubspaceProvider extends Component {

    getChildContext() {
        return { store: subspace(this.context.store, this.props.mapState, this.props.namespace) }
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
