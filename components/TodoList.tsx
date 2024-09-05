// components\TodoList.tsx
// components/TodoList.tsx
import React from 'react';
import AddTodo from './AddTodo';
import TodoCard from './TodoCard';
import { todoType } from '@/interfaces/types/todoTypes';

interface TodoListProps {
    todos: todoType[];   // Array of todos to be displayed
    mutate: () => void;  // Function to trigger a re-fetch of the todo list
}

const TodoList: React.FC<TodoListProps> = ({ todos, mutate }) => {
    return (
        <div>
            {/* Header section with title and option to add a new todo */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">My Notes</h1>
                <AddTodo mutate={mutate} /> {/* AddTodo component to add new todos */}
            </div>

            {/* Conditionally render the list of todos or display a no-notes message */}
            {todos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {todos.map((todo: todoType) => (
                        <TodoCard key={todo.id} todo={todo} /> // Render each todo item
                    ))}
                </div>
            ) : (
                <div>No notes available</div> // Message if no todos match the filter criteria
            )}
        </div>
    );
};

export default TodoList;
