// // import React from 'react';
// // import ReactStars from 'react-rating-stars-component';

// // const Comments = ({ comments }) => (
// //     <div>
// //         {comments.map(comment => (
// //             <div key={comment.idOpinion}>
// //                 <h3>{comment.userName}</h3>
// //                 <p>{comment.description}</p>
// //                 <ReactStars
// //                     count={5}
// //                     value={comment.rating}
// //                     size={24}
// //                     isHalf={true}
// //                     edit={false}
// //                     activeColor="#ffd700"
// //                 />
// //                 <p>{comment.productionDate}</p>
// //             </div>
// //         ))}
// //     </div>
// // );

// // export default Comments;

// import React from 'react';
// import ReactStars from 'react-rating-stars-component';
// // import './Comments.css'; // קובץ עם עיצובים נוספים לקומפוננטה

// const Comments = ({ comments }) => (
//     <div className="comments-container">
//         {comments.map(comment => (
//             <div key={comment.idOpinion} className="comment-item">
//                 <div className="comment-header">
//                     <h3>{comment.userId}</h3>
//                     <p className="comment-date">{formatDate(comment.productionDate)}</p>
//                 </div>
//                 <hr className="comment-divider" />
//                 <p className="comment-description">{comment.description}</p>
//                 <ReactStars
//                     count={5}
//                     value={comment.rating}
//                     size={24}
//                     isHalf={true}
//                     edit={false}
//                     activeColor="#ffd700"
//                 />
//             </div>
//         ))}
//     </div>
// );

// // פונקציה לפורמט מהתאריך הסטנדרטי של JavaScript
// const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', options);
// };

// export default Comments;


import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Comments = ({ comments }) => (
    <div className="comments-container">
        {comments.map(comment => (
            <div key={comment.idOpinion} className="comment-item">
                <div className="comment-header">
                    <p className="comment-date">{formatDate(comment.productionDate)}</p>
                    <p>{comment.userName}</p>
                </div>
                <p className="comment-description">{comment.description}</p>
                <ReactStars
                    count={5}
                    value={comment.rating}
                    size={24}
                    isHalf={true}
                    edit={false}
                    activeColor="#ffd700"
                />
                <hr className="comment-divider" />
            </div>
        ))}
    </div>
);

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

export default Comments;


