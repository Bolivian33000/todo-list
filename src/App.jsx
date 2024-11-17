import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

// `useEffect`: React hook for running side effects (e.g., fetching data, interacting with localStorage).
// `TodoInput`: Component for entering new to-do items.
// `TodoList`: Component for displaying and managing the list of to-dos.

function App() {
  // State:
  // - `todos`: Array of current to-do items.
  // - `setTodos`: Updates the `todos` state.
  // - `todoValue`: Holds the value currently being edited or typed into the input field.
  // - `setTodoValue`: Updates `todoValue`.
  const [todos, setTodos] = useState([]); 
  const [todoValue, setTodoValue] = useState('');

  // Function: Saves the current list of todos to localStorage.
  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }));
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
    persistData(newTodoList); // Saves the updated list to localStorage.
    setTodos(newTodoList); // Updates the `todos` state.
  }

  // Function: Edits a to-do item.
  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]; // Gets the value of the to-do being edited.
    setTodoValue(valueToBeEdited); // Sets `todoValue` to the value being edited.
    handleDeleteTodo(index); // Removes the current to-do so it can be edited and re-added.
  }

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
      <TodoList 
        handleEditTodo={handleEditTodo} 
        handleDeleteTodo={handleDeleteTodo} 
        todos={todos} 
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
