import React from 'react';

/**
 * Interface defining the props for the DeleteTodo component.
 */
interface DeleteTodoProps {
    /**
     * Function to be called when the delete button is clicked.
     */
    onDelete: () => void;
}

/**
 * A functional React component that renders a delete button.
 * When the button is clicked, the `onDelete` function is called.
 *
 * @param {DeleteTodoProps} props - The props for the component.
 * @returns {JSX.Element} The rendered delete button component.
 */
const DeleteTodo: React.FC<DeleteTodoProps> = ({ onDelete }: DeleteTodoProps): JSX.Element => {
    return (
        <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={onDelete}>
            Delete Note
        </button>
    );
};

export default DeleteTodo;
