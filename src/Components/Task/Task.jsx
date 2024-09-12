import React, { memo, useState } from 'react'
import './task.css'
import { useStore } from '../../../store'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import classNames from 'class-names';

const Task = ({id}) => {
  const [modle ,setModle] = useState(false);
  const [edit,setEdit] = useState(false);
  const [saveChanges,setSaveChanges ] = useState(false);
  const task = useStore((store)=>store.Tasks.find((task)=>task.id===id))
  const [taskTitle,setTaskTitle] = useState(task.title);
  const [taskInfo ,setTaskInfo] = useState(task.describtion);
  const deleteTask= useStore((store)=>store.delelteTask)
  const updateTask = useStore((store)=>store.updateTask)
  const setDragTask = useStore((store)=>store.setDragTask)
  const editTask = useStore((state)=>state.editTask)
  const toggleEdit = ()=>{
    setEdit(prev=>!prev)
    setSaveChanges(false);
  }
  const toggleChangesModle = ()=>{
    setSaveChanges(false)
    setModle(false)
  }
  const toggleModle = ()=>{
    if(modle&&edit){
      setSaveChanges(true)
    }
    if(!edit)
     setModle(prev=>!prev);
  }
  return (
    <>
    <div className='task' draggable onDragStart={()=>setDragTask(id)} onDragEnd={()=>setDragTask(null)}>
      <div className="task-header">
        <div className="task-title">
          {task.title}
        </div>
        <div className="task-delete" 
        onClick={()=>{
          deleteTask(task.id);
          
        }}>
          <FaRegTrashAlt/>
        </div>
      </div>

      <div className="task-buttons">
        {task.state!=="PLANING"&&<button 
        className='left-button'
        onClick={()=>{
          task.state==="DONE"&&updateTask(task.id,'ONGOING')
          task.state==="ONGOING"&&updateTask(task.id,'PLANING')
        }}> <FaArrowAltCircleLeft/></button>}

        {task.state!=="DONE"&&<button
        className='right-button'
         onClick={()=>{
          task.state==="PLANING"&&updateTask(task.id,'ONGOING')
          task.state==="ONGOING"&&updateTask(task.id,'DONE')

        }}
          ><FaArrowAltCircleRight/></button>}
      </div>
       <button onClick={toggleModle} className='showModle-btn'>Show more</button>  

    </div>
       {
        modle&&<div className="task-modle">
          <div className="overly" onClick={toggleModle}></div>
          <div className="modle-content">
            <div className="modle-content-header">
            <div className={classNames("modle-content-header-title",{editable:edit})} contentEditable={edit} 
            onInput={(e)=>{setTaskTitle(e.target.innerHTML)}}>
                {task.title}
            </div>
            <div className="modle-content-header-close">
               <button onClick={toggleModle}><IoMdCloseCircleOutline/></button> 
            </div>
            </div>
            <div className={classNames("modle-content-describtion",{editable:edit})} contentEditable={edit}
              onInput={(e)=>{setTaskInfo(e.target.innerHTML)}}>
              {task.describtion}
            </div>
            <hr />
            <div className="modle-content-footer">
            <div className="modle-content-date">
              {task.date.day} / {task.date.month} / {task.date.year}
            </div>
            <div className="edit-task" onClick={()=>{
              if(edit)
                editTask(id,taskTitle,taskInfo)
              toggleEdit()}}>
             {edit?'Save':'Edit'} 
            </div>
            </div>
           
          </div>
        </div>
      }
      {
        <div className={classNames("confirm-changes-alert",{showAlert:saveChanges})}>
          <div className="confirm-changes-title">Warning</div>
          <hr />
          <div className="confirm-changes-describtion">Whould you like to save the Changes?</div>
          <div className="confirm-changes-buttons">
            <button className="save"
             onClick={()=>{
               toggleEdit()
               toggleChangesModle()

               editTask(id,taskTitle,taskInfo)
            }}>Save</button>
            <button className="discard"
             onClick={()=>{
              toggleEdit()
              toggleChangesModle()
              }}>Discard</button>
          </div>
        </div>
      }
      </>

  )
}

export default memo(Task) 
