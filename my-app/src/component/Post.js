import React from 'react';
import './Post.css';

const Post = ({ title, author, content, onClick }) => {
  return (
    <div className="post" onClick={onClick}>
      <p><strong>Title:</strong> {title}</p>
      <p><strong>Author:</strong> {author}</p>
      <p><strong>Content:</strong> {content}</p>
    </div>
  );
};

export default Post;
