import { useState } from "react";



{/* 
This component handles adding new to-do items.
- It allows the user to type into an input field.
- When the "Add" button is clicked, the new to-do is added to the list via the `handleAddTodos` function.
- The input field is cleared after submission.
*/}

export default function TodoInput(props) {
  const { handleAddTodos, todoValue, setTodoValue  } = props; 

  // Destructuring props:
  // - `handleAddTodos`: A function passed from the parent component (App) to handle adding new to-do items.


  // State:
  // - `todoValue`: Holds the current value of the input field.
  // - `setTodoValue`: Updates `todoValue` whenever the user types in the input field.
  // - `useState('')`: Initializes the input field as empty.

  return (
    <header>
      {/* Input Field */}
      <input 
        value={todoValue} 
        onChange={(e) => setTodoValue(e.target.value)} 
        placeholder="Enter todo..." 
      />
      {/* 
        - `value={todoValue}`: Makes the input a controlled component, tied to the `todoValue` state.
        - `onChange={(e) => setTodoValue(e.target.value)}`: 
            - Listens for user input.
            - `e.target.value`: The current value of the input field.
            - `setTodoValue`: Updates the `todoValue` state with the current input.
      */}

      {/* Add Button */}
      <button 
        onClick={() => {
          handleAddTodos(todoValue); // Calls the parent-provided function to add the new to-do.
          setTodoValue(''); // Clears the input field after submission.
        }}
      >
        Add
      </button>
    </header>
  );
}

{/* 
Notes:
- `useState` makes `todoValue` a stateful variable, meaning React tracks its changes and re-renders the component when it updates.
- The `onClick` function on the Add button:
  - Calls `handleAddTodos` with the current `todoValue` to add the new to-do.
  - Resets the `todoValue` state to an empty string to clear the input field.
- Controlled Components: The input field is controlled by React via the `value` and `onChange` props, ensuring the state and UI stay in sync.
- `export default`: Makes this component available for import in other files (e.g., App.jsx).
*/}

