import { useState } from 'react'
import Cart  from './Components/Cart'
import Success from './Pages/Success'
import Cancel from './Pages/Cancel'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <main>
      <Routes>
        <Route exact path='/' element={<Cart/>}/>
        <Route exact path='/success' element={<Success/>}/>
        <Route exact path='/cancel' element={<Cancel/>}/>
      </Routes>
    </main>
  </Router>
  )
}

export default App
