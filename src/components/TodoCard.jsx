import React from 'react';

{/* 
This component is responsible for rendering individual to-do items (as list elements).
Each TodoCard:
- Receives its content (children) and the delete/edit functions through props.
- Displays action buttons (Edit and Delete) for user experience.
- Calls the handleDeleteTodo function when the delete button is clicked.
*/}

export default function TodoCard(props) {
  const { children, handleDeleteTodo, index, handleEditTodo, handleUrgentTodo, isUrgent } = props; 
  // destructuring props for use in our component
  // note: "children" is the content (text) of the to-do item passed from TodoList.


  return (
    <li className={`todoItem ${isUrgent ? "urgent" : ""}`} > {/* className in JavaScript world -- adding conditional className "urgent" depending on the boolean value of isUrgent}
      {/* renders the to-do text using children*/}
      {children}

      <div className="actionsContainer">
        {/* Edit buttons */}
        <button onClick = {() => handleEditTodo(index)}
          
          >
          <i className="fa-solid fa-pen-to-square"></i> {/* FontAwesome edit icon */}
        </button>

        {/* Delete buttons */}
        <button 
          onClick={() => handleDeleteTodo(index)}
          // When clicked, calls handleDeleteTodo with the current to-do's index to remove it from that array
        >
          <i className="fa-solid fa-trash"></i> {/* FontAwesome delete icon */}
        </button>

        <button 
          onClick={() => handleUrgentTodo(index)}
              // When clicked, this calls the handleUrgentTodofunction with the current urgent todo's index to remove it from that array
        >
          <i className="fa-solid fa-circle-exclamation"></i>

        </button>


      </div>
    </li>
  );
}



