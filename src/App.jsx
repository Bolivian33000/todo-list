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
  const [urgentTodos, setUrgentTodos] = useState([]);



  // saves the current list of todos to localStorage.
  function persistTodoData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }));
  }

  // saves the current list of urgentTodos to localStorage.
  function persistUrgentTodoData(newList) {
    localStorage.setItem('urgentTodos', JSON.stringify({ urgentTodos: newList }));
  }

  // Function: Adds a new to-do item.
  function handleAddTodos(newTodoContent) {   
    const newTodo = { id: Date.now(), content: newTodoContent }; // new object with unique ID based on time since Unix Epoch (Jan. 1, 1970)
    const newTodoList = [...todos, newTodo]; // Creates a new list with the new todo appended.
    persistTodoData(newTodoList); // Saves the updated list to localStorage.
    setTodos(newTodoList); // Updates the todos state.
  }


  // first should have index be the input, and then check for matching id attributes within each object in the 
  // todos array


  function handleDeleteTodo(index) { 
    // handle delete todo by the id
    const deleteTodo = todos[index]  // stores the object at the given index in todos that we want to delete
    const newTodoList = todos.filter((todo) => todo.id !== deleteTodo.id); // filters such that todos without the current deleteTodo id are included (deleteTodo object is deleted)
    persistTodoData(newTodoList); // Saves the updated list to local storage.
    setTodos(newTodoList); // Updates the todos state.

    // delete the id from the urgentTodosList as well
    const newUrgentTodoList = urgentTodos.filter((urgentTodo) => urgentTodo.id !== deleteTodo.id)
    setUrgentTodos(newUrgentTodoList)
  }



    // Function: Edits a to-do item.
  function handleEditTodo(index) {
    // handle edit todo by the id
    const editTodo = todos[index] // stores the object at the given index in todos that we want to edit
    const valueToBeEdited = todos.find((todo) => todo.id === editTodo.id) // matches clicked todo to the existing todo with that id
    // console.log(valueToBeEdited.content)
    // console.log(valueToBeEdited.id)

    // if (!valueToBeEdited) return;

    setTodoValue(valueToBeEdited.content); // Sets the input field to the value to be edited.
    handleDeleteTodo(index); // Removes the current to-do so it can be edited and re-added.
  }



  function handleUrgentTodo(index) {
    const todoToToggle = todos[index]; 
    // if the urgentTodo to toggle exists, then filter the urgent todos list to have each urgent Todo not equal to this current todo
    if (urgentTodos.some((urgentTodo) => urgentTodo.id === todoToToggle.id)) {
        const newUrgentTodosList = urgentTodos.filter((urgentTodo) => urgentTodo.id !== todoToToggle.id);
        setUrgentTodos(newUrgentTodosList); 
        persistUrgentTodoData(newUrgentTodosList) // saves the new urgent Todos list to local storage

        console.log(urgentTodos)
      } else {
        setUrgentTodos([...urgentTodos, todoToToggle]); 
        persistUrgentTodoData([...urgentTodos, todoToToggle])

      }
    }

  
 // I found that both my edit todo and handle urgent todo buttons are not functioning properly. The add todo button is properly
 // populating the todos array

  // `useEffect`: Loads todos from localStorage on page load (empty dependency array).
  useEffect(() => {
    if (!localStorage) return; // If localStorage is unavailable, exit early.

    let localTodos = localStorage.getItem('todos');

    if (localTodos) {
      localTodos = JSON.parse(localTodos).todos; // Parse the stored JSON string to get the todos array.
      setTodos(localTodos); // Set `todos` to the stored list.
    }


    let localUrgentTodos = localStorage.getItem('urgentTodos');
    if (localUrgentTodos) {
      localUrgentTodos = JSON.parse(localUrgentTodos).urgentTodos; // Parse the stored JSON string to get the todos array.
      console.log(localUrgentTodos)
      setUrgentTodos(localUrgentTodos); // Set `todos` to the stored list.
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
        handleUrgentTodo={handleUrgentTodo}
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


// Learned something new: If switching between using objects or arrays as children in components, be sure to clear cached data (e.g., localStorage) to prevent data mismatches and rendering errors.




// next step -- I must make sure that the urgentTodos are stored to local storage so that the array is not cleared once refreshed