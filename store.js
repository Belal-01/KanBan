import { produce } from "immer";
import { create } from "zustand";
import {devtools,persist} from 'zustand/middleware';



const store  = (set)=>({
  Tasks:[],
  dragTask:null,
  onGoingTasks:0,
  addTask:(title,describtion,date,id)=>{set(produce(store=>{store.Tasks.push({title,describtion,date,id,state:'PLANING'})})
  )},
  delelteTask:(id)=>set((store)=>{
    const newTasks = store.Tasks.filter((task)=>task.id!==id)
   return {Tasks:newTasks}}),
  updateTask:(id,state)=>set((store)=>{
    const newTasks = store.Tasks.map((task)=>task.id===id?{...task,state}:task)
   return ({Tasks:newTasks})}),
  editTask:(id,title,describtion)=>set((store)=>{
    const newTasks = store.Tasks.map((task)=>task.id===id?{...task,title,describtion}:task)
   return ({Tasks:newTasks})}),
  setDragTask:(id)=>set({dragTask:id}),


});



export const useStore = create(persist(devtools(store),{name:'store'}))

useStore.subscribe((newStore,prevStore)=>{
  if(newStore.Tasks!==prevStore.Tasks){ 
      useStore.setState({
        onGoingTasks:newStore.Tasks.filter((task)=>task.state==="ONGOING").length
      })
  
}
})

useStore.subscribe((dragTask)=>console.log(dragTask))