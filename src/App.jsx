import { useState } from 'react'
import './App.css'
import User from './User'
import Userform from './User/userform'

function App() {

  return (
    <div>
      <p className='text-center text-lg text-blue-900'>Welcome to Devstreak</p>
      <User />
    </div>
  )
}

export default App