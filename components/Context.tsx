import { createContext, useState } from 'react';

// Create a Context object to hold global state
export const ContextStates = createContext(null);

const Context = ({ children }: any) => {
    // Initialize the state with a modal object containing status and todoId properties
    const [state, setState] = useState({
        modal: {
            status: false, // Represents whether the modal is open or closed
            todoId: null,  // Holds the ID of the todo item associated with the modal
        },
    });

    return (
        // Provide the state and setState function to the rest of the app
        //@ts-ignore
        <ContextStates.Provider value={{ state, setState }}>
            {children} {/* Render any child components passed to this Context provider */}
        </ContextStates.Provider>
    );
};

export default Context;
