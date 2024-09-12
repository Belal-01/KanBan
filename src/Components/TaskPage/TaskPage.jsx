import React from 'react'
import  { useState } from 'react'
import './taskpage.css'
import { useStore } from '../../../store'
import { FaRegTrashAlt } from "react-icons/fa";


const TaskPage = ({id}) => {
  const task = useStore((store)=>store.Tasks.find((task)=>task.id===id))
  const deleteTask= useStore((store)=>store.delelteTask)
 
  return (
    <>
    <div className='task'>
      <div className="task-header">
        <div className="task-title">
          {task.title}
        </div>
        <div className="task-delete" onClick={()=>deleteTask(task.id)}>
          <FaRegTrashAlt/>
        </div>
      </div>
       <div className="modle-content-describtion">
              {task.describtion}
        </div>
        <hr />
        <div className="modle-content-date">
          {task.date.day} / {task.date.month} / {task.date.year}
        </div>

        

    </div>
     
      </>
  )
}

export default TaskPage
