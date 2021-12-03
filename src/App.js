import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
    const firstRender = useRef(true);
    const [inputValue, setInputValue] = useState('');
    const [todoList, setTodoList] = useState([]);

    const addTodo  = (e) => {
        e.preventDefault();
      if(inputValue.trim() === '') return;

      setTodoList([...todoList, {
        text: inputValue,
        id: uuidv4()
      }])

      setInputValue('')
    };

    const removeTodo = (id) => {
      setTodoList(todoList.filter(todo => todo.id !== id))
    };

    useEffect(() =>{
       if(firstRender.current) {
         firstRender.current = false;
       } else {
        localStorage.setItem("todoList", JSON.stringify([...todoList]))
       }
    },[todoList] );

    useEffect(() => {
      if(localStorage.getItem("todoList") !== null) {
        const newTodoList = localStorage.getItem("todoList");
        setTodoList(JSON.parse([...todoList, newTodoList]));
      }
    }, []);

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={addTodo}>
          <input type="text" 
            placeholder="Add a task..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        {todoList.map(todo => (
          <div key={todo.id} className="todo">
            <p>{todo.text}</p>
            <i onClick={ () => removeTodo(todo.id) } className="far fa-trash-alt"></i>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default App;
