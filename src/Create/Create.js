import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Create.css';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState('');
  const [id, setId] = useState()
  const navigate = useNavigate()

  async function handleCreatePost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);

    if (files.length > 0) {
      data.set('file', files[0]);
    }

    try {
      const response = await fetch('http://localhost:3000/post', {
        method: 'POST',
        body: data,
        credentials: 'include'
      });

      if (response.ok) {
        navigate('/')
      }
      // Handle response
    } catch (error) {
      console.error('Error creating post:', error);
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

        <button onClick={handleCreatePost}>Create Post</button>
      </div>
    </div>
  );
}

export default Create;
