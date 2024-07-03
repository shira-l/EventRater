import React from 'react';

const Contact = ( {business} ) => {
    console.log("business",business);
    return (
        <div className="contact-details">
            <h2>Contact Details</h2>
            <p>Phone: {business.phone}</p>
            <p>Email: <a href={`mailto:${business.email}`}>{business.email}</a></p>
        </div>
    );
};

export default Contact;