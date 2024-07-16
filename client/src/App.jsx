
import Home from './components/Home/Home.jsx'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Businesses from './components/businessComponents/businesses/Businesses.jsx'
import Business from './components/businessComponents/business/Business.jsx'
import BusinessRegister from './components/businessComponents/BusinessRegister.jsx';
import PersonalArea from './components/businessComponents/personal-area/PersonalArea.jsx';
import BusinessLogin from './components/businessComponents/BusinessLogin.jsx';



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="businesses">
            <Route index element={<Businesses />} />
            <Route path=':idBusiness' element={<Business />} />
            <Route path='register' element={<BusinessRegister />} />
            <Route path='login' element={<BusinessLogin />} />
            <Route path='personal-area' element={<PersonalArea />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
