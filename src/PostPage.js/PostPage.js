import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import './PostPage.css';
import Star from '../Post/Star';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { NewUserContext } from '../NewContext/NewContext';

function PostPage() {
    const { id } = useParams();
    const [page, setPage] = useState(null);
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const { userInfo } = useContext(NewUserContext); // Using useContext to access userInfo from the context
  

    useEffect(() => {
        fetch(`http://localhost:3000/post/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch post data');
                }
                return response.json();
            })
            .then((data) => setPage(data))
            .catch((error) => console.error(error));
    }, [id]);

    function dateFormat(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    async function handleComment(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/comment', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comment, pageId: page._id, author: userInfo.username })
            });
            if (response.ok) {
                console.log('comment added');
                setComment('');
                alert('Comment Added');
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (!page) {
        return <div>Loading...</div>;
    }

    return (
        <div className='newbox'>
       
            <div className='post'>
           
                <div className='content'>
                <Link to={`/edit/${page._id}`}>
                <button className='edit'>Edit📝</button>
                </Link>
                    <div className='card'>
               
                        <img className='image' src={`http://localhost:3000/${page.fileurl}`} alt='Post Image' />
                        <div className='details'>
                            <div>
                            
                                <h1 className='title'>{page.title}</h1>
                            </div>
                            <Star roll={page._id} />
                            <p className='para'>{page.content}</p>
                            <div className='daate'>
                                <p>Created At: {dateFormat(page.createdAt)}</p>
                                <p>Last updated At: {dateFormat(page.updatedAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='inp'>
                <textarea
                    placeholder='Add Your Comment Here..'
                    className='area'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className='btns'>
                    <button className='btn' onClick={handleComment}>Add Comment</button>
                    <Link to={`/comment/${id}`}>
                        <button className='btn'>View Comments</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PostPage;
