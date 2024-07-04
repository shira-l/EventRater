// import React, { useContext, useState } from 'react';
// import { UserContext } from '../../UserProvider.jsx';
// import Login from '../Login.jsx';

// const Contact = ( {business} ) => {
//     const { user } = useContext(UserContext);
//     const [openLogin, setOpenLogin] = useState(false);
    
//     const handleEmailClick = (event) => {
//         if (!user) {
//             event.preventDefault();
//             const subject = encodeURIComponent("הודעה מהאתר שלי");
//             const messageText = encodeURIComponent("שלום,\n\nאני רוצה ליצור קשר עמך בנוגע להזמנה שלך. אנא צרו איתי קשר.");
//             window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${business.email}&su=${subject}&body=${messageText}`);
//             setOpenLogin(true);
//         }
//     };
    
//     const handleCloseLogin = () => {
//         setOpenLogin(false);
//     };
    
//     return (
//         <div className="contact-details">
//             <h2>Contact Details</h2>
//             <p>Phone: {business.phone}</p>
//             <p>Email: <a href={`mailto:${business.email}`} onClick={handleEmailClick}>{business.email}</a></p>
//             <Login open={openLogin} onClose={handleCloseLogin} />
//         </div>
//     );
// };

// export default Contact;

import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserProvider.jsx';
import Login from '../Login';

const Contact = ({ business }) => {
    const { user } = useContext(UserContext);
    const [openLogin, setOpenLogin] = useState(false);

    const handleEmailClick = (event) => {
        // event.preventDefault(); // מניעת הפעלה של פעולת ברירת המחדל של הלינק

        if (user) {
            const subject = encodeURIComponent("הודעה מהאתר שלי");
            const messageText = encodeURIComponent("שלום וברכה");
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${business.email}&su=${subject}&body=${messageText}`;
            
            // פתיחת Gmail בחלון חדש
            window.open(gmailUrl);
        } else{
            setOpenLogin(true);
        }
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    return (
        <div className="contact-details">
            <h2>Contact Details</h2>
            <p>Phone: {business.phone}</p>
            <p>send Email: <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={handleEmailClick}>{business.email}</span></p>
            <Login open={openLogin} onClose={handleCloseLogin} />
        </div>
    );
};

export default Contact;
