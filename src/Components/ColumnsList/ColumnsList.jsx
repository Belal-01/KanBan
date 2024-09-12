import React from 'react'
import './ColumnsList.css'
import Column from '../Column/Column'

const ColumnsList = () => {
  return (
    <div className='columns'>
    <Column state = {'PLANING'}/>
    <Column state = {'ONGOING'}/>
    <Column state = {'DONE'}/>
  </div>
  )
}

export default ColumnsList
