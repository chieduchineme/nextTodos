// components/EditTodo/index.tsx
import React from 'react';
import { todoType } from '@/interfaces/types/todoTypes';
import { useEditTodo } from '../hooks/useEditTodo';

const EditTodo: React.FC<{ todo: todoType }> = ({ todo }) => {
    const {
        title,
        setTitle,
        content,
        setContent,
        handleSave,
        handleDelete,
        handleBack,
    } = useEditTodo(todo);

    return (
        <div>
            <h1 className="text-4xl font-bold">Edit Note</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="border rounded py-2 px-4 w-full"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Note Content"
                className="border rounded py-2 px-4 mt-2 w-full h-64"
            />
            <div className="flex justify-between mt-4">
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                    <em className="bi bi-save-fill mr-1"></em> Save Note
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg"
                >
                    <em className="bi bi-trash-fill mr-1"></em> Delete Note
                </button>
                <button
                    onClick={handleBack}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                    <em className="bi bi-arrow-left-circle-fill mr-1"></em> Back
                </button>
            </div>
        </div>
    );
};

export default EditTodo;
