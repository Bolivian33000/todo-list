import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

// `useEffect`: React hook for running side effects (e.g., fetching data, interacting with localStorage).
// `TodoInput`: Component for entering new to-do items.
// `TodoList`: Component for displaying and managing the list of to-dos.

function App() {
  // todos is an array of current to-do items.
  // setTodos updates the todos state.
  // todoValue holds the value currently being edited or typed into the input field
  // setTodoValue updates todoValue
  // urgentTodos is an array of todos marked as urgent
  // setUrgentTodos updates urgentTodos
  const [todos, setTodos] = useState([]); 
  const [todoValue, setTodoValue] = useState('');
  const [urgentTodos, setUrgentTodos] = useState([]);



  // saves the current list of todos to localStorage
  function persistTodoData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }));
  }

  // saves the current list of urgentTodos to localStorage
  function persistUrgentTodoData(newList) {
    localStorage.setItem('urgentTodos', JSON.stringify({ urgentTodos: newList }));
  }

  // adds a new to-do object with id: time since unix epoch, content: entered content by user in the input field
  function handleAddTodos(newTodoContent) {   
    const newTodo = { id: Date.now(), content: newTodoContent }; // new object with unique ID based on time since Unix Epoch (Jan. 1, 1970)
    const newTodoList = [...todos, newTodo]; // creates a new list with the new todo appended.
    persistTodoData(newTodoList); // Saves the updated list to localStorage.
    setTodos(newTodoList); // Updates the todos state.
  }


  // state updates are asynchronous

  // deletes todo items
  function handleDeleteTodo(index) { 
    // handle delete todo by the id
    const deleteTodo = todos[index]  // stores the object at the given index in todos that we want to delete
    const newTodoList = todos.filter((todo) => todo.id !== deleteTodo.id); // filters such that todos without the current deleteTodo id are included (i.e. deleteTodo object is deleted)
    persistTodoData(newTodoList); // saves the updated list to local storage
    setTodos(newTodoList); // updates the todos state


    
    const newUrgentTodoList = urgentTodos.filter((urgentTodo) => urgentTodo.id !== deleteTodo.id) // deletes id from the urgentTodosList as well
    setUrgentTodos(newUrgentTodoList)
  }



    // edits a to-do item.
  function handleEditTodo(index) {
    // handle edit todo by the id
    const editTodo = todos[index] // stores the object at the given index in todos that we want to edit
    const valueToBeEdited = todos.find((todo) => todo.id === editTodo.id) // matches clicked todo to the existing todo with given id
    // console.log(valueToBeEdited.content)
    // console.log(valueToBeEdited.id)

    setTodoValue(valueToBeEdited.content); // sets the input field to the value to be edited
    handleDeleteTodo(index); // removes the current to-do so it can be edited and re-added
  }



  // marks todos as urgent (by changing background color of todocards to orange)
  function handleUrgentTodo(index) {
    const todoToToggle = todos[index]; 
    // if the urgentTodo to toggle exists, then filter the urgent todos list to have each urgent Todo not equal to this current todo (deletes the current urgent todo from urgentTodo list)
    if (urgentTodos.some((urgentTodo) => urgentTodo.id === todoToToggle.id)) {
        const newUrgentTodosList = urgentTodos.filter((urgentTodo) => urgentTodo.id !== todoToToggle.id);
        setUrgentTodos(newUrgentTodosList); 
        persistUrgentTodoData(newUrgentTodosList) // saves the new urgent Todos list to local storage

        console.log(urgentTodos)
      } else {
        // adds untoggled todo object to urgent todos array
        setUrgentTodos([...urgentTodos, todoToToggle]); 
        persistUrgentTodoData([...urgentTodos, todoToToggle])

      }
    }

  

  // useEffect loads todos from localStorage on page load (b/c there is an empty dependency array).
  useEffect(() => {
    if (!localStorage) return; // if localStorage is unavailable, exit early. This could happen if user disables cookies or storage, among other things

    let localTodos = localStorage.getItem('todos');

    if (localTodos) {
      localTodos = JSON.parse(localTodos).todos; // Parse the stored JSON string to get the todos array.
      setTodos(localTodos); // Set `todos` to the stored list.
    }


    let localUrgentTodos = localStorage.getItem('urgentTodos');
    if (localUrgentTodos) {
      localUrgentTodos = JSON.parse(localUrgentTodos).urgentTodos; // Parse the stored JSON string to get the todos array.
      console.log(localUrgentTodos)
      setUrgentTodos(localUrgentTodos); // set todos to the stored list.
    }
  }, []); // runs only once on page load b/c we have the second parameter as an empty dependency array.

  return (
    <>
      {/* props to make a note of: 
          - handleAddTodos adds new to-do items.
          - handleDeleteTodo deletes to-do items.
          - handleEditTodo allows editing of to-do items.
          - todos is a current list of to-do objects.
          - urgentTodos is a current list of urgent todo objects
          - todoValue and setTodoValue manage the input field value for adding or editing todos. */}
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



// Great!! Now the urgentTodo functions is functional. Next time, read some artciles on synchronous vs asynchrnous updates, and
// potentially add some styling and upload updates to GitHub!