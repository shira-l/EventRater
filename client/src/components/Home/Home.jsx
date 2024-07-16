import React from 'react';
import { Link} from 'react-router-dom';

import orchestraImage from '../../images/WhatsApp-Image-2018-06-19-at-12.47.13.jpeg'
import photographerImage from '../../images/photographer.png';
import flowersImage from '../../images/flowers.jpg';
import ButtonAppBar from '../ButtonAppBar.jsx'
import './Home.css'

function Home() {
  

 
  return (<>
  
      <ButtonAppBar/>
      <div className="home-container">
      <p className='paragraph'> 
      In events rating there are hundreds of thousands of opinions from previous customers like you about over 9,900 professionals
        <br />
        In every search you will get a list of professionals
        <br />
        The list is sorted according to the average score the professionals received from the previous clients
        <br />
        ! A professional cannot buy his position on the list. Only the customers decide
        </p>
        <div className="images-container">
          <Link className="home-link" to="/businesses?category=orchestra">
            <img src={orchestraImage} alt="Orchestra" className="category-image" />
            <p>orchestra</p>
          </Link>
          <Link className="home-link" to="/businesses?category=photographer">
            <img src={photographerImage} alt="Photographer" className="category-image" />
            <p>photographers</p>
          </Link>
          <Link className="home-link" to="/businesses?category=flowers">
            <img src={flowersImage} alt="Flowers" className="category-image" />
            <p>flowers</p>
          </Link>
        </div>
      </div></>
  );
}

export default Home;