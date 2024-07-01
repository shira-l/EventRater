// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Tabs, Tab } from '@mui/material';
// import ButtonAppBar from '../ButtonAppBar.jsx';
// // import Comments from './Comments';
// // import Contact from './Contact';
// // import Gallery from './Gallery';

// const Business = () => {
//     const { idBusiness } = useParams();
//     const [tabValue, setTabValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setTabValue(newValue);
//     };

//     return (
//         <>
//             <ButtonAppBar />
//             <div className="business-detail">
//                 <h1>Business Name</h1>
//                 <p>About: Lorem ipsum dolor sit amet...</p>
//                 <Tabs value={tabValue} onChange={handleChange} aria-label="business detail tabs">
//                     <Tab label="Comments" />
//                     <Tab label="Contact" />
//                     <Tab label="Gallery" />
//                 </Tabs>
//                 {/* {tabValue === 0 && <Comments businessId={idBusiness} />}
//                 {tabValue === 1 && <Contact businessId={idBusiness} />}
//                 {tabValue === 2 && <Gallery businessId={idBusiness} />} */}
//             </div>
//         </>
//     );
// };

// export default Business;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import ButtonAppBar from '../ButtonAppBar.jsx';
import { APIrequests } from '../../APIrequests.js';

const Business = () => {
    const { idBusiness } = useParams();
    const [tabValue, setTabValue] = useState(0);
    const [business, setBusiness] = useState(null);
    const APIrequest = new APIrequests();

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const response = await APIrequest.getRequest(`/businesses/${idBusiness}`);
                const data = await response.json();
                if (response.status === 200) {
                    setBusiness(data);
                } else {
                    console.error('Error fetching business:', data.error);
                }
            } catch (error) {
                console.error('Error fetching business:', error);
            }
        };

        fetchBusiness();
    }, [idBusiness]);

    if (!business) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ButtonAppBar />
            <div className="business-detail">
                <h1>{business.name}</h1>
                <p>About: {business.about}</p>
                <Tabs value={tabValue} onChange={handleChange} aria-label="business detail tabs">
                    <Tab label="Comments" />
                    <Tab label="Contact" />
                    <Tab label="Gallery" />
                </Tabs>
                {/* {tabValue === 0 && <Comments businessId={idBusiness} />}
                {tabValue === 1 && <Contact businessId={idBusiness} />}
                {tabValue === 2 && <Gallery businessId={idBusiness} />} */}
            </div>
        </>
    );
};

export default Business;

