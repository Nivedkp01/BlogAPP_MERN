import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './Star.css';

function Star({ roll }) {
    const num = 5;
    const [hover, setHover] = useState(0);
    const [rate, setRate] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [avgrating, setAvgRating] = useState(0); // State to store average rating



    async function handleClick(index) {
        setRate(index);

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/rate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rate: index, postId: roll })
            });

            if (!response.ok) {
                throw new Error('Failed to send rating to server');
            }

            const data = await response.json();
            setAvgRating(parseFloat(data.rate));
        } catch (error) {
            console.error('Error sending or processing rating:', error);
            setError('Failed to send or process rating');
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetch('http://localhost:3000/rate')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                const ratedPost = data.find(item => item._id === roll);
                if (ratedPost) {
                    setAvgRating(ratedPost.rate);
                }
            })
            .catch(err => {
                console.error('Error in fetching rate:', err);
            });
    }, [roll]);
    

    function handleMouseEnter(index) {
        setHover(index);
    }

    function handleMouseOut() {
        setHover(0);
    }

    return (
        <div>
            {[...Array(num)].map((_, index) => (
                <FaStar
                    key={index}
                    size={40}
                    onClick={() => handleClick(index + 1)}
                    onMouseEnter={() => handleMouseEnter(index + 1)}
                    onMouseOut={handleMouseOut}
                    className={index + 1 <= (rate || hover) ? 'active' : 'inactive'}
                />
            ))}
            <br />
            <h4>Average Rating: {avgrating}⭐</h4>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default Star;
