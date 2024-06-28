import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import orchestraImage from '../../images/WhatsApp-Image-2018-06-19-at-12.47.13.jpeg'
import photographerImage from '../../images/photographer.png';
import flowersImage from '../../images/flowers.png';
import ButtonAppBar from '../ButtonAppBar.jsx'
import './Home.css'

function Home() {
  //const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    //setIsLoggedIn(auth.isAuthenticated());
  }, []);

 
  return (<>
  
      <ButtonAppBar/>
      <div className="home-container">
      <p className='paragraph'> 
        .במידרג ישנן מאות אלפי חוות דעת של לקוחות קודמים כמוך על למעלה מ-9,900 בעלי מקצוע
        <br />
        .בכל חיפוש תקבלו רשימה של בעלי מקצוע
        <br />
        .הרשימה ממויינת לפי הציון הממוצע שקיבלו בעלי המקצוע מהלקוחות הקודמים
        <br />
        ! בעל מקצוע לא יכול לקנות את המיקום שלו ברשימה. רק הלקוחות קובעים</p>
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
      </div></>
  );
}

export default Home;