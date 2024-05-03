import React, { useEffect, useState } from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';



function Post() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [skip,setSkip]=useState(0)
    const limit=20;
   


    function handleNext() {
        if (skip+limit <=posts.length) {
            setSkip(skip + limit);
        }
        
    }
    
    function handlePrev() {
        if (skip-limit >= limit) {
            setSkip(skip - limit);
        }
    }
    

    useEffect(() => {
        fetch(`http://localhost:3000/post?search=${searchQuery}$limit=${limit}&skip=${skip}`)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                console.log('Posts:', data); 
            })
            .catch(error => {
                console.error('Error fetching post data:', error);
            });
    }, [searchQuery]);

    function dateFormat(dateString) {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    // const filteredPosts = posts.filter(post => {
    //     return (post.title.toLowerCase().includes(searchQuery.toLowerCase()));
    // });

    return (
        <div className='outerb'>
            <div className='searchdiv'>
                <div className='s'>
                    <input
                        className='search'
                        type='text'
                        placeholder='Search blog..'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        
                    />
                    <FaSearch  className='se'/>
                    

                </div>
            </div>

            {posts.length > 0 ? (
                posts.map(post => (
                    <div className='card' key={post._id}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/post/${post._id}`}>
                            <img className='image' src={`http://localhost:3000/${post.fileurl}`} alt='Post Image' />
                        </Link>
                        <div>
                            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/post/${post._id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{post.summary}</p>
                            <div className='info'>
                                <h4>Rating: {post.rate}⭐</h4>
                                <p>Created At: {dateFormat(post.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div>No matching posts found.</div>
            )}
                <button onClick={handleNext}>⬅️</button>
                <button onClick={handlePrev}>➡️</button>
        </div>
    );
}

export default Post;
