import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { PaymentGenerator } from './components/PaymentGenerator'
import './App.css'

// Initialize Google Analytics
ReactGA.initialize('G-7SPV6B9MPE')

function App() {
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search })
  }, [])

  return (
    <div className="app">
      <PaymentGenerator />
    </div>
  )
}

export default App
