import React from 'react';

{/* 
This component is responsible for rendering individual to-do items (as list elements).
Each `TodoCard`:
- Receives its content (`children`) and the delete/edit functionality through props.
- Displays action buttons (Edit and Delete) for user interaction.
- Calls the provided `handleDeleteTodo` function when the delete button is clicked.
*/}

export default function TodoCard(props) {
  const { children, handleDeleteTodo, index, handleEditTodo, handleUrgentTodo, isUrgent } = props; 
  // Destructure props:
  // - `children`: The content (text) of the to-do item, passed from TodoList.
  // - `handleDeleteTodo`: A function to delete a to-do item, passed from the parent component (App).
  // - `index`: The position of this to-do item in the list, needed for deletion.

  return (
    <li className={`todoItem ${isUrgent ? "urgent" : ""}`} > {/* className in JavaScript world -- adding conditional className "urgent" depending on the boolean value of isUrgent}
      {/* Render the to-do text */}
      {children}

      <div className="actionsContainer">
        {/* Edit Button */}
        <button onClick = {() =>  
            handleEditTodo(index)
        }>
          <i className="fa-solid fa-pen-to-square"></i> {/* FontAwesome edit icon */}
        </button>

        {/* Delete Button */}
        <button 
          onClick={() => handleDeleteTodo(index)}
          // When clicked, calls `handleDeleteTodo` with the current to-do's index to remove it from the list.
        >
          <i className="fa-solid fa-trash"></i> {/* FontAwesome delete icon */}
        </button>

        <button 
          onClick={() => handleUrgentTodo(index)}
              // When clicked, this calls the handleUrgentTodofunction
        >
          <i className="fa-solid fa-circle-exclamation"></i>

        </button>


      </div>
    </li>
  );
}



{/* Notes:
- `children` allows `TodoCard` to be reusable for any content passed between its opening and closing tags in JSX.
- Props are used to pass data (like `index`) and functions (like `handleDeleteTodo`) from the parent component.
- Actions (Edit/Delete) are currently set up, but only Delete has functionality in this example.
*/}




// Note: Must conditionally change the color in the TodoCard later

// Later, add a condition which changes the styling of the todo button if urgent or not urgent