import React, { useState } from 'react'
import logo from './logo.svg'
import Tiptap from './Tiptap'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div className="title-drag-zone" />
      <div className="items-top mt-20 justify-center flex h-screen overflow-auto w-screen">
        <div>
          <Tiptap />
        </div>
      </div>
    </div>
  )
}

export default App
