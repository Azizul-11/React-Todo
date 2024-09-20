import React, {useState} from 'react'
import "./App.css"
const App = () => {
  const [inputValue, setInputValue]=useState('');
  const [todos, setTodos]=useState([]);

  const [editMode, setEditMode]=useState(false);
  const [editId, setEditId]=useState(null);
  const [editValue, setEditValue]=useState('');

  const addTodo=()=>{
    if(inputValue.trim()!=='')
    {
      const newTodo={
        id: Date.now(),
        text: inputValue,
        completed: false,
      }
      setTodos([...todos, newTodo]);
    }
    setInputValue('');
  }

  const deleteTodo=(id)=>{
    const updatedTodos=todos.filter((todos)=> todos.id!==id);
    setTodos(updatedTodos);
  }

  const enterEdit=(id, text)=>{
    setEditMode(true);
    setEditId(id);
    setEditValue(text);
  }

  const updateTodo=()=>{
    const updatedTodos=todos.map((todos)=>{
      if(todos.id===editId)
      {
        return {...todos, text: editValue}
      }
      return todos;
    })
    setTodos(updatedTodos);
    setEditId(null);
    setEditMode(false);
    setEditValue('');
  }

  return (
    <div className='todo-container'>
      <h2>ToDo List</h2>
      <input type='text' 
        placeholder='Enter your task'
        className='input-field'
        onChange={(e)=> setInputValue(e.target.value)}
        value={inputValue}
        
      />
      {
        editMode ?(
          <div>
            <input
              type='text'
              className='input-field'
              onChange={(e)=> setEditValue(e.target.value)}
              value={editValue}
            />
            <button onClick={updateTodo}>Update</button>
          </div>
        ):
        (
          <button className='add-btn'
      onClick={addTodo}
      >Add</button>
        )
      }
      <ul>
        {todos.map((todos)=>(
          <li key={todos.id}>
            {todos.text}
          <button onClick={()=>deleteTodo(todos.id)}>Delete</button>
          <button onClick={()=>enterEdit(todos.id, todos.text)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App



