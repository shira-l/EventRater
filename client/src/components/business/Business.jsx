import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import ButtonAppBar from '../ButtonAppBar.jsx';
import { APIrequests } from '../../APIrequests.js';
import Comments from './Comments';
// import Contact from './Contact';
// import Gallery from './Gallery';

const Business = () => {
    const { idBusiness } = useParams();
    const location = useLocation();
    const initialBusiness = location.state?.business || {};
    const [tabValue, setTabValue] = useState(0);
    const [business, setBusiness] = useState(initialBusiness);
    const [comments, setComments] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [contact, setContact] = useState({});
    const APIrequest = new APIrequests();

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        const fetchAdditionalData = async () => {
            try {
                const response = await APIrequest.getRequest(`/businesses/${idBusiness}`);
                const data = await response.json();
                if (response.status === 200) {
                    setBusiness(data.business);
                    setComments(data.comments);
                    setGallery(data.gallery);
                    setContact(data.contact);
                } else {
                    console.error('Error fetching business data:', data.error);
                }
            } catch (error) {
                console.error('Error fetching business data:', error);
            }
            console.log(businessData);
            console.log(businessData)
        };

        if (!initialBusiness.idBusiness) {
            fetchAdditionalData();
        }
    }, [idBusiness, initialBusiness]);

    return (
        <>
            <ButtonAppBar />
            <div className="business-detail">
                <h1>{business.userName}</h1>
                <p>About: {business.about}</p>
                <Tabs value={tabValue} onChange={handleChange} aria-label="business detail tabs">
                    <Tab label="Comments" />
                    <Tab label="Contact" />
                    <Tab label="Gallery" />
                </Tabs>
                {tabValue === 0 && <Comments comments={comments} />}
                {tabValue === 1 && <Contact contact={contact} />}
                {tabValue === 2 && <Gallery gallery={gallery} />}
            </div>
        </>
    );
};

export default Business;
