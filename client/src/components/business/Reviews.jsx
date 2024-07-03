import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AddReview from './AddReview.jsx';
import ReactStars from 'react-rating-stars-component';
import { UserContext } from '../../UserProvider.jsx';
import { APIrequests } from '../../APIrequests.js';
import Login from '../Login';



const Reviews = () => {
    const { user } = useContext(UserContext);
    const [showAddReview, setShowAddReview] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [displaySeeMore, setDisplaySeeMore] = useState(false);
    const seeMore = useRef(false);
    const range = 15;
    const { idBusiness } = useParams();
    const APIrequest = new APIrequests();
    
    useEffect(() => {
        if (reviews.length === 0) {
            getReviews();
        }
    }, []);

    const getReviews = async () => {
        try {
            const sort = "productionDate DESC";
            let start = seeMore.current ? businesses.length : 0;
            const url = `/reviews?businessId=${idBusiness}&start=${start}&range=${range}&sort=${sort}`;
            const response = await APIrequest.getRequest(url);
            const json = await response.json();
            if (json.status !== 200) {
                alert(json.error);
            } else {
                setReviews(json.data);
                setDisplaySeeMore(json.data.length >= range);
                seeMore.current = false;    
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleAddReview = () => {
        if(openLogin) {
            setOpenLogin(false);
        } else if (!user) {
            setOpenLogin(true);
        } else {
            setShowAddReview(prevState => !prevState);
        }
    };

    const addNewReview = (newReview) => {
        console.log("reviews", reviews);
        console.log("newReview", newReview);
        setReviews(reviews => [newReview, ...reviews]);
        console.log("reviews", reviews);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    const handleSeeMore = () => {
        seeMore.current = true;
        getReviews();
    };

    return (
        <div className="reviews-container">
            <button onClick={()=>handleAddReview()} className="add-review-button">
                Add Review
            </button>
            {showAddReview ? <AddReview closeAddReview={()=>setShowAddReview(false)} addNewReview={addNewReview}/> : 
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
            {displaySeeMore && <button onClick={handleSeeMore}>see more</button>}
        </div>
    );
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

export default Reviews;


