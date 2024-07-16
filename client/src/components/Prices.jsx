import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { APIrequests } from '../APIrequests.js';

const Prices = () => {
    const { idBusiness } = useParams();
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const APIrequest = new APIrequests();

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const url = `/prices?businessId=${idBusiness}`;
                const response = await APIrequest.getRequest(url);
                setPrices(response.data);
            } catch (error) {
                console.error('Error fetching prices:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, [idBusiness]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="prices-container" style={{ marginLeft: "1.5cm" }}>
            <h2>Prices</h2>
        {prices.map(price => (
                <div key={price.id}>
                <span>{price.itemDescription + "        "}</span>
                <span>${price.itemPrice}</span>
        </div>
        ))}
    </div>

    );
};

export default Prices;