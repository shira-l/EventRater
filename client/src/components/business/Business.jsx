
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import ButtonAppBar from '../ButtonAppBar.jsx';
import { APIrequests } from '../../APIrequests.js';
import './Business.css';
import Reviews from '../Reviews/Reviews.jsx';
import Contact from './Contact.jsx';
import Prices from './Prices.jsx';

const Business = () => {
    const { idBusiness } = useParams();
    const location = useLocation();
    const businessFromList = location.state?.business || {};
    const [tabValue, setTabValue] = useState(0);
    const [business, setBusiness] = useState();
    const [loading, setLoading] = useState(true);
    const APIrequest = new APIrequests();

    const handleChange = (event, newValue) => {
        console.log("business", business);
        setTabValue(newValue);
    };

    useEffect(() => {
        getBusiness();
    }, []);

    const getBusiness = async () => {
        try {
            const url = `/businesses/${idBusiness}`;
            const response = await APIrequest.getRequest(url);
            const newBusinesses = { ...businessFromList, ...response.data[0] };
            setBusiness(newBusinesses);

        } catch (error) {
            console.error('Error fetching business data:', error);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ButtonAppBar />
            <div className="business-detail">
                <h1>{business.userName}</h1>
                <p>About: {business.about}</p>
                <Tabs value={tabValue} onChange={handleChange} aria-label="business detail tabs">
                    <Tab label="Reviews" />
                    <Tab label="Contact" />
                    <Tab label="Prices" />
                    {/* <Tab label="Gallery" /> */}
                </Tabs>
                {tabValue === 0 && <Reviews key="reviews" />}
                {tabValue === 1 && <Contact key="contact" business={business} />}
                {tabValue === 2 && <Prices key="prices" />}
                {/* {tabValue === 2 && <Gallery gallery={gallery} />} */}
            </div>
        </>
    );
};

export default Business;
