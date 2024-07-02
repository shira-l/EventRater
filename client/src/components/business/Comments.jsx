import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Comments = ({ comments }) => (
    <div>
        {comments.map(comment => (
            <div key={comment.id}>
                <h3>{comment.author}</h3>
                <p>{comment.text}</p>
                <ReactStars
                    count={5}
                    value={comment.rating}
                    size={24}
                    isHalf={true}
                    edit={false}
                    activeColor="#ffd700"
                />
                <p>{comment.date}</p>
            </div>
        ))}
    </div>
);

export default Comments;
