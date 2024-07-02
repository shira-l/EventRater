import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import ButtonAppBar from '../ButtonAppBar.jsx';
import { APIrequests } from '../../APIrequests.js';
import './Business.css';
import Comments from './Comments';
// import Contact from './Contact';
// import Gallery from './Gallery';

const Business = () => {
    const { idBusiness } = useParams();
    const location = useLocation();
    console.log("location status" ,location.state);

    const businessFromList = location.state?.business || {};
    const [tabValue, setTabValue] = useState(0);
    const [business, setBusiness] = useState();
    const [comments, setComments] = useState([]);
    // const [gallery, setGallery] = useState([]);
    // const [contact, setContact] = useState({});
    const [loading, setLoading] = useState(true);
    const APIrequest = new APIrequests();

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
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

        const getComments = async () => {
            try {
                const url = `/opinions?businessId=${idBusiness}`;
                const response = await APIrequest.getRequest(url);
                const json = await response.json();
                if (json.status !== 200) {
                    alert(json.error);
                } else {
                    setComments(json.data);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
    
        getBusiness();
        getComments();
    }, []);
    

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
                    <Tab label="Comments" />
                    {/* <Tab label="Contact" />
                    <Tab label="Gallery" /> */}
                </Tabs>
                {tabValue === 0 && <Comments comments={comments} />}
                {/* {tabValue === 1 && <Contact contact={contact} />}
                {tabValue === 2 && <Gallery gallery={gallery} />} */}
            </div>
        </>
    );
};

export default Business;
