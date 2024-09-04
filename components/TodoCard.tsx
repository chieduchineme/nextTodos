import React from 'react';
import { useRouter } from 'next/router';
import { userType } from '@/interfaces/types/usertypes';
import { todoVersionType } from '@/interfaces/types/todoTypes';

// Define the props interface for TodoCard, specifying the expected structure of the 'todo' object
interface TodoCardProps {
    todo: {
        id: string;
        title: string;
        content: string;
        versions: todoVersionType[];
        createdAt: Date;            
        updatedAt: Date;            
        userId: string;             
        user: userType;             
    }
}

// Functional component for rendering a todo card
const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
    const router = useRouter(); // Next.js router for handling navigation

    // Check if the title is valid
    if (!todo.title || todo.title.trim() === '') {
        return null; // Return null if the title is null, undefined, or an empty string
    }

    return (
        <div
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
            // Handle click event to navigate to the detailed page of the todo
            onClick={() => router.push(`/todos/${todo.id}`)}
        >
            <h2 className="text-xl font-semibold mb-2">
                TITLE : {todo.title} {/* Display the title of the todo */}
            </h2>
            <p className="text-white-700 font-semibold mt-6 mb-12">
                Content : {todo.content} {/* Display the content/description of the todo */}
            </p>
            <p className="text-sm text-black-500">
                Last updated: {new Date(todo.updatedAt).toLocaleDateString()} {/* Display the last updated date of the todo */}
            </p>
        </div>
    );
};

export default TodoCard;
