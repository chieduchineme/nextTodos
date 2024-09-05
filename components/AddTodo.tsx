// components/AddTodo.tsx

import React from 'react';
import { useRouter } from 'next/router';

interface AddTodoProps {
    mutate: () => void; // Function to trigger a re-fetch of the todo list
}

/**
 * AddTodo Component
 * 
 * This component renders a button that allows users to create a new note. When the button
 * is clicked, a POST request is made to the `/api/todos` endpoint to create a new todo item.
 * If the request is successful, the user is redirected to the page for the newly created note.
 * 
 * @returns JSX.Element
 */

// import { generateObjectId } from '@/utils/generateObjectId'; // Import the utility
// const todoId = generateObjectId(); // Generate a fake ObjectId

const AddTodo: React.FC<AddTodoProps> = ({ mutate }) => {
    const router = useRouter();

    /**
     * Handles the addition of a new note.
     * 
     * This function sends a POST request to the `/api/todos` endpoint to create a new todo item.
     * If the request is successful, it retrieves the `todoId` from the response and redirects the user
     * to the page displaying the newly created note.
     */
    const handleAdd = async () => {
        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const { todoId } = await response.json();
                // Redirect to the new todo's page
                router.push(`/todos/${todoId}`);
                // Optionally, trigger a re-fetch of the todo list
                mutate();
            } else {
                console.error('Failed to create a new note');
            }
        } catch (error) {
            console.error('Error while adding a new note:', error);
        }
    };

    return (
        <button
            onClick={handleAdd}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
            <em className="bi bi-plus-circle-fill mr-1"></em> Add New Note
        </button>
    );
};

export default AddTodo;
