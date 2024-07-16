
import React, { useContext, useState } from 'react';
import { UserContext } from '../UserProvider.jsx';
import Login from './Login';

const Contact = ({ business }) => {
    const { user } = useContext(UserContext);
    const [openLogin, setOpenLogin] = useState(false);

    const handleEmailClick = (event) => {
        if (user) {
            const subject = encodeURIComponent("A message from my website");
            const messageText = encodeURIComponent("Hi, I wanted to contact you about...");
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${business.email}&su=${subject}&body=${messageText}`;
            window.open(gmailUrl);
        } else {
            setOpenLogin(true);
        }
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    return (
        <div className="contact-card" style={{ marginLeft: "1cm" }}>    
            <h2>Contact Details</h2>
            <div className="contact-info">
                <p>Phone: {business.phone}</p>
                <p>
                    Send Email: 
                    <span 
                        style={{ cursor: 'pointer', color: '#ff69b4', textDecoration: 'underline' }} 
                        onClick={handleEmailClick}
                    >
                        {business.email}
                    </span>
                </p>
            </div>
            <Login open={openLogin} onClose={handleCloseLogin} />
        </div>
    );
};

export default Contact;
