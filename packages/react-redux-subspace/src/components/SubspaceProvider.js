/**
 * Copyright 2017, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Children } from 'react'
import { compose } from 'redux'
import { ReactReduxContext, Provider } from 'react-redux'
import PropTypes from 'prop-types'
import memoizeOne from 'memoize-one'
import { subspace }  from 'redux-subspace'

const contextApi = (Component) => {
    const SubspaceContextApi = (props) => {
        const { Context = ReactReduxContext, ...passThroughProps } = props
        return (
            <Context.Consumer>
                {context => {
                    const componentProps = context ? { ...passThroughProps, store: context.store } : passThroughProps
                    return (
                        <Component {...componentProps} />
                    )
                }}
            </Context.Consumer>
        )
    }

    return SubspaceContextApi
}

const legacyContext = (Component) => {
    class SubspaceLegacyContextInput extends React.Component {
        render() {
            const passThroughProps = this.context.store ? { ...this.props, store: this.context.store } : this.props
            return <Component {...passThroughProps} />
        }
    }

    SubspaceLegacyContextInput.contextTypes = {
        store: PropTypes.object
    }

    return SubspaceLegacyContextInput
}

class SubspaceLegacyContextOutput extends React.Component {
    getChildContext() {
        return { 
            store: this.props.subspace
        }
    }

    render() {
        return Children.only(this.props.children)
    }
}

SubspaceLegacyContextOutput.childContextTypes = {
    store: PropTypes.object
}

class SubspaceProvider extends React.Component {
    makeSubspace = memoizeOne((mapState, namespace, subspaceDecorator, store) => {
        const createSubspace = subspaceDecorator || subspace(mapState, namespace)
        return createSubspace(store)
    })

    render() {
        const { mapState, namespace, subspaceDecorator, store, children } = this.props
        const subspace = this.makeSubspace(mapState, namespace, subspaceDecorator, store)
        return (
            <Provider key={subspace.namespace} store={subspace}>
                <SubspaceLegacyContextOutput subspace={subspace}>
                    {Children.only(children)}
                </SubspaceLegacyContextOutput>
            </Provider>
        )
    }
}

SubspaceProvider.propTypes = {
    children: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired,
    mapState: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    namespace: PropTypes.string,
    subspaceDecorator: PropTypes.func
}

const storeAccess = compose(contextApi, legacyContext)

export default storeAccess(SubspaceProvider)
