import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

// `useEffect`: React hook for running side effects (e.g., fetching data, interacting with localStorage).
// `TodoInput`: Component for entering new to-do items.
// `TodoList`: Component for displaying and managing the list of to-dos.


// Add state to add current todos
// Create the handleUrgentTodo in App.jsx
// pass the handleUrgentTodo as props to the TodoCard function
// on click, trigger the handleUrgentTodo function in the TodoCard component

function App() {
  // State:
  // - `todos`: Array of current to-do items.
  // - `setTodos`: Updates the `todos` state.
  // - `todoValue`: Holds the value currently being edited or typed into the input field.
  // - `setTodoValue`: Updates `todoValue`.
  const [todos, setTodos] = useState([]);  // This name is arbitrary -- stores 
  const [todoValue, setTodoValue] = useState('');
  const [urgentTodos, setUrgentTodos] = useState([])

  // Function: Saves the current list of todos to localStorage.
  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList })); // allows the current state of my todo list to be saved    
                                                                      // in the browser's local storage
  }

  // Function: Adds a new to-do item.
  function handleAddTodos(newTodo) {    
    const newTodoList = [...todos, newTodo]; // Creates a new list with the new todo appended.
    persistData(newTodoList); // Saves the updated list to localStorage.
    setTodos(newTodoList); // Updates the `todos` state.
  }

  // Function: Deletes a to-do item by its index.
  function handleDeleteTodo(index) { 
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index); // Filters out the to-do with the specified index.
                                            // _ signifies an unused variable
    persistData(newTodoList); // Saves the updated list to localStorage.
    setTodos(newTodoList); // Updates the `todos` state.
  }

  // Function: Edits a to-do item.
  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]; // receives the value of the todo from the todos array based on the current index
    setTodoValue(valueToBeEdited); // updates the todoValue state
    handleDeleteTodo(index); // Removes the current to-do so it can be edited and re-added.
  }

// Function: Label a to-do item as urgent.

// Function: Label a to-do item as urgent.

  function handleUrgentTodo(index) {

    if (urgentTodos.includes(index)) {
      const urgentTodoList = urgentTodos.filter((todoIndex) => todoIndex !== index);  // removes the urgent todo from the list if it is already included in the urgentTodosList
      setUrgentTodos(urgentTodoList); // updates the state to remove the current urgent todo


    } else {
      // else add the current index to the urgentTodos list
      setUrgentTodos([...urgentTodos, index])
    }
  }
    // if button is clicked, set the todo with that index equal to an urgentTodo. 
    // set all urgentTodo items to orange to show they are urgent.
    // send handleUrgentTodo down to the TodoCard componenet through props.


  // `useEffect`: Loads todos from localStorage on page load (empty dependency array).
  useEffect(() => {
    if (!localStorage) return; // If localStorage is unavailable, exit early.

    let localTodos = localStorage.getItem('todos');
    if (localTodos) {
      localTodos = JSON.parse(localTodos).todos; // Parse the stored JSON string to get the todos array.
      setTodos(localTodos); // Set `todos` to the stored list.
    }
  }, []); // Runs only once on page load due to the empty dependency array.

  return (
    <>
      {/* Passing props to child components:
          - `handleAddTodos`: Adds new to-do items.
          - `handleDeleteTodo`: Deletes to-do items.
          - `handleEditTodo`: Allows editing of to-do items.
          - `todos`: Current list of to-do items.
          - `todoValue` and `setTodoValue`: Manage the input field value for adding or editing todos. */}
      <TodoInput 
        todoValue={todoValue} 
        setTodoValue={setTodoValue} 
        handleAddTodos={handleAddTodos} 
      />
      <TodoList  // This is how we the TodoList from the App.jsx component to the TodoList component
        handleEditTodo={handleEditTodo} 
        handleDeleteTodo={handleDeleteTodo} 
        handleUrgentTodo={handleUrgentTodo}
        todos={todos} 
        urgentTodos={urgentTodos}
      />
    </>
  );
} 

export default App;

{/* Key Notes:
    - **React State**:
      - `useState` creates and manages dynamic variables (`todos`, `todoValue`) that trigger re-renders when updated.
    - **Props**:
      - Functions like `handleAddTodos`, `handleDeleteTodo`, and `handleEditTodo` are passed as props to child components to manage the to-do list.
    - **useEffect**:
      - Runs side effects, like interacting with localStorage, after a component renders or when specified dependencies change.
      - In this case, loads todos from localStorage when the page reloads (empty dependency array `[]` means it runs only once).
    - **LocalStorage**:
      - Used for persisting the to-do list so data isn't lost when the page reloads.
*/}
