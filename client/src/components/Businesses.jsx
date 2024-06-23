
import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ButtonAppBar from './ButtonAppBar.jsx';
import BusinessInList from './BusinessInList.jsx';
import { APIrequests } from '../APIrequests.js'
//import { UserContext } from "../../UserProvider";

function Businesses() {
    const { category } = useParams();
    // const navigate = useNavigate();
    // const [businesses, setBusinesses] = useState([{name:"אבי",rating:10,opinion:100},
    // {name:"אבי",rating:10,opinion:100},
    // {name:"אבי",rating:10,opinion:100}])
    const [businesses, setBusinesses] = useState([])
    const seeMore = useRef(false);
    const range = 15;
    const APIrequest=new APIrequests()
    // useEffect(async () => {
    //     let start = seeMore.current ? businesses.length : 0
    //     // const response = await APIrequest.getRequest(`/businesses?category=${category}&_start=${start}&_end=${start + range}`);
    //     const response = await APIrequest.getRequest(`/businesses?category=${category}`);
    //     let json = response.json();
    //     if (json.status != 200) {
    //         alert(json.error)
    //     }
    //     else {
    //         seeMore.current ? setBusinesses([...businesses, ...json.data]) : setBusinesses(json.data);
    //         seeMore.current = false;
    //     }
    // }
    //     , [])

    useEffect(() => {
        const fetchData = async () => {
            let start = seeMore.current ? businesses.length : 0
            const response = await APIrequest.getRequest(`/businesses?category=${category}`);
            let json = await response.json();
            if (response.status !== 200) {
                alert(json.error)
            } else {
                seeMore.current ? setBusinesses([...businesses, ...json.data]) : setBusinesses(json.data);
                seeMore.current = false;
            }
        };
        fetchData();
    }, [category, businesses, APIrequest]);


    return (<>
        <h1>שששששששששש</h1>
        {/* {businesses.map((business)=><BusinessInList name={business.name} rating={business.rating} opinion={business.opinion}/>)} */}
        {businesses.map((business) => (
                <BusinessInList
                    key={business.id}
                    business={business}
                />))}
    </>)
}
export default Businesses;