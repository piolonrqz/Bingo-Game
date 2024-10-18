import { useState } from 'react'
import BingoApp from './BingoApp'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <BingoApp/>
    </div>
    </>
  )
}

export default App
