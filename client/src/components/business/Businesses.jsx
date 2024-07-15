
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import ButtonAppBar from '../ButtonAppBar.jsx';
import { APIrequests } from '../../APIrequests.js';
import Select from 'react-select';
import BusinessList from './BusinessList';
import './Businesses.css';
import Slider from '@mui/material/Slider';

export default function Businesses() {
    const maxPrice = 100000;
    const minPrice = 0;
    const [searchParams] = useSearchParams();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            searchBusinessName: '',
            searchLocation: '',
            searchPriceRange: [minPrice, maxPrice]
        }
    });
    const category = searchParams.get('category');
    const [businesses, setBusinesses] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [displaySeeMore, setDisplaySeeMore] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState({
        searchBusinessName: '',
        searchLocation: '',
        searchPriceRange: [minPrice, maxPrice]
    });
    const APIrequest = new APIrequests();
    const seeMore = useRef(false);
    const range = 7;
    const options = [
        { value: 'averageRating DESC', label: 'דירוג' },
        { value: 'minPrice ASC', label: 'מחיר' },
        { value: 'userName ASC', label: 'סדר אלפביתי' }
    ];
    const locations = [
        { value: '', label: 'None' },
        { value: 'Jerusalem', label: 'Jerusalem' },
        { value: 'modihin', label: 'modihin' }
    ];


    useEffect(() => {
        getBusinesses(true);
    }, [category, sortBy, searchCriteria]);

    useEffect(() => {
        setDisplaySeeMore(businesses.length % range === 0 && businesses.length !== 0)
    }, [businesses]);

    const getBusinesses = async (reset) => {
        let start = seeMore.current ? businesses.length : 0;
        let url = `/businesses?category=${category}`;
        if (searchCriteria.searchBusinessName) {
            url += `&userName=${searchCriteria.searchBusinessName}`;
        }
        if (searchCriteria.searchLocation) {
            url += `&locationName=${searchCriteria.searchLocation}`;
        }
        if (searchCriteria.searchPriceRange[0] != minPrice || searchCriteria.searchPriceRange[1] != maxPrice) {
            url += `&minPrice=${searchCriteria.searchPriceRange[0]}&maxPrice=${searchCriteria.searchPriceRange[1]}`;
        }
        if (sortBy) {
            url += `&sort=${sortBy}`;
        }
        url += `&start=${start}&range=${range}`;
        try {
            const response = await APIrequest.getRequest(url);
            if (reset) {
                setBusinesses(response.data);
            } else {
                setBusinesses(businesses => [...businesses, ...response.data]);
            }
        } catch (error) {
            alert(error.message)
        }
    }


    const handleSortChange = (selectedOption) => {
        setSortBy(selectedOption.value);
    };

    const onSubmit = (data) => {
        setSearchCriteria({
            searchBusinessName: data.searchBusinessName,
            searchLocation: data.searchLocation?.value || '',
            searchPriceRange: data.searchPriceRange
        });
    };

    const handleSeeMore = () => {
        seeMore.current = true;
        getBusinesses(false);
    };

    return (
        <>
            <ButtonAppBar />
            <div id='businessesTop' dir='rtl'>
                <div id='search'>
                    <h3 id="searchTitle">search:</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            placeholder="Search businesses"
                            {...register('searchBusinessName')}
                        />
                        <Controller
                            name="searchLocation"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={locations}
                                />
                            )}
                        />
                        <Controller
                            name="searchPriceRange"
                            control={control}
                            render={({ field }) => (
                                <Slider
                                    {...field}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={1000}
                                    onChange={(event, newValue) => field.onChange(newValue)}
                                />
                            )}
                        />
                        <button type="submit">Update search</button>
                    </form>
                </div>
                <div id='select'>
                    <h4 id="sortTitle">sort:</h4>
                    <Select options={options} onChange={handleSortChange} />
                </div>
            </div>
            <h3 id="businessesHeader">businesses</h3>
            <BusinessList businesses={businesses} />
            {displaySeeMore && <button onClick={handleSeeMore}>see more</button>}
        </>
    );
}
