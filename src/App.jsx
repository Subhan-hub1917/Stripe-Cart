import { useState } from 'react'
import Cart from './Components/Cart'
import Success from './Pages/Success'
import Cancel from './Pages/Cancel'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
      <main>
    <Router>
      <Routes>
        <Route path='/' element={<Cart/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/cancel' element={<Cancel/>}/>
      </Routes>
    </Router>
      </main>
  )
}

export default App
