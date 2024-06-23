import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import auth from '../auth.js';
import orchestraImage from '../images/orchestra.png';
import photographerImage from '../images/photographer.png';
import flowersImage from '../images/flowers.png';
import ButtonAppBar from './ButtonAppBar.jsx'


function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(auth.isAuthenticated());
  }, []);

  const handleLogout = () => {
    auth.logout();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="home-container">
      <ButtonAppBar isLoggedIn={isLoggedIn}/>
      <div className="sidebar">
        {isLoggedIn ? (
          <>
            <Link to="/profile">אזור אישי</Link>
            <button onClick={handleLogout}>התנתק מהחשבון</button>
          </>
        ) : (
          <>
            <Outlet />
            <Link to="/login">כניסה לחשבון שלי</Link>
            <Link to="/add-business">הוסף עסק חדש</Link>
          </>
        )}
      </div>
      <div className="main-content">
        <h1>הכל לארוע</h1>
        <p>ברוכים הבאים לאתר הכל לארוע! חלחלחלחלחלחלחלחחחחחחחחחחחחחחחחחחחחחחחחחחחחחחחחחחחחחחחחח.</p>
        <div className="images-container">
          <Link to="/businesses/orchestra">
            <img src={orchestraImage} alt="Orchestra" className="category-image" />
            <p>תזמורות</p>
          </Link>
          <Link to="/businesses/photographer">
            <img src={photographerImage} alt="Photographer" className="category-image" />
            <p>צלמים</p>
          </Link>
          <Link to="/businesses/flowers">
            <img src={flowersImage} alt="Flowers" className="category-image" />
            <p>פרחים</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;