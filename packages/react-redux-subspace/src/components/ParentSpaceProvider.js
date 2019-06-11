/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { parentSpace }  from 'redux-subspace'

class ParentSpaceProvider extends React.PureComponent {

    getChildContext() {
        return { 
            store: parentSpace(this.context.store) 
        }
    }

    render() {
        return Children.only(this.props.children)
    }
}

ParentSpaceProvider.propTypes = {
    children: PropTypes.element.isRequired,
}

ParentSpaceProvider.contextTypes = {
    store: PropTypes.object.isRequired
}

ParentSpaceProvider.childContextTypes = {
    store: PropTypes.object
}

export default ParentSpaceProvider
