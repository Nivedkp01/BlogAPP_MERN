import React, { useEffect, useState } from 'react';
import './Edit.css';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [files, setFiles] = useState([]);
    const [content, setContent] = useState('');
    const [postId, setpostId] = useState();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:3000/post/' + id)
            .then(response => {
                return (response.json());
            })
            .then(data => {
                console.log(data);
                setTitle(data.title);
                setSummary(data.summary);
                setContent(data.content);
                // setFiles(data.fileurl)
            });
    }, []);

    async function handleEditPost(e) {
        e.preventDefault()
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id',id)
    
        if (files.length > 0) {
          data.set('file', files[0]);
        }
        const response=await fetch('http://localhost:3000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include'
        });
        if(response.ok)
        {
            navigate('/post'+id)
        }
    }

    return (
        <div className='outerbox'>
            <div className='create'>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title Here' />
                <input type='text' value={summary} onChange={(e) => setSummary(e.target.value)} placeholder='Enter Summary Here' />
                <input type='file' onChange={(e) => { setFiles(e.target.files); }} />
                <textarea
                    className='areab'
                    value={content}
                    onChange={(e) => setContent(e.target.value)} // Change here
                    placeholder='Add Your Text'
                />
                <button onClick={handleEditPost}>Update Post</button>
            </div>
        </div>
    );
}

export default Edit;
