/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { subspace }  from 'redux-subspace'

class SubspaceProvider extends React.PureComponent {

    getChildContext() {
        const makeSubspaceDecorator = (props) => props.subspaceDecorator || subspace(props.mapState, props.namespace)

        return { 
            store: makeSubspaceDecorator(this.props)(this.context.store) 
        }
    }

    render() {
        return Children.only(this.props.children)
    }
}

SubspaceProvider.propTypes = {
    children: PropTypes.element.isRequired,
    mapState: PropTypes.func,
    namespace: PropTypes.string,
    subspaceDecorator: PropTypes.func,
}

SubspaceProvider.contextTypes = {
    store: PropTypes.object.isRequired
}

SubspaceProvider.childContextTypes = {
    store: PropTypes.object
}

export default SubspaceProvider
