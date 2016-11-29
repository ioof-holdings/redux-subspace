import React from 'react'
import { SubspaceProvider } from '../../../lib'
import { TodoApp } from '../todoApp'

export default props => {
    return (
        <div>
            <h2>To-Do List</h2>
            <SubspaceProvider mapState={state => state.todoApp}>
                <TodoApp />
            </SubspaceProvider>
            <h2>Shopping List</h2>
            <SubspaceProvider mapState={state => state.shoppingList} namespace="shoppingList">
                <TodoApp />
            </SubspaceProvider>
        </div>
    )
}
