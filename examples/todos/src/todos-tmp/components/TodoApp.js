import React from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const TodoApp = ({ filter }) => (
  <div>
    <AddTodo />
    <VisibleTodoList filter={filter} />
  </div>
)

export default TodoApp
