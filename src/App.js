import React from 'react';
import './App.css';
import {useState} from 'react';

function App() {

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayNumber = new Date().getDay();
  const currentDayName = dayNames[currentDayNumber];

  const[toDo,setToDo] = useState("");
  const[toDos,setToDos] = useState([]);

  const handleChange = (e) => {
      setToDo(e.target.value);
  }

  const addToDo = (toDo) => {

    const isDuplicate = toDos.some((item) => item.text === toDo);

    if(toDo === "" || isDuplicate){
      setToDo('')
      return
    }
    setToDos([...toDos,{id:Date.now(),text:toDo,status:false}])
    setToDo('')
  }

  const onDelete = (id) => {
    setToDos(toDos.filter((toDo)=>toDo.id!==id))
  }

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDayName} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input type="text" placeholder="🖊️ Add item..." onChange={handleChange} value={toDo}/>
        <i className="fas fa-plus" onClick={()=>addToDo(toDo)}></i>
      </div>
      <div className="todos">
        {
          toDos.map((toDo,index)=>{
            return(
              <div className="todo" key={index}>
                <div className="left">
                  <input value={toDo.status} type="checkbox" name="" id="" onChange={(e)=>{
                    setToDos(toDos.filter((obj)=>{
                      if(obj.id===toDo.id){
                        toDo.status=e.target.checked;
                      }
                      return obj;
                    }))
                  }}/>
                  <p style={{ textDecoration: toDo.status ? 'line-through' : null }}>{toDo.text}</p>
                </div>
                <div className="right">
                  <i className="fas fa-times" onClick={()=>onDelete(toDo.id)}></i>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;