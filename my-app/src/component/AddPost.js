import React, { useState } from 'react';
import './AddPost.css'; // Ensure to create appropriate CSS for this component

const AddPost = ({ onAddPost }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !author || !content) {
            alert('All fields must be filled!');
            return;
        }
        onAddPost({ title, author, content });
        setTitle('');
        setAuthor('');
        setContent('');
    };

    return (
        <form className="add-post-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit">Add Post</button>
        </form>
    );
};

export default AddPost;
