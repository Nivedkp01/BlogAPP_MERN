import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Comments.css';

function Comments() {
    const { id } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/comment/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                return response.json();
            })
            .then((data) => {
                setComments(data.comments);
            })
            .catch((error) => console.error(error));
    }, [id]);

    return (
        <div className='comments'>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment, index) => (
                    
                    comment.text?
                    <div className='cmnts' key={index}>
                        <h4>👤{comment.author}</h4>
                        <p>{comment.text}</p>
                    </div>:null
                ))}
            </ul>
        </div>
    );
}

export default Comments;
