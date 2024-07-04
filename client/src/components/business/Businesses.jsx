// // import { useEffect, useState, useRef } from 'react';
// // import { useSearchParams } from "react-router-dom";
// // import ButtonAppBar from '../ButtonAppBar.jsx';
// // import { APIrequests } from '../../APIrequests.js';
// // import Select from 'react-select';
// // import BusinessList from './BusinessList';
// // import './Businesses.css';
// // import Slider from '@mui/material/Slider';

// // export default function Businesses() {
// //     const [searchParams, setSearchParams] = useSearchParams();
// //     const category = searchParams.get('category');
// //     const [businesses, setBusinesses] = useState([]);
// //     const [sortBy, setSortBy] = useState('');
// //     const [searchBusinessName, setsearchBusinessName] = useState('');
// //     const [searchLocation, setsearchLocation] = useState('');
// //     const [searchPriceRange, setsearchPriceRange] = useState([0, 100]);
// //     const APIrequest = new APIrequests();
// //     const [displaySeeMore, setDisplaySeeMore] = useState(false);
// //     const seeMore = useRef(false);
// //     const range = 7;
// //     const optionsSort = [
// //         { value: 'averageRating DESC', label: 'דירוג' },
// //         { value: 'minPrice ASC', label: 'מחיר' },
// //         { value: 'userName ASC', label: 'סדר אלפביתי' }
// //     ];
// //     const searchLocations = [
// //         { id: 1, searchLocationName: 'jerusalem' },
// //         { id: 2, searchLocationName: 'modihin' }
// //     ];    

// //     useEffect(() => {
// //         getBusinesses(true);
// //     }, [category, sortBy, searchBusinessName, searchLocation, searchPriceRange]);

// //     useEffect(() => {
// //         setDisplaySeeMore(businesses.length % range === 0 && businesses.length !== 0)
// //     }, [businesses]);

// //     const getBusinesses = async (reset) => {
// //         let start = seeMore.current ? businesses.length : 0;
// //         let url = `/businesses?category=${category}`;
// //         // if (searchQuery) {
// //         //     url += `&search=${searchQuery}`;
// //         // }
// //         // if (selectedsearchLocation) {
// //         //     url += `&searchLocationId=${selectedsearchLocation}`;
// //         // }
// //         // if (searchPriceRange) {
// //         //     url += `&minPrice=${searchPriceRange[0]}&maxPrice=${searchPriceRange[1]}`;
// //         // }
// //         if (sortBy) {
// //             url += `&sort=${sortBy}`;
// //         }
// //         url += `&start=${start}&range=${range}`;
// //         const response = await APIrequest.getRequest(url);
// //         const json = await response.json();
// //         if (json.status === 200) {
// //             if(reset){
// //                 setBusinesses( json.data );
// //             } else {
// //                 setBusinesses( businesses => [...businesses, ...json.data] );
// //             }
// //         } else {
// //             alert(json.error);
// //         }
// //     };

// //     const handleSortChange = (selectedOption) => {
// //         setSortBy(selectedOption.value);
// //     };

// //     const handlesearchBusinessNameChange = (event) => {
// //         setsearchBusinessName(event.target.value);
// //     };

// //     const handlesearchLocationChange = (selectedOption) => {
// //         setsearchLocation(selectedOption.value);
// //     };

// //     const handlePriceChange = (event, newValue) => {
// //         setsearchPriceRange(newValue);
// //     };

// //     const handleSearchSubmit = (event) => {
// //         event.preventDefault();
// //         const searchQuery = event.target.searchBusinessName.value;
// //         const selectedLocation = event.target.selectedLocation.value;
// //         const priceRange = event.target.searchPriceRange.value;

// //         getBusinesses(true, { searchQuery, selectedLocation, priceRange });
// //     };

// //     const handleSeeMore = () => {
// //         seeMore.current = true;
// //         getBusinesses(false);
// //     };

// //     return (
// //         <>
// //             <ButtonAppBar />
// //             <div id='businessesTop' dir='rtl'>
// //                 <div id='search'>

// //                     <form onSubmit={handleSearchSubmit}>
// //                     <h4 id="priceTitle">"חיפוש לפי שם עסק</h4>
// //                     <input 
// //                             type="text" 
// //                             value={searchBusinessName} 
// //                             onChange={handlesearchBusinessNameChange} 
// //                             placeholder="חיפוש עסקים לפי שם"
// //                         />
// //                         <div id='select'>
// //                             <h4 id="searchLocationTitle">בחר מיקום:</h4>
// //                             <Select 
// //                                 options={searchLocations}
// //                                 onChange={handlesearchLocationChange} 
// //                             />
// //                             <h4 id="priceTitle">בחר טווח מחירים:</h4>
// //                             <Slider
// //                                 value={searchPriceRange}
// //                                 onChange={handlePriceChange}
// //                                 valueLabelDisplay="auto"
// //                                 min={0}
// //                                 max={1000}
// //                             />
// //                         </div>
// //                         <button type="submit">חיפוש</button>
// //                     </form>
// //                     <h4 id="sortTitle">מיין לפי:</h4>
// //                             <Select options={optionsSort} onChange={handleSortChange} />
                    
// //                 </div>
// //             </div>
// //             <h3 id="businessesHeader">businesses</h3>
// //             <BusinessList businesses={businesses} />
// //             {displaySeeMore && <button onClick={handleSeeMore}>see more</button>}
// //         </>
// //     );
// // }


// import { useEffect, useState, useRef } from 'react';
// import { useSearchParams, useParams } from "react-router-dom";
// import ButtonAppBar from '../ButtonAppBar.jsx';
// import { APIrequests } from '../../APIrequests.js';
// import Select from 'react-select';
// import BusinessList from './BusinessList';
// import './Businesses.css';
// import Slider from '@mui/material/Slider';
// import { useForm, Controller } from 'react-hook-form'; // ייבוא useForm ו-Controller מ-react-hook-form

// export default function Businesses() {
//     const { register, handleSubmit, control, formState: { errors }, reset } = useForm({ // שימוש ב-useForm עם Controller
//         defaultValues: {
//             searchBusinessName: '',
//             searchLocation: '',
//             searchPriceRange: [0, 10000]
//         }
//     });

//     const [searchParams, setSearchParams] = useSearchParams();
//     const { category } = useParams();
//     const [businesses, setBusinesses] = useState([]);
//     const [sortBy, setSortBy] = useState('');
//     const APIrequest = new APIrequests();
//     const [displaySeeMore, setDisplaySeeMore] = useState(false);
//     const seeMore = useRef(false);
//     const range = 7;
//     const optionsSort = [
//         { value: 'averageRating DESC', label: 'דירוג' },
//         { value: 'minPrice ASC', label: 'מחיר' },
//         { value: 'userName ASC', label: 'סדר אלפביתי' }
//     ];
//     const searchLocations = [
//         { id: 1, searchLocationName: 'jerusalem' },
//         { id: 2, searchLocationName: 'modihin' }
//     ];

//     useEffect(() => {
//         getBusinesses(true);
//     }, [category, sortBy]);

//     useEffect(() => {
//         setDisplaySeeMore(businesses.length % range === 0 && businesses.length !== 0)
//     }, [businesses]);

//     const getBusinesses = async (reset) => {
//         let start = seeMore.current ? businesses.length : 0;
//         let url = `/businesses?category=${category}`;
//         searchParams.forEach((value, key) => {
//             url += `&${key}=${value}`;
//         });
//         if (sortBy) {
//             url += `&sort=${sortBy}`;
//         }
//         url += `&start=${start}&range=${range}`;
//         const response = await APIrequest.getRequest(url);
//         const json = await response.json();
//         if (json.status === 200) {
//             if(reset){
//                 setBusinesses(json.data);
//             } else {
//                 setBusinesses(businesses => [...businesses, ...json.data]);
//             }
//         } else {
//             alert(json.error);
//         }
//     };

//     const handleSortChange = (selectedOption) => {
//         setSortBy(selectedOption.value);
//     };

//     const onSubmit = (data) => {
//         const params = new URLSearchParams(searchParams); // שמירה על הפרמטרים הקיימים ב-URL
//         if (data.searchBusinessName) {
//             params.set('searchBusinessName', data.searchBusinessName);
//         }
//         if (data.searchLocation) {
//             params.set('searchLocation', data.searchLocation);
//         }
//         if (data.searchPriceRange) {
//             params.set('minPrice', data.searchPriceRange[0]);
//             params.set('maxPrice', data.searchPriceRange[1]);
//         }
//         setSearchParams(params);
//         getBusinesses(true);
//     };

//     const handleSeeMore = () => {
//         seeMore.current = true;
//         getBusinesses(false);
//     };

//     return (
//         <>
//             <ButtonAppBar />
//             <div id='businessesTop' dir='rtl'>
//                 <div id='search'>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <h4 id="priceTitle">חיפוש לפי שם עסק</h4>
//                         <input 
//                             type="text" 
//                             placeholder="חיפוש עסקים לפי שם"
//                             {...register('searchBusinessName')}
//                         />
//                         <div id='select'>
//                             <h4 id="searchLocationTitle">בחר מיקום:</h4>
//                             <Controller
//                                 name="searchLocation"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <Select 
//                                         {...field}
//                                         options={searchLocations.map(loc => ({ value: loc.id, label: loc.searchLocationName }))}
//                                     />
//                                 )}
//                             />
//                             <h4 id="priceTitle">בחר טווח מחירים:</h4>
//                             <Controller
//                                 name="searchPriceRange"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <Slider
//                                         {...field}
//                                         valueLabelDisplay="auto"
//                                         min={0}
//                                         max={1000}
//                                         onChange={(event, newValue) => field.onChange(newValue)}
//                                     />
//                                 )}
//                             />
//                         </div>
//                         <button type="submit">חיפוש</button>
//                     </form>
//                     <h4 id="sortTitle">מיין לפי:</h4>
//                     <Select options={optionsSort} onChange={handleSortChange} />
//                 </div>
//             </div>
//             <h3 id="businessesHeader">businesses</h3>
//             <BusinessList businesses={businesses} />
//             {displaySeeMore && <button onClick={handleSeeMore}>see more</button>}
//         </>
//     );
// }


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
        { value: 'price DESC', label: 'מחיר' },
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
            url += `&userName LIKE ${searchCriteria.searchBusinessName}`;
        }
        if (searchCriteria.searchLocation) {
            url += `&locationName=${searchCriteria.searchLocation}`;
        }
        if (searchCriteria.searchPriceRange[0]!=minPrice||searchCriteria.searchPriceRange[1]!=maxPrice) {
            url += `&minPrice>${searchCriteria.searchPriceRange[0]}||maxPrice<${searchCriteria.searchPriceRange[1]}`;
        }
        if (sortBy) {
            url += `&sort=${sortBy}`;
        }
        url += `&start=${start}&range=${range}`;
        const response = await APIrequest.getRequest(url);
        const json = await response.json();
        if (json.status === 200) {
            if (reset) {
                setBusinesses(json.data);
            } else {
                setBusinesses(businesses => [...businesses, ...json.data]);
            }
        } else {
            alert(json.error);
        }
    };

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
