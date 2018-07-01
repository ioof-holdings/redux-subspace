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

export function createSubspaceProvider(paramStoreKey = 'store') {
    let storeKey = typeof paramStoreKey === 'object' ? paramStoreKey.storeKey || 'store' : paramStoreKey;
    let parentStoreKey = typeof paramStoreKey === 'object' ? paramStoreKey.parentStoreKey || 'store' : paramStoreKey;

    class SubspaceProvider extends React.PureComponent {
        getChildContext() {
            const makeSubspaceDecorator = (props) => props.subspaceDecorator || subspace(props.mapState, props.namespace)

            if (storeKey !== 'store') {
                console.log('parentStoreKey: ', parentStoreKey)
                console.log(this.context[parentStoreKey])
            }
            return {
                [storeKey]: makeSubspaceDecorator(this.props)(this.context[parentStoreKey]),
                [`${storeKey}Subscription`]: this.context[`${parentStoreKey}Subscription`],
            }
        }

        render() {
            return Children.only(this.props.children)
        }
    }

    SubspaceProvider.propTypes = {
        children: PropTypes.element.isRequired,
        mapState: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.string,
        ]),
        namespace: PropTypes.string,
        subspaceDecorator: PropTypes.func,
    }

    SubspaceProvider.contextTypes = {
        [parentStoreKey]: PropTypes.object.isRequired,
        [`${parentStoreKey}Subscription`]: PropTypes.object,
    }

    SubspaceProvider.childContextTypes = {
        [storeKey]: PropTypes.object,
        [`${storeKey}Subscription`]: PropTypes.object,
    }

    return SubspaceProvider;
}

export default createSubspaceProvider()
