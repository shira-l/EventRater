

import { useEffect, useState, useContext, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ButtonAppBar from './ButtonAppBar.jsx';
import BusinessInList from './BusinessInList.jsx';
// import { UserContext } from "../../UserProvider";
import { APIrequests } from '../APIrequests.js'
//import { UserContext } from "../../UserProvider";

export default function Businesses() {
    const { category } = useParams();
    const [businesses, setBusinesses] = useState([{ id: 1, businessName: "אבי", location: "ירושלים" },
        { id: 1, businessName: "אבי", location: "ירושלים" },
        { id: 1, businessName: "אבי", location: "ירושלים" },
        { id: 1, businessName: "אבי", location: "ירושלים" },
        { id: 1, businessName: "אבי", location: "ירושלים" },
        { id: 1, businessName: "אבי", location: "ירושלים" }])
    const APIrequest = new APIrequests()
    const { id } = useParams();
    const navigate = useNavigate();
    const [valuesSearch, setvaluesSearch] = useState({ title: "", id: "" })
    // const { user } = useContext(UserContext);
    const [lastAction, setLastAction] = useState({ action: "", type: "" });
    const [displaySeeMore, setDisplaySeeMore] = useState(false)
    const seeMore = useRef(false);
    const range = 15;

    useEffect(() => {
        getBusinesses()
    }, [category])

    const getBusinesses = async () => {
        let start = seeMore.current ? businesses.length : 0
        const response = await APIrequest.getRequest(`/businesses?category=${category}&_start=${start}&_end=${start + range}`)
        const json = response.json()
        if (json.status != 200) {
            alert(json.error)
        }
        else {
            if (seeMore.current) {
                setBusinesses([...businesses, ...json.data])
            }
            else { setBusinesses(json.data); setDisplaySeeMore(true) };
            setLastAction({ action: "search", type: "all" })
            json.data.length < range ? setDisplaySeeMore(false) : setDisplaySeeMore(true);
            seeMore.current = false;
        }
    }



    const handleSearchChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setvaluesSearch({ ...valuesSearch, [name]: value })
    }

    const searchCompleted = (boolian) => {
        let start = seeMore.current ? businesses.length : 0
        navigate(`/home/users/${id}/businesses/search?completed=${boolian}`)
        fetch(`http://localhost:8082/businesses?userId=${id}&completed=${boolian}&_start=${start}&_end=${start + range}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((json) => {
                if (json.status != 200) {
                    alert(json.error)
                }
                else {
                    if (seeMore.current) {
                        setBusinesses([...businesses, ...json.data])
                    }
                    else {
                        setBusinesses(json.data);
                        setDisplaySeeMore(true);
                    }
                    seeMore.current = false;
                    json.data.length < range ? setDisplaySeeMore(false) : setDisplaySeeMore(true);
                    boolian ? setLastAction({ action: "search", type: "completed" }) : setLastAction({ action: "search", type: "notCompleted" })
                }
            });
    }

    const searchByTitle = (titleValue) => {
        if (businesses.length <= range) {
            setDisplaySeeMore(true)
        }
        let start = seeMore.current ? businesses.length : 0
        navigate(`/home/users/${id}/businesses/search?title=${titleValue}`)
        fetch(`http://localhost:8082/businesses?userId=${id}&title=${titleValue}&_start=${start}&_end=${start + range}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((json) => {
                if (json.status != 200) {
                    alert(json.error)
                }
                else {
                    if (seeMore.current) {
                        setBusinesses([...businesses, ...json.data])
                    }
                    else { setBusinesses(json.data); setDisplaySeeMore(true) };
                    seeMore.current = false;
                    json.data.length < range ? setDisplaySeeMore(false) : setDisplaySeeMore(true);
                    setLastAction({ action: "search", type: "title" });
                }
            })
    }

    const searchById = (idValue) => {
        navigate(`/home/users/${id}/businesses/${idValue}`)
        fetch(`http://localhost:8082/businesses/${idValue}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((json) => {
                if (json.status != 200) {
                    alert(json.error)
                }
                else { setBusinesses(json.data); setDisplaySeeMore(false) }
            })
    }

    const handleSeeMore = () => {
        seeMore.current = true;
        if (lastAction.action == "search") {
            switch (lastAction.type) {
                case "title":
                    searchByTitle(valuesSearch.title)
                    break;
                case "completed":
                    searchCompleted(true)
                    break;
                case "notCompleted":
                    searchCompleted(false)
                    break;
                default:
                    getBusinesses();
                    break;
            }
        }
        else {
            sortBy(lastAction.type);
        }
    }
    const sortBy = (event) => {
        let start = seeMore.current ? businesses.length : 0
        let value = seeMore.current ? event : event.target.value;
        navigate(`/home/users/${id}/businesses/?sortBy=${value}`)

        fetch(`http://localhost:8082/businesses?userId=${id}&sort=${value}&_start=${start}&_end=${start + range}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((json) => {
                if (json.status != 200) {
                    alert(json.error)
                }
                else {
                    if (seeMore.current) {
                        setBusinesses([...businesses, ...json.data])
                    }
                    else { setBusinesses(json.data); setDisplaySeeMore(true) };
                    seeMore.current = false;
                    json.data.length < range ? setDisplaySeeMore(false) : setDisplaySeeMore(true);
                    setLastAction({ action: "sort", type: `${value}` });
                }
            })

    }
    return (<>
        <h1>שששששששששש</h1>
        <ButtonAppBar />
        <div id='businessesTop'>
            <div id='search'>
                <h3 id="searchTitle">search:</h3>
                <input className='searchTodo' type="text" name="title" onChange={handleSearchChange} placeholder="title" />
                <button disabled={valuesSearch.title == ""} onClick={() => { searchByTitle(valuesSearch.title) }}>search title</button>
                <input className='searchTodo' type="text" name="id" onChange={handleSearchChange} placeholder="id" />
                <button disabled={valuesSearch.id == ""} onClick={() => { searchById(valuesSearch.id) }}>search id</button>
                <form className='searchTodo' action="">
                    <label>completed</label>
                    <input type="radio" name='completed' onChange={() => { searchCompleted(true) }} />
                    <label>not completed</label>
                    <input type="radio" name='completed' onChange={() => { searchCompleted(false) }} />
                </form>

            </div>
            <div id='select'>
                <h4 id="sortTitle">sort:</h4>
                <select id="sortBy" onChange={sortBy}>
                    <option value="serial" >serial</option>
                    <option value="completed">completed</option>
                    <option value="Alphabetical">Alphabetical</option>
                </select>
            </div>
        </div>
        {displaySeeMore && <button onClick={handleSeeMore}>see more</button>}
        <h3 id="businessesHeader">businesses List</h3>
        <div id='container'>
            {businesses.map((business,index) =>
                <BusinessInList key={index} business={business} />)}</div>
    </>)
}




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



// return (<>
//     <ButtonAppBar />
//     <h1>שששששששששש</h1>
//     {/* {businesses.map((business)=><BusinessInList name={business.name} rating={business.rating} opinion={business.opinion}/>)} */}
//     {businesses.map((business) => (
//         <BusinessInList
//             key={business.id}
//             business={business}
//         />))}
// </>)
// }
