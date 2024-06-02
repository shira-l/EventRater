import { useState } from 'react'
import Home from './components/Home.jsx'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, useParams } from 'react-router-dom';
import Login from './components/Login.jsx';
// import {Route, Router} from 'react-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />}>
            <Route path="">
              <Route path='businesses/:category' element={<Businesses />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
