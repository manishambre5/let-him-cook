import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import MainContent from './MainContent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <MainContent />
    </>
  )
}

export default App
