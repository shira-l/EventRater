
import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserProvider";
import { APIrequests } from '../APIrequests.js' 

function Businesses() {
    const { category } = useParams();
    const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([])
    const seeMore = useRef(false);
    const range = 15;
    const APIrequest=new APIrequests()
    useEffect(async () => {
        let start = seeMore.current ? businesses.length : 0
        const response = await APIrequest.getRequest(`/businesses?category=${category}&_start=${start}&_end=${start + range}`);
        let json = response.json();
        if (json.status != 200) {
            alert(json.error)
        }
        else {
            seeMore.current ? setBusinesses([...businesses, ...json.data]) : setBusinesses(json.data);
            seeMore.current = false;
        }
    }
        , [])


    return (<>
        <nuv></nuv>
        <div>רקע</div>

    </>)
}