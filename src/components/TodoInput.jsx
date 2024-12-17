import { useState } from "react";



{/* 
This component handles adding new to-do items.
- It allows the user to type into an input field.
- When the "Add" button is clicked, the new to-do is added to the list via the `handleAddTodos` function.
- The input field is cleared after submission.
*/}

export default function TodoInput(props) {
  const { handleAddTodos, todoValue, setTodoValue  } = props; 
  // destructuring props for use in this component

  // todoValue holds the current value of the input field
  // setTodoValue updates todoValue whenever the user types in the input field
  // useState('') initializes the input field as empty

  return (
    <header>
      {/* Input field */}
      <input 
        value={todoValue} 
        onChange={(e) => setTodoValue(e.target.value)}  // e.target.value is the current value of the input field
                                                        // e means "event" -- listens for user input
                                                        // setTodoValue updates todoValue state with current input

        placeholder="Enter todo..." 
      />

      {/* Add button */}
      <button 
        onClick={() => {
          handleAddTodos(todoValue); // calls handleAddTodos from App
          setTodoValue(''); // when todo is added using todoValue, updates todoValue state with empty string
        }}
      >
        Add
      </button>
    </header>
  );
}

ç