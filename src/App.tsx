import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Tiptap from './Tiptap'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React with hot module in electron!</p>
        <Tiptap />
      </header>
    </div>
  )
}

export default App
