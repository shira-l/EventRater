import { useEffect, useState, useRef } from 'react';
import { Outlet, useSearchParams } from "react-router-dom";
import ButtonAppBar from '../ButtonAppBar.jsx';
import { APIrequests } from '../../APIrequests.js';
import Select from 'react-select';
import BusinessList from './BusinessList';
import './Businesses.css';

export default function Businesses() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [businesses, setBusinesses] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const APIrequest = new APIrequests();
    const [displaySeeMore, setDisplaySeeMore] = useState(false);
    const seeMore = useRef(false);
    const range = 15;
    const options = [
        { value: 'rating', label: 'דירוג' },
        { value: 'price', label: 'מחיר' },
        { value: 'Alphabetical', label: 'סדר אלפביתי' }
    ];

    useEffect(() => {
        getBusinesses();
    }, [category, sortBy, searchQuery]);

    const getBusinesses = async () => {
        let start = seeMore.current ? businesses.length : 0;
        let url = `/businesses?category=${category}&start=${start}&range=${range}`;

        if (sortBy) {
            url += `&sort=${sortBy}`;
        }

        if (searchQuery) {
            url += `&search=${searchQuery}`;
        }

        const response = await APIrequest.getRequest(url);
        const json = await response.json();
        if (json.status !== 200) {
            alert(json.error);
        } else {
            const newBusinesses = [...businesses, ...json.data];
            setBusinesses(newBusinesses);
            setDisplaySeeMore(json.data.length >= range);
            seeMore.current = false;
        }
    };

    const handleSeeMore = () => {
        seeMore.current = true;
        getBusinesses();
    };

    const handleSortChange = (selectedOption) => {
        setSortBy(selectedOption.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        getBusinesses();
    };

    return (
        <>
            <ButtonAppBar />
            <div id='businessesTop' dir='rtl'>
                <div id='search'>
                    <h3 id="searchTitle">search:</h3>
                    <form onSubmit={handleSearchSubmit}>
                        <input 
                            type="text" 
                            value={searchQuery} 
                            onChange={handleSearchChange} 
                            placeholder="Search businesses"
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div id='select'>
                    <h4 id="sortTitle">מיין לפי:</h4>
                    <Select options={options} onChange={handleSortChange} />
                </div>
            </div>
            <h3 id="businessesHeader">businesses</h3>
            <BusinessList businesses={businesses} />
            {displaySeeMore && <button onClick={handleSeeMore}>see more</button>}
            
        </>
    );
}