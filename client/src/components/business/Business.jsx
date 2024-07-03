import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import ButtonAppBar from '../ButtonAppBar.jsx';
import { APIrequests } from '../../APIrequests.js';
import './Business.css';
import Reviews from './Reviews';
import Contact from './Contact';
// import Gallery from './Gallery';

const Business = () => {
    const { idBusiness } = useParams();
    const location = useLocation();
    const businessFromList = location.state?.business || {};
    const [tabValue, setTabValue] = useState(0);
    const [business, setBusiness] = useState();
    // const [gallery, setGallery] = useState([]);
    // const [contact, setContact] = useState({});
    const [loading, setLoading] = useState(true);
    const APIrequest = new APIrequests();

    const handleChange = (event, newValue) => {
        console.log("business",business);
        setTabValue(newValue);
    };

    useEffect(() => {
        getBusiness();
    }, []);

    const getBusiness = async () => {
        try {
            const url = `/businesses/${idBusiness}`;
            const response = await APIrequest.getRequest(url);
            const json = await response.json();
            if (json.status !== 200) {
                alert(json.error);
            } else {
                const newBusinesses = {...businessFromList, ...json.data[0]};
                console.log(newBusinesses);
                setBusiness(newBusinesses);
            }
    
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
                    {/* <Tab label="Gallery" /> */}
                </Tabs>
                {tabValue === 0 && <Reviews key="reviews" />}
                {tabValue === 1 && <Contact key="contact" business={business} />}
                {/* {tabValue === 2 && <Gallery gallery={gallery} />} */}
            </div>
        </>
    );
};

export default Business;
