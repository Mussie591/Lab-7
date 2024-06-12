import React from 'react';
import './PostDetails.css';

const PostDetails = ({ id, title, author, content, comments, handleDelete, handleUpdate }) => {
    return (
        <div className="post-details">
            <h2>{title.replace('Title: ', '')}</h2>
            <p className="author">{author}</p>
            <p className="content">{content}</p>
            {Array.isArray(comments) && comments.map((comment, index) => (
                <p key={index}>{comment.name}</p> // Ensure comments is an array before mapping
            ))}
            <button className="edit" onClick={() => handleUpdate({ id, title, author, content })}>edit</button>
            <button className="delete" onClick={() => handleDelete(id)}>delete</button>
        </div>
    );
};

export default PostDetails;
