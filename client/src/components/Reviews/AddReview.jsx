import React, { useState, useContext, useRef } from 'react';
import ReactStars from 'react-rating-stars-component';
import { APIrequests } from '../../APIrequests.js';
import { UserContext } from '../../UserProvider';
import { useParams } from 'react-router-dom';


const AddReview = ({closeAddReview, addNewReview}) => {
    const { idBusiness } = useParams();
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('You need to be logged in to add a review.');
            history.push('/login');
            return;
        }

        try {
            const APIrequest = new APIrequests();
            const date = convertToMySQLDateTime(new Date().toISOString());
            const newReview = {
                "rating": rating,
                "description": reviewText,
                "userId": user.idUser,
                "businessId": idBusiness,
                "productionDate": date
            }
            const url = `/reviews`;
            const response = await APIrequest.postRequest(url, newReview);
            alert('Your review was added successfully');
            newReview.userName = user.userName;
            addNewReview(newReview);
            closeAddReview();
            setReviewText('');
            setRating(0);
        } catch (error) {
            alert('Error adding review');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Add your review"
                required
            />
            <ReactStars
                count={5}
                value={rating}
                size={24}
                isHalf={true}
                edit={true}
                onChange={(newRating) => setRating(newRating)}
                activeColor="#ffd700"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

const convertToMySQLDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};


export default AddReview;