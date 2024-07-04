import { useEffect, useState, useRef } from 'react';
import { Outlet, useSearchParams } from "react-router-dom";
import ButtonAppBar from '../ButtonAppBar.jsx';
import { APIrequests } from '../../APIrequests.js';
import Select from 'react-select';
import BusinessList from './BusinessList';
import './Businesses.css';
import Slider from '@mui/material/Slider';

export default function Businesses() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [businesses, setBusinesses] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100]);
    const APIrequest = new APIrequests();
    const [displaySeeMore, setDisplaySeeMore] = useState(false);
    const seeMore = useRef(false);
    const range = 7;
    const options = [
        { value: 'averageRating DESC', label: 'דירוג' },
        { value: 'price DESC', label: 'מחיר' },
        { value: 'userName ASC', label: 'סדר אלפביתי' }
    ];
    const locations = [
        { id: 1, locationName: 'jerusalem' },
        { id: 2, locationName: 'modihin' }
    ];    
    console.log('type: ' + typeof businesses)

    useEffect(() => {
        getBusinesses(true);
        console.log('type: ' + typeof businesses)
    }, [category, sortBy, searchQuery, selectedLocation, priceRange]);

    useEffect(() => {
        setDisplaySeeMore(businesses.length % range === 0 && businesses.length !== 0)
    }, [businesses]);


    const getBusinesses = async (reset) => {
        let start = seeMore.current ? businesses.length : 0;
        let url = `/businesses?category=${category}`;
        // if (searchQuery) {
        //     url += `&search=${searchQuery}`;
        // }
        // if (selectedLocation) {
        //     url += `&locationId=${selectedLocation}`;
        // }
        // if (priceRange) {
        //     url += `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
        // }
        if (sortBy) {
            url += `&sort=${sortBy}`;
        }
        url += `&start=${start}&range=${range}`;
        const response = await APIrequest.getRequest(url);
        const json = await response.json();
        if (json.status === 200) {
            console.log('type: ' + typeof businesses)
            if(reset){
                setBusinesses( json.data );
            } else {
                setBusinesses( businesses => [...businesses, ...json.data] );
            }
        } else {
            alert(json.error);
        }
    };

    const handleSeeMore = () => {
        seeMore.current = true;
        getBusinesses(false);
    };

    const handleSortChange = (selectedOption) => {
        setSortBy(selectedOption.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };


    const handleLocationChange = (selectedOption) => {
        setSelectedLocation(selectedOption.value);
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
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
                    <h4 id="locationTitle">בחר מיקום:</h4>
                    <Select 
                        options={locations.map(loc => ({ value: loc.id, label: loc.locationName }))}
                        onChange={handleLocationChange} 
                    />
                    <h4 id="priceTitle">בחר טווח מחירים:</h4>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={1000}
                    /> 
                </div>

            </div>
            <h3 id="businessesHeader">businesses</h3>
            <BusinessList businesses={businesses} />
            {displaySeeMore && <button onClick={handleSeeMore}>see more</button>}
            
        </>
    );
}