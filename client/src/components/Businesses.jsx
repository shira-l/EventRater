
import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import BusinessInList from './BusinessInList.jsx';
// import { UserContext } from "../../UserProvider";
import { APIrequests } from '../APIrequests.js' 

function Businesses() {
    const { category } = useParams();
    // const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([])
    const seeMore = useRef(false);
    const range = 1;
    const APIrequest=new APIrequests()

    useEffect(() => {
        fetchData();

    }, [category]);

    const fetchData = async () => {
        let start = seeMore.current ? businesses.length : 0;
        const response = await APIrequest.getRequest(`/businesses?category=${category}&start=${start}&range=${range}`);
        let json = await response.json();
        if (response.status !== 200) {
            alert(json.error);
        } else {
            seeMore.current ? setBusinesses([...businesses, ...json.data]) : setBusinesses(json.data);
            seeMore.current = false;
        }
    };

    const handleSeeMore = () => {
        seeMore.current = true;
        fetchData();
    };


    return (<>
        <h1>שששששששששש</h1>
                      <ul>
        {businesses.map(business => (
          <BusinessInList
            key={business.id}
            business={business}
          />
        ))}
      </ul>
      <button onClick={handleSeeMore()}>ראה עוד</button>
    </>)
}
export default Businesses;