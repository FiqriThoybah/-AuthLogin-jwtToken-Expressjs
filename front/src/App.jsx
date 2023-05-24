import React from 'react'
import Login from './Login'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App