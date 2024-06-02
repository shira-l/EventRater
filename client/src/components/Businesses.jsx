
import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserProvider";

function Businesses() {
    const { category } = useParams();
    const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([])
    const seeMore = useRef(false);
    const range = 15;
    useEffect(async () => {
        let start = seeMore.current ? businesses.length : 0
        const response = await fetch(`http://localhost:8080/businesses/${category}&_start=${start}&_end=${start + range}`);
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