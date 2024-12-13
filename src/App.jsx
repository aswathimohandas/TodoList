import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Home'
import Landing from './Landing'
import './App.css'
import './bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
 

  return (
    <>
      
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
