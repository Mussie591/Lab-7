import React, { useState, useEffect } from 'react';
import Posts from '../component/Posts';
import PostDetails from '../component/PostDetails';
import AddPost from '../component/AddPost'; // Make sure to import AddPost
import './Dashboard.css';

const Dashboard = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [name, setName] = useState('');
    const [postsData, setPostsData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/posts')
            .then(response => response.json())
            .then(data => setPostsData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handlePostClick = (post) => {
        fetch(`http://localhost:8080/api/v1/posts/${post.id}/comments`)
            .then(response => response.json())
            .then(comments => {
                setSelectedPost({ ...post, comments: comments });
                setName(post.title);
            })
            .catch(error => console.error('Error fetching post details:', error));
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/v1/posts/${id}`, { method: 'DELETE' })
            .then(() => setPostsData(postsData.filter(post => post.id !== id)))
            .catch(error => console.error('Error deleting post:', error));
    };

    const handleUpdate = () => {
        const updatedPost = { ...selectedPost, title: name };
        fetch(`http://localhost:8080/api/v1/posts/${updatedPost.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPost)
        })
        .then(response => response.json())
        .then(updatedPost => {
            setPostsData(postsData.map(p => p.id === updatedPost.id ? updatedPost : p));
            setSelectedPost(updatedPost);
        })
        .catch(error => console.error('Error updating post:', error));
    };

    const handleAddPost = (postData) => {
        fetch('http://localhost:8080/api/v1/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(newPost => setPostsData([...postsData, newPost]))
        .catch(error => console.error('Error adding post:', error));
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <Posts posts={postsData} handlePostClick={handlePostClick} />
            <div className="change-and-details">
                <div className="change-name-container">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className="change-name" onClick={handleUpdate}>
                        Change Name
                    </button>
                </div>
                {selectedPost && (
                    <PostDetails
                        {...selectedPost}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                    />
                )}
                <AddPost onAddPost={handleAddPost} />
            </div>
        </div>
    );
};

export default Dashboard;
