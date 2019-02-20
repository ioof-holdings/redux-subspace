import React from 'react'
import { connect } from 'react-redux'
import { SubspaceProvider } from 'react-redux-subspace'

// work around for lerna/npm link issue for local development
import { ReactReduxContext } from 'react-redux'

import { Footer } from '../../footer'
import { TodoApp } from '../../todos'

const App = ({ filter }) => (
  <div>
    <SubspaceProvider namespace='todos' context={ReactReduxContext}>
      <TodoApp filter={filter} />
    </SubspaceProvider>
    <SubspaceProvider mapState={(state) => state.visibilityFilter} namespace='footer' context={ReactReduxContext}>
      <Footer />
    </SubspaceProvider>
  </div>
)

const mapStateToProps = (state) => ({
  filter: state.visibilityFilter
})

export default connect(mapStateToProps)(App)
