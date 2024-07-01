import React from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
// import Comments from './Comments';
// import Contact from './Contact';
// import Gallery from './Gallery';

const Business = () => {
    const { idBusiness } = useParams();
    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div className="business-detail">
            <h1>Business Name</h1>
            <p>About: Lorem ipsum dolor sit amet...</p>
            <Tabs value={tabValue} onChange={handleChange} aria-label="business detail tabs">
                <Tab label="Comments" />
                <Tab label="Contact" />
                <Tab label="Gallery" />
            </Tabs>
            {/* {tabValue === 0 && <Comments businessId={idBusiness} />}
            {tabValue === 1 && <Contact businessId={idBusiness} />}
            {tabValue === 2 && <Gallery businessId={idBusiness} />} */}
        </div>
    );
};

export default Business;
