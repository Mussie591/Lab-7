import React from 'react';
import Post from './Post';
import './Posts.css';

const Posts = ({ posts, handlePostClick }) => {
  return (
    <div className="posts">
      {posts.map((post, index) => (
        <Post
          key={index}
          title={post.title}
          author={post.author}
          content={post.content}
          onClick={() => handlePostClick(post)}
        />
      ))}
    </div>
  );
};

export default Posts;
