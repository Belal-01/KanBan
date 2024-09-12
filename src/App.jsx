import React from 'react'
import './App.css'
import ColumnsList from './Components/ColumnsList/ColumnsList'
import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import ColumnPage from './Components/ColumnPage/ColumnPage'





const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ColumnsList />}/>
        <Route path='/PLANING' element={<ColumnPage state={'PLANING'}/>}/>
        <Route path='/ONGOING' element={<ColumnPage state={'ONGOING'}/>}/>
        <Route path='/DONE' element={<ColumnPage state={'DONE'}/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
