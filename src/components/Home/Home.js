import React, { useState, useEffect } from 'react';
import Post from "../Post/Post";
import PostForm from '../Post/PostForm';
import { deepOrange } from '@mui/material/colors';

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const myContainer = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: deepOrange[50],
    }

    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setPostList(result)
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refreshPosts();
    }, [postList])

    if (error) {
        return <div>Error !! </div>
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return (
            <div style={myContainer}>
                {localStorage.getItem("currentUserId") == null ? "" :
                    <PostForm userId={localStorage.getItem("currentUserId")} userName={localStorage.getItem("userName")} refreshPosts={refreshPosts} />}
                {postList.map(post => (
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName}
                        title={post.title} text={post.text}></Post>

                ))}
            </div>
        );
    }
}

export default Home;