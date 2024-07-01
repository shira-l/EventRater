import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './BusinessList.css';

const BusinessList = ({ businesses }) => {

    const getMinPrice = (prices) => {
        console.log(prices);
        return Math.min(...prices.map(price => price.price));
      };

    return (
        <div className="business-list">
            {businesses.map((business) => (
                <Link to={`/businesses/${business.idBusiness}`} key={business.idBusiness} className="business-link">
                    <div className="business-item">
                        <h2 className="business-name">{business.userName}</h2>
                        <p className="business-location">Location: {business.locationName}</p>
                        <p className="business-price"> Price: {getMinPrice(business.price)}</p>
                        <div className="business-rating">
                            <span>Comments: {business.opinionCount}</span>
                            <br />
                            <span>Average Rating
                                <ReactStars
                                    count={5}
                                    value={business.averageRating}
                                    size={24}
                                    isHalf={true}
                                    edit={false}
                                    activeColor="#ffd700"
                                />
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BusinessList;