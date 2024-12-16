// The ES7+ React/Redux/React-Native extension allows us to use `rfc` to quickly create a React functional component.

import React from 'react';
import TodoCard from './TodoCard.jsx';

{/* 
This component is responsible for rendering the entire list of to-do items.
- It receives the `todos` array and other attributes (like `handleDeleteTodo`) as props from the parent component (App).
- It maps over the `todos` array to render a `TodoCard` component for each to-do item.
*/}

export default function TodoList(props) {
  const { todos, urgentTodos } = props; 
  // Destructure `todos` from props:
  // - `todos`: An array of to-do items passed from the App component.
  console.log(todos);
  console.log(urgentTodos); // console logs to check if each array is populated correctly

  

  return (
    <ul className="main">
      {todos.map((todo, todoIndex) => { // maps todo value (the object itself) and the todoIndex to each todo

        // For each `todo` in the array, render a `TodoCard` component.
        // Spread the `props` to pass all attributes down to `TodoCard` (e.g., `handleDeleteTodo`).
        return (

          <TodoCard 
                {...props}      // Pass all props down to TodoCard.
            key={todoIndex}      // React requires a unique key for each list item.
            index={todoIndex}    // Pass the index as a prop for delete functionality.
            isUrgent={urgentTodos.some((urgentTodo) => urgentTodo.id === todo.id)} // checks if the id of the current todo exists in the urgentTodos array
            >
            <p>{todo.content}</p>         {/* Render the todo text as a child inside TodoCard. */}
          </TodoCard>
        );
      })}
    </ul>
  );
}

{/* 
Key Concepts:
1. **Mapping Over `todos`**:
   - `todos.map` iterates over each to-do item in the array.
   - It generates a `TodoCard` component for every item, dynamically rendering the list.

2. **Props Flow**:
   - The `...props` syntax spreads all the properties from `props` into `TodoCard`.
   - This allows attributes like `handleDeleteTodo` to be passed directly to `TodoCard` without manually destructuring them here.

3. **Unique Keys**:
   - Each `TodoCard` is assigned a unique `key` using `todoIndex`.
   - React uses these keys to efficiently track and update list items during re-renders.

4. **Child Components**:
   - The `<p>{todo}</p>` is passed as a child to `TodoCard` and can be rendered using `children` in the `TodoCard` component.

5. **Communication Flow**:
   - In React, data flows in a unidirectional (top-down) manner. The parent component (App) passes data (via props) to child components (`TodoList`, then `TodoCard`).

6. **`className`**:
   - The unordered list (`<ul>`) is assigned a class of "main". In React, `className` is used instead of `class` for styling.
*/}