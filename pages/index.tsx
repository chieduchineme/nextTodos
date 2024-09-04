// pages/index.tsx
import { getServerSideProps } from '@/lib/checkAuth';
import { useState } from 'react'; 
import useTodoList from '@/hooks/useTodoList'; 
import TodoList from '@/components/TodoList'; 
import { todoType } from '@/interfaces/types/todoTypes'; 

// Main component for the Home page.
export default function Home() {
    const { data: todos, mutate } = useTodoList(); // Fetch the list of todos using the custom hook.
    const [searchTerm, setSearchTerm] = useState(''); // State to manage the search term entered by the user.

    // Filter the list of todos based on the search term.
    const filteredTodos: todoType[] = todos?.filter((todo: todoType) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) // Case-insensitive search within the todo title.
    ) || []; // If there are no todos, return an empty array.

    return (
        <main>
            <div className="container mx-auto p-4"> {/* Container for the page content with padding. */}
                {/* 
                Uncomment the AddTodo component to enable adding new todos.
                <AddTodo mutate={mutate} /> 
                */}
                <input
                    type="text"
                    placeholder="Search notes..." 
                    className="w-full p-2 my-4 rounded border" 
                    value={searchTerm} // Bind the search term state to the input value.
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <TodoList todos={filteredTodos} mutate={mutate} /> {/* Render the list of filtered todos. */}
            </div>
        </main>
    );
}

// export const getServerSideProps()