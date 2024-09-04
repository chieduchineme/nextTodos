import React, { useState } from 'react';
import AddTodo from './AddTodo';
import TodoCard from './TodoCard';
import { todoType } from '@/interfaces/types/todoTypes';
import useTodoList from '@/hooks/useTodoList';

interface TodoListProps {
    todos: todoType[];   // Array of todos to be displayed
    mutate: () => void;  // Function to trigger a re-fetch of the todo list
}

const TodoList: React.FC<TodoListProps> = ({ todos, mutate }) => {
    const [filterType, setFilterType] = useState(''); // State to manage selected filter type
    const [startDate, setStartDate] = useState('');  // State to manage start date for custom date range filter
    const [endDate, setEndDate] = useState('');      // State to manage end date for custom date range filter

    // Hook to fetch filtered todos based on the selected filter type and date range
    const { data: filteredTodos, mutate: refetchTodos } = useTodoList(filterType, startDate, endDate);

    // Handler to update filter type and refetch todos based on the new filter
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterType(e.target.value);
        refetchTodos(); // Refetch todos when filter type changes
    };

    // Handler to update date range and refetch todos based on the new date range
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
        if (type === 'start') setStartDate(e.target.value);
        if (type === 'end') setEndDate(e.target.value);
        refetchTodos(); // Refetch todos when date range changes
    };

    return (
        <div>
            {/* Header section with title and option to add a new todo */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">My Notes</h1>
                <AddTodo mutate={mutate} /> {/* AddTodo component to add new todos */}
            </div>
            
            {/* Filter section to filter todos by time range */}
            <div className="flex mb-4">
                <select onChange={handleFilterChange} value={filterType}>
                    <option value="">All</option>
                    <option value="24hours">Last 24 hours</option>
                    <option value="7days">Last 7 days</option>
                    <option value="custom">Custom Date Range</option>
                </select>

                {/* If custom date range is selected, display date pickers */}
                {filterType === 'custom' && (
                    <div className="ml-4">
                        <input
                            type="date"
                            onChange={(e) => handleDateChange(e, 'start')}
                            value={startDate}
                            className="border rounded py-2 px-4"
                        />
                        <input
                            type="date"
                            onChange={(e) => handleDateChange(e, 'end')}
                            value={endDate}
                            className="border rounded py-2 px-4 ml-2"
                        />
                    </div>
                )}
            </div>

            {/* Conditionally render the list of filtered todos or display a loading message */}
            {filteredTodos ? (
                filteredTodos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTodos.map((todo: todoType) => (
                            <TodoCard key={todo.id} todo={todo} /> // Render each todo item
                        ))}
                    </div>
                ) : (
                    <div>No notes available</div> // Message if no todos match the filter criteria
                )
            ) : (
                <div>Loading...</div> // Loading state while fetching todos
            )}
        </div>
    );
};

export default TodoList;