// import React, { useState } from 'react';
// import ReactStars from 'react-rating-stars-component';
// import { APIrequests } from '../../APIrequests.js';


// const AddReview = ({ businessId }) => {
//   const [reviewText, setReviewText] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
//       if (!token) {
//         alert('You need to be logged in to add a review.');
//         history.push('/login');
//         return;
//       }

//     //   const requestBody = {
//     //     "rating": parse,
//     //     "description": parse,
//     //     "userId": businessDetails.email,
//     //     "businessId": businessDetails.userName
//     //     }
//     //     const response = await APIrequest.postRequest(`/reviews`, requestBody);


//       await axios.post('/api/reviews', { reviewText, businessId }, config);
//       alert('Review added successfully');
//       setReviewText('');
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         alert('You need to be logged in to add a review.');
//         history.push('/login');
//       } else {
//         alert('Error adding review');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea
//         value={reviewText}
//         onChange={(e) => setReviewText(e.target.value)}
//         placeholder="Add your review"
//         required
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default AddReview;

import React, { useState, useContext } from 'react';
import ReactStars from 'react-rating-stars-component';
import { APIrequests } from '../../APIrequests.js';
import { UserContext } from '../../UserProvider';
import {Login} from '../../Login.js';

const AddReview = ({ businessId }) => {
    console.log(businessId);
    const { user } = useContext(UserContext);
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
            const reviewData = {
                "rating": rating,
                "description": reviewText,
                "userId": user.id,
                "businessId": businessId
            }
            const response = await APIrequest.postRequest(`/reviews`, reviewData);
            if(response.statusCode === 200) {
                alert('Your review was added successfully');
            }
            setReviewText('');
            setRating(0);
            setShowAddReview(false); 
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

export default AddReview;
