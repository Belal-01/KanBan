import React from 'react'
import { useState } from 'react';
import { useStore } from '../../../store';
import classNames from 'class-names';
import {  NavLink, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import './ColumnPage.css'
import TaskPage from '../TaskPage/TaskPage';
import { FaArrowLeft } from "react-icons/fa6";

const ColumnPage = ({state}) => {
  const [openForm , setOpenForm] = useState(false);
  const [newTaskText,setNewTaskText] = useState('');
  const [newTaskdes,setNewTaskDes] = useState('');
  const navigate = useNavigate()

  const tasks = useStore((store)=> store.Tasks.filter((task)=>task.state===state))
  const addTask = useStore((store)=>store.addTask);



  const columnTasks = tasks.map((task)=>{return (<TaskPage id = {task.id} key={task.id}/>)})
  return (
    <>
    <span className="back-button" onClick={()=>navigate(-1)}><FaArrowLeft/></span>
    <div className="column-flex">
    <div className={classNames('columnPage')}
     >
      <div className="columnPage-state">
        <NavLink to={`/${state}`} >
        <span className={classNames('columnPage-state-title',state)}>{state}</span>
        </NavLink>
      </div>
      <div className="columnPage-tasks">
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
    </div>
    </>
  )
}

export default ColumnPage
