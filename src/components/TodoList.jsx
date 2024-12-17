// The ES7+ React/Redux/React-Native extension allows us to use "rfc" to create a React functional component

import React from 'react';
import TodoCard from './TodoCard.jsx';

{/* 
This component is responsible for rendering the entire list of to-do items.
- it receives the todos array and other attributes (like handleDeleteTodo) as props from the parent component (App.jsx).
- it maps over the todos array to render a TodoCard component for each to-do item.
*/}

export default function TodoList(props) {
  const { todos, urgentTodos } = props;     // destructure todos and urgentTodos from props, since we are using them directly in this component

  console.log(todos);
  console.log(urgentTodos); // console logs to check if each array is populated correctly

  

  return (
    <ul className="main">
      {todos.map((todo, todoIndex) => { // maps over the todos array.
                                        // the first parameter (todo) represents the current to-do object, while the second parameter (todoIndex) 
                                        // represents the index of that to-do object in the array.

        // for each todo in the array, we render a TodoCard component
        return (

          <TodoCard 
                {...props}      // passes all props received by TodoList down to the TodoCard component. This includes both values (like todos) and functions (like handleEditTodo and handleDeleteTodo)
            key={todoIndex}      // react requires a unique key for each list item
            index={todoIndex}    // pass the index as a prop for input in each of our functions
            isUrgent={urgentTodos.some((urgentTodo) => urgentTodo.id === todo.id)} // checks if the id of the current todo exists in the urgentTodos array
                                 // "some" returns true if there is at least one item for which this condition is true
            >
            <p>{todo.content}</p>         {/* renders the todo text as a child inside TodoCard (rendered using "children" in TodoCard) */}
          </TodoCard>
        );
      })}
    </ul>
  );
}

