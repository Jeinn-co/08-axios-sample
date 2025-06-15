import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: '30px',
    }}>
      <h2>Vite app </h2>
      <button>Button</button>
      <div>
        <a href="https://vitejs.dev" target="_blank">link </a>
      </div>
    </div>
  )
}

export default App
