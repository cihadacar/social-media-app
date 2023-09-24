import React, { useState, useEffect } from 'react';
import Post from "../Post/Post";

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const myContainer = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#00acc1',
        height: '100vh'
    }

    useEffect(() => {
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
    }, [])

    if (error) {
        return <div>Error !! </div>
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return (
            <div style={myContainer}>
                {postList.map(post => (
                    <Post userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>

                ))}
            </div>
        );
    }
}

export default Home;