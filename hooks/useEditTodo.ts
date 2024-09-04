// components/EditTodo/functions.ts
import { useRouter } from 'next/router';
import { todoType } from '@/interfaces/types/todoTypes';
import { useState } from 'react';

export const useEditTodo = (todo: todoType) => {
    const router = useRouter();
    const [title, setTitle] = useState(todo?.title || '');
    const [content, setContent] = useState(todo?.content || '');
    const [isBackTriggered, setIsBackTriggered] = useState(false);

    const handleSave = async () => {
        if (!isBackTriggered && (title.trim() === '' || content.trim().length < 5)) {
            alert('Title cannot be empty and content must have at least 5 characters.');
            return;
        }

        const response = await fetch(`/api/todos?todoId=${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
            router.push('/');
        } else {
            console.error('Failed to save note');
        }
    };

    const handleDelete = async () => {
        const response = await fetch(`/api/todos?todoId=${todo.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            router.push('/');
        } else {
            console.error('Failed to delete note');
        }
    };

    const handleBack = async () => {
        setIsBackTriggered(true);

        const response = await fetch(`/api/todos?todoId=${todo.id}`);
        if (!response.ok) {
            console.error('Failed to fetch todo');
            router.push('/');
            return;
        }
        
        const latestTodo = await response.json();
        const latestVersionNumber = (Array.isArray(latestTodo.versions) ? latestTodo.versions.length : 0);
        console.log(latestVersionNumber);
        if (latestVersionNumber === 1 || latestVersionNumber === 0) {
            await handleDelete();
        } else {
            router.push('/');
        }
    };

    return {
        title,
        setTitle,
        content,
        setContent,
        handleSave,
        handleDelete,
        handleBack,
    };
};
