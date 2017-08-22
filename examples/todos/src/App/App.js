import React from 'react'
import { connect } from 'react-redux'
import { SubspaceProvider } from 'react-redux-subspace'
import { Footer } from '../Footer'
import { AddTodo, VisibleTodoList } from '../Todos'

const App = ({ filter }) => (
  <div>
    <SubspaceProvider namespace='todos'>
      <div>
        <AddTodo />
        <VisibleTodoList filter={filter} />
      </div>
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
