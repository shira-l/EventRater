// // import React, { useEffect, useState, useContext, useRef } from 'react';
// // import { useParams } from 'react-router-dom';
// // import AddReview from './AddReview.jsx';
// // import ReactStars from 'react-rating-stars-component';
// // import { UserContext } from '../../UserProvider.jsx';
// // import { APIrequests } from '../../APIrequests.js';
// // import Login from '../Login.jsx';

// // const Reviews = () => {
// //     const { user } = useContext(UserContext);
// //     const [showAddReview, setShowAddReview] = useState(false);
// //     const [openLogin, setOpenLogin] = useState(false);
// //     const [reviews, setReviews] = useState([]);
// //     const [displaySeeMore, setDisplaySeeMore] = useState(false);
// //     const initialLoad = useRef(true);
// //     const seeMore = useRef(false);
// //     const range = 7;
// //     const { idBusiness } = useParams();
// //     const APIrequest = new APIrequests();
// //     const sort = "productionDate DESC";

// //     useEffect(() => {
// //         if (initialLoad.current) {
// //             getReviews();
// //             initialLoad.current = false;
// //         }
// //     }, []);

// //     useEffect(() => {
// //         setDisplaySeeMore(reviews.length % range === 0 && reviews.length !== 0);
// //     }, [reviews]);

// //     const getReviews = async () => {
// //         try {
// //             const start = seeMore.current ? reviews.length : 0;
// //             const url = `/reviews?businessId=${idBusiness}&sort=${sort}&start=${start}&range=${range}`;
// //             const response = await APIrequest.getRequest(url);
// //             setReviews(reviews => seeMore.current ? [...reviews, ...response.data] : response.data);
// //             setDisplaySeeMore(response.data.length >= range);
// //             seeMore.current = false;
// //         } catch (error) {
// //             alert(response.error);
// //             console.error('Error fetching reviews:', error);
// //         }
// //     };

// //     const handleAddReview = () => {
// //         if (openLogin) {
// //             setOpenLogin(false);
// //         } else if (!user) {
// //             setOpenLogin(true);
// //         } else {
// //             setShowAddReview(prevState => !prevState);
// //         }
// //     };

// //     const addNewReview = (newReview) => {
// //         setReviews(reviews => [newReview, ...reviews]);
// //     };

// //     const handleDeleteReview = async (reviewId) => {
// //         try {
// //             const url = `/reviews/${reviewId}`;
// //             const response = await APIrequest.deleteRequest(url);
// //             // const json = await response.json();
// //             // if (json.status !== 200) {
// //             //     alert(json.error);
// //             // } else {
// //                 setReviews(reviews => reviews.filter(review => review.idReview !== reviewId));
// //                 alert("review successfully deleted");
// //             // }
// //         } catch (error) {
// //             console.error('Error deleting review:', error);
// //         }
// //     };

// //     const handleUpdateReview = (reviewId) => {
// //         const reviewToUpdate = reviews.find(review => review.idReview === reviewId);
// //     };

// //     const handleCloseLogin = () => {
// //         setOpenLogin(false);
// //     };

// //     const handleSeeMore = () => {
// //         seeMore.current = true;
// //         getReviews();
// //     };

// //     return (
// //         <div className="reviews-container">
// //             <button onClick={handleAddReview} className="add-review-button">
// //                 Add Review
// //             </button>
// //             {showAddReview ?
// //                 <AddReview closeAddReview={() => setShowAddReview(false)} addNewReview={addNewReview} /> :
// //                 <Login open={openLogin} onClose={handleCloseLogin} />}
// //             {reviews.map(review => (
// //                 <div key={review.idOpinion} className="review-item">
// //                     <div className="review-header">
// //                         <p className="review-date">{formatDate(review.productionDate)}</p>
// //                         <p>{review.userName}</p>
// //                     </div>
// //                     <p className="review-description">{review.description}</p>
// //                     <ReactStars
// //                         count={5}
// //                         value={review.rating}
// //                         size={24}
// //                         isHalf={true}
// //                         edit={false}
// //                         activeColor="#ffd700"
// //                     />
// //                     {user && user.userName === review.userName && (
// //                         <div className="review-actions">
// //                             <button onClick={() => handleUpdateReview(review.idReview)}>Update</button>
// //                             <button onClick={() => handleDeleteReview(review.idReview)}>Delete</button>
// //                         </div>
// //                     )}

// //                     <hr className="review-divider" />
// //                 </div>
// //             ))}
// //             {displaySeeMore && <button onClick={handleSeeMore}>see more</button>}
// //         </div>
// //     );
// // };

// // const formatDate = (dateString) => {
// //     const options = { year: 'numeric', month: 'short', day: 'numeric' };
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', options);
// // };

// // export default Reviews;

// import React, { useEffect, useState, useContext, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import AddReview from './AddReview.jsx';
// import ReactStars from 'react-rating-stars-component';
// import { UserContext } from '../../UserProvider.jsx';
// import { APIrequests } from '../../APIrequests.js';
// import Login from '../Login.jsx';

// const Reviews = () => {
//     const { user } = useContext(UserContext);
//     const [showAddReview, setShowAddReview] = useState(false);
//     const [openLogin, setOpenLogin] = useState(false);
//     const [reviews, setReviews] = useState([]);
//     const [displaySeeMore, setDisplaySeeMore] = useState(false);
//     const [reviewToUpdate, setReviewToUpdate] = useState(null);
//     const initialLoad = useRef(true);
//     const seeMore = useRef(false);
//     const range = 7;
//     const { idBusiness } = useParams();
//     const APIrequest = new APIrequests();
//     const sort = "productionDate DESC";

//     useEffect(() => {
//         if (initialLoad.current) {
//             getReviews();
//             initialLoad.current = false;
//         }
//     }, []);

//     useEffect(() => {
//         setDisplaySeeMore(reviews.length % range === 0 && reviews.length !== 0);
//     }, [reviews]);

//     const getReviews = async () => {
//         try {
//             const start = seeMore.current ? reviews.length : 0;
//             const url = `/reviews?businessId=${idBusiness}&sort=${sort}&start=${start}&range=${range}`;
//             const response = await APIrequest.getRequest(url);
//             setReviews(reviews => seeMore.current ? [...reviews, ...response.data] : response.data);
//             setDisplaySeeMore(response.data.length >= range);
//             seeMore.current = false;
//         } catch (error) {
//             alert(response.error);
//             console.error('Error fetching reviews:', error);
//         }
//     };

//     const handleAddReview = () => {
//         if (openLogin) {
//             setOpenLogin(false);
//         } else if (!user) {
//             setOpenLogin(true);
//         } else {
//             setReviewToUpdate(null);
//             setShowAddReview(true);
//         }
//     };

//     const handleUpdateReview = (review) => {
//         setReviewToUpdate(review);
//         setShowAddReview(true);
//     };

//     const addNewReview = (newReview) => {
//         setReviews(reviews => {
//             const reviewIndex = reviews.findIndex(review => review.idReview === newReview.idReview);
//             if (reviewIndex !== -1) {
//                 const updatedReviews = [...reviews];
//                 updatedReviews[reviewIndex] = newReview;
//                 return updatedReviews;
//             } else {
//                 return [newReview, ...reviews];
//             }
//         });
    
//     };

//     const handleDeleteReview = async (reviewId) => {
//         try {
//             const url = `/reviews/${reviewId}`;
//             const response = await APIrequest.deleteRequest(url);
//             setReviews(reviews => reviews.filter(review => review.idReview !== reviewId));
//             alert("Review successfully deleted");
//         } catch (error) {
//             console.error('Error deleting review:', error);
//         }
//     };

//     const handleCloseLogin = () => {
//         setOpenLogin(false);
//     };

//     const handleSeeMore = () => {
//         seeMore.current = true;
//         getReviews();
//     };

//     return (
//         <div className="reviews-container">
//             <button onClick={handleAddReview} className="add-review-button">
//                 Add Review
//             </button>
//             {showAddReview &&
//                 <AddReview
//                     closeAddReview={() => setShowAddReview(false)}
//                     addNewReview={addNewReview}
//                     isUpdate={!!reviewToUpdate}
//                     reviewToUpdate={reviewToUpdate}
//                 />
//             }
//             {openLogin && <Login open={openLogin} onClose={handleCloseLogin} />}
//             {reviews.map(review => (
//                 <div key={review.idReview} className="review-item">
//                     <div className="review-header">
//                         <p className="review-date">{formatDate(review.productionDate)}</p>
//                         <p>{review.userName}</p>
//                     </div>
//                     <p className="review-description">{review.description}</p>
//                     <ReactStars
//                         count={5}
//                         value={review.rating}
//                         size={24}
//                         isHalf={true}
//                         edit={false}
//                         activeColor="#ffd700"
//                     />
//                     {user && user.userName === review.userName && (
//                         <div className="review-actions">
//                             <button onClick={() => handleUpdateReview(review)}>Update</button>
//                             <button onClick={() => handleDeleteReview(review.idReview)}>Delete</button>
//                         </div>
//                     )}
//                     <hr className="review-divider" />
//                 </div>
//             ))}
//             {displaySeeMore && <button onClick={handleSeeMore}>See More</button>}
//         </div>
//     );
// };

// const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', options);
// };

// export default Reviews;

import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AddReview from './AddReview.jsx';
import ReactStars from 'react-rating-stars-component';
import { UserContext } from '../../UserProvider.jsx';
import { APIrequests } from '../../APIrequests.js';
import Login from '../Login.jsx';
import './Reviews.css';

const Reviews = () => {
    const { user } = useContext(UserContext);
    const [showAddReview, setShowAddReview] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [displaySeeMore, setDisplaySeeMore] = useState(false);
    const [reviewToUpdate, setReviewToUpdate] = useState(null);
    const initialLoad = useRef(true);
    const seeMore = useRef(false);
    const range = 7;
    const { idBusiness } = useParams();
    const APIrequest = new APIrequests();
    const sort = "productionDate DESC";

    useEffect(() => {
        if (initialLoad.current) {
            getReviews();
            initialLoad.current = false;
        }
    }, []);

    useEffect(() => {
        setDisplaySeeMore(reviews.length % range === 0 && reviews.length !== 0);
    }, [reviews]);

    const getReviews = async () => {
        try {
            const start = seeMore.current ? reviews.length : 0;
            const url = `/reviews?businessId=${idBusiness}&sort=${sort}&start=${start}&range=${range}`;
            const response = await APIrequest.getRequest(url);
            setReviews(reviews => seeMore.current ? [...reviews, ...response.data] : response.data);
            setDisplaySeeMore(response.data.length >= range);
            seeMore.current = false;
        } catch (error) {
            alert(response.error);
            console.error('Error fetching reviews:', error);
        }
    };

    const handleAddReview = () => {
        if (openLogin) {
            setOpenLogin(false);
        } else if (!user) {
            setOpenLogin(true);
        } else {
            setReviewToUpdate(null);
            setShowAddReview(true);
        }
    };

    const handleUpdateReview = (review) => {
        setReviewToUpdate(review);
        setShowAddReview(true);
    };

    const addNewReview = (newReview) => {
        setReviews(reviews => {
            const reviewIndex = reviews.findIndex(review => review.idReview === newReview.idReview);
            if (reviewIndex !== -1) {
                const updatedReviews = [...reviews];
                updatedReviews[reviewIndex] = newReview;
                return updatedReviews;
            } else {
                return [newReview, ...reviews];
            }
        });
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const url = `/reviews/${reviewId}`;
            const response = await APIrequest.deleteRequest(url);
            setReviews(reviews => reviews.filter(review => review.idReview !== reviewId));
            alert("Review successfully deleted");
        } catch (error) {
            console.error('Error deleting review:', error);
        }
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
            <button onClick={handleAddReview} className="add-review-button">
                Add Review
            </button>
            {showAddReview &&
                <AddReview
                    closeAddReview={() => setShowAddReview(false)}
                    addNewReview={addNewReview}
                    isUpdate={!!reviewToUpdate}
                    reviewToUpdate={reviewToUpdate}
                />
            }
            {openLogin && <Login open={openLogin} onClose={handleCloseLogin} />}
            {reviews.map(review => (
                <div key={review.idReview} className="review-item">
                    <div className="review-header">
                        <p className="review-user-name">{review.userName}</p>
                        <p className="review-date">{formatDate(review.productionDate)}</p>
                    </div>
                    <p className="review-description">{review.description}</p>
                    <div className="review-stars">
                        <ReactStars
                            count={5}
                            value={review.rating}
                            size={24}
                            isHalf={true}
                            edit={false}
                            activeColor="#ffd700"
                        />
                    </div>
                    {user && user.userName === review.userName && (
                        <div className="review-actions">
                            <button onClick={() => handleUpdateReview(review)}>Update</button>
                            <button onClick={() => handleDeleteReview(review.idReview)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
            {displaySeeMore && <button onClick={handleSeeMore}>See More</button>}
        </div>
    );
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

export default Reviews;
