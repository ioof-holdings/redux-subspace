import React from 'react'
import { connect } from 'react-redux'
import { SubspaceProvider } from 'react-redux-subspace'
import { Footer } from '../../Footer'
import { TodoApp } from '../../Todos'

const App = ({ filter }) => (
  <div>
    <SubspaceProvider namespace='todos'>
      <TodoApp filter={filter} />
    </SubspaceProvider>
    <SubspaceProvider mapState={(state) => state.visibilityFilter} namespace='footer'>
      <Footer />
    </SubspaceProvider>
  </div>
)

const mapStateToProps = (state) => ({
  filter: state.visibilityFilter
})

export default connect(mapStateToProps)(App)
