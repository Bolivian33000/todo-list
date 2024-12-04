import React from 'react';

{/* 
This component is responsible for rendering individual to-do items (as list elements).
Each `TodoCard`:
- Receives its content (`children`) and the delete/edit functionality through props.
- Displays action buttons (Edit and Delete) for user interaction.
- Calls the provided `handleDeleteTodo` function when the delete button is clicked.
*/}

// Create the handleUrgentTodo in App.jsx
// pass the handleUrgentTodo as props to the TodoCard function
// on click, trigger the handleUrgentTodo function in the TodoCard component


export default function TodoCard(props) {
  const { children, handleDeleteTodo, index, handleEditTodo, handleUrgentTodo = [] } = props;  // destructure out handleUrgentTodo in the props a bit

  // Destructure props:
  // - `children`: The content (text) of the to-do item, passed from TodoList.
  // - `handleDeleteTodo`: A function to delete a to-do item, passed from the parent component (App).
  // - `index`: The position of this to-do item in the list, needed for deletion.

  return (
    <li className={`todoItem ${isUrgent ? "urgent": ""}`}>
      {/* Render the to-do text */}
      {children}

      <div className="actionsContainer">
        {/* Edit Button */}
        <button onClick = {() => { 
            handleEditTodo(index)
        }}>
          <i className="fa-solid fa-pen-to-square"></i> {/* FontAwesome edit icon */}
        </button>

        {/* Delete Button */}
        <button 
          onClick={() => handleDeleteTodo(index)}
          // When clicked, calls `handleDeleteTodo` with the current to-do's index to remove it from the list.
        >
          <i className="fa-solid fa-trash"></i> {/* FontAwesome delete icon */}
        </button>
        
        {/* Label as Urgent Button */}
        <button 
           onClick={() => handleUrgentTodo(index)}
           // onClick={() => handleUrgentTodo(index)}  // Need the handleUrgentTodo function to be created in our App.jsx component
          // What I would like to do is, on the click, increase the size of the button, along with moving this todo item to the top
        >
          
          {isUrgent ? "Unmark Urgent" : "Mark as Urgent"} {/* if isUrgent is true: Display "Unmark Urgent"; if false, display "Mark as Urgent" */}

          <i className="fa-solid fa-circle-exclamation"></i> {/* FontAwesome exclamation icon */}
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