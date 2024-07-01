import { useState } from 'react'
import Home from './components/Home/Home.jsx'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, useParams } from 'react-router-dom';
import NewBusiness from './components/business/NewBusiness.jsx';
import Businesses from './components/business/Businesses.jsx'
import Business from './components/business/Business.jsx'

// import {Route, Router} from 'react-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="businesses">
              <Route path=':category' element={<Businesses />} />
              <Route path=':idBusiness' element={<Business />} />
              <Route path='new-business' element={<NewBusiness />} />
            </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
