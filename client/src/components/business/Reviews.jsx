
import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Reviews = ({ reviews }) => (
    <div className="reviews-container">
        {reviews.map(review => (
            <div key={review.idReview} className="review-item">
                <div className="review-header">
                    <p className="review-date">{formatDate(review.productionDate)}</p>
                    <p>{review.userName}</p>
                </div>
                <p className="review-description">{review.description}</p>
                <ReactStars
                    count={5}
                    value={review.rating}
                    size={24}
                    isHalf={true}
                    edit={false}
                    activeColor="#ffd700"
                />
                <hr className="review-divider" />
            </div>
        ))}
    </div>
);

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

export default Reviews;


