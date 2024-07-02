import React, { useState, useContext  } from 'react';
import AddReview from './AddReview.jsx';
import ReactStars from 'react-rating-stars-component';
import { UserContext } from '../../UserProvider.jsx';



const Reviews = ({ reviews, businessId }) => {
    const { user } = useContext(UserContext);
    const [showAddReview, setShowAddReview] = useState(false);

    // const handleAddReview = () => {
    //     if (!user) {
    //         alert('You need to be logged in to add a review.');
    //     } else {
    //         setShowAddReview(prevState => !prevState);
    //     }
    // };

    const closeAddReview = () => {
        setShowAddReview(false);
    };

    return (
        <div className="reviews-container">
            <button onClick={setShowAddReview(!showAddReview)} className="add-review-button">
                Add Review
            </button>
            {showAddReview && <AddReview businessId={businessId} closeAddReview={closeAddReview}/>}
            {/* {showAddReview && {user == null ? <Box sx={{ flexGrow: 10}}><Login /></Box> : <AddReview businessId={businessId} closeAddReview={closeAddReview}/>}} */}
            {reviews.map(review => (
                <div key={review.idOpinion} className="review-item">
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
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

export default Reviews;


