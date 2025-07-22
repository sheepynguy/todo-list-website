import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Home from './Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/home' element={<Home />}/>
    </Routes>
  )
}

export default App
