import React from 'react'
import { SubspaceProvider } from '../../../../lib'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import { Footer } from '../../filterFooter'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

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