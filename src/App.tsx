import React, { useEffect, useMemo, useState } from 'react'
import logo from './logo.svg'
import Tiptap from './Tiptap'

declare global {
  interface Window {
      app: AppBridge
  }
}
interface AppBridge   {
    getApiDetails: () => Promise<{
      port: number,
      signingKey: string
    }>,
    isDesktop: boolean
}

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
      window.app.getApiDetails().then(({port, signingKey}) => {
        console.log({port, signingKey})
      })
  }, []);

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
