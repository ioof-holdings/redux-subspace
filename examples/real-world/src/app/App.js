/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SubspaceProvider } from 'react-redux-subspace'
import { browserHistory } from 'react-router'
import Explore from './containers/Explore'
import { ErrorMessage } from '../errorMessage'

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node
  }

  handleChange = nextValue => {
    browserHistory.push(`/${nextValue}`)
  }

  render() {
    const { children, inputValue } = this.props
    return (
      <div>
        <Explore value={inputValue}
                 onChange={this.handleChange} />
        <hr />
        <SubspaceProvider mapState={(state) => state.errorMessage}>
          <ErrorMessage />
        </SubspaceProvider>
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  inputValue: ownProps.location.pathname.substring(1)
})

export default connect(mapStateToProps)(App)
