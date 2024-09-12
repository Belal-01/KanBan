import React ,{useEffect, useId, useState} from 'react'
import './column.css'
import Task from '../Task/Task'
import { useStore } from '../../../store'
import classNames from 'class-names'
import dayjs from 'dayjs'
import { NavLink } from 'react-router-dom'



const Column = ({state}) => {
  const [openForm , setOpenForm] = useState(false);
  const [newTaskText,setNewTaskText] = useState("");
  const [newTaskdes,setNewTaskDes] = useState("");
  const [drop,setDrop] = useState(false)

  const tasks = useStore((store)=> store.Tasks.filter((task)=>task.state===state))
  const addTask = useStore((store)=>store.addTask);
  const setDragTask = useStore((store)=>store.setDragTask)
  const dragTask = useStore((store)=>store.dragTask)
  const updateTask = useStore((store)=>store.updateTask)


 

  const columnTasks = tasks.map((task)=>{return (<Task id = {task.id} key={task.id}/>)})
  return (
    <div className={classNames('column',{drop:drop})}
     onDragOver={(e)=>{
      e.preventDefault()
      setDrop(true)}}
      onDragLeave={()=>setDrop(false)}
     onDrop={()=>{
      updateTask(dragTask,state)
      setDragTask(null);
      setDrop(false);
    }}>
      <div className="column-state">
        <NavLink to={`/${state}`} >
        <span className={classNames('column-state-title',state)}>{state}</span>
        </NavLink>
      </div>
      <div className="column-tasks">
        {columnTasks}
      </div>
     {openForm&&
     <form className='add-new-task-form' onSubmit={
      (e)=>{e.preventDefault();
        const id = `key-${Date.now()}-${Math.random()*100}`
        const today = dayjs();
        const day = today.format('D')
        const month = today.format('MM')
        const year = today.format('YYYY')
        const date ={day,month,year}
        addTask(newTaskText,newTaskdes,date,id);
        setOpenForm(prev=>!prev);
        setNewTaskText('');
        setNewTaskDes('');
     }} >
        <input type="text" 
        onChange={(e)=>setNewTaskText(e.target.value)} 
        value={newTaskText}
        placeholder='Task Title'
        required/>
        <textarea  
        required 
        placeholder='Describtion' 
        onChange={(e)=>setNewTaskDes(e.target.value)}
        value={newTaskdes}
        />
        <button type='submit'>Submit</button>
      </form>}
     {state ==="PLANING"&&<button className="add-new-task-btn" onClick={()=>setOpenForm(prev=>!prev)}>
        +New Task
      </button>}
      
    </div>
  )
}

export default Column
