import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const BusinessList = ({ businesses }) => {
    return (
        <div className="business-list">
            {businesses.map((business) => (
                <Link to={`/businesses/${business.idBusiness}`} state={{ business }} key={business.idBusiness} className="business-link">
                    <div className="business-item">
                        <div className="business-details">
                            <div className="business-name">
                                <h2>{business.userName}</h2>
                            </div>
                            <div className="business-location">
                                <p>Location</p>
                                <p>{business.locationName}</p>
                            </div>
                            <div className="business-prices">
                                <p>Price</p>
                                <p>${business.minPrice} - ${business.maxPrice}</p>
                            </div>
                            <div className="business-rating">
                                <p>Reviews: {business.reviewCount}</p>
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
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BusinessList;