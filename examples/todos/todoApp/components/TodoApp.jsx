import React from 'react'
import { SubspaceProvider } from '../../../../lib'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import { Footer } from '../../filterFooter'

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <SubspaceProvider mapState={(state) => state.visibilityFilter}>
      <Footer />
    </SubspaceProvider>
  </div>
)

export default TodoApp