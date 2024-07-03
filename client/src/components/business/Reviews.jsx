import React, { useState, useContext  } from 'react';
import AddReview from './AddReview.jsx';
import ReactStars from 'react-rating-stars-component';
import { UserContext } from '../../UserProvider.jsx';
import Login from '../Login';



const Reviews = ({ reviews }) => {
    const { user } = useContext(UserContext);
    const [showAddReview, setShowAddReview] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    const handleAddReview = () => {
        if (!user) {
            setOpenLogin(true);
        } else {
            setShowAddReview(prevState => !prevState);
        }
    };

    const closeAddReview = () => {
        setShowAddReview(false);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };


    return (
        <div className="reviews-container">
            <button onClick={()=>handleAddReview()} className="add-review-button">
                Add Review
            </button>
            {showAddReview ? <AddReview businessId={4} closeAddReview={closeAddReview}/> : 
            <Login open={openLogin} onClose={handleCloseLogin} /> }
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


