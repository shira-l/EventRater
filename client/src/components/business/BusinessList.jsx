import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './BusinessList.css';

const BusinessList = ({ businesses }) => {
    return (
        <div className="business-list">
            {businesses.map((business) => (
                <Link to={`/businesses/${business.idBusiness}`} state={{ business }} key={business.idBusiness} className="business-link">
                    <div className="business-item">
                        <h2 className="business-name">{business.userName}</h2>
                        <p className="business-location">Location: {business.locationName}</p>
                        <div className="business-prices">
                            <p>Price: ${business.minPrice} - ${business.maxPrice}</p>
                        </div>
                        <div className="business-rating">
                            <span>Reviews: {business.reviewCount}</span>
                            <br />
                            <ReactStars
                                count={5}
                                value={business.averageRating}
                                size={24}
                                isHalf={true}
                                edit={false}
                                activeColor="#ffd700"
                            />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BusinessList;