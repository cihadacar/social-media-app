import React, { useEffect, useRef, useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { orange } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom/cjs/react-router-dom";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { DeleteWithAuth, PostWithAuth } from "../../service/HttpService";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function Post(props) {
    const { postId, userId, userName, title, text, likes } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikeCount] = useState(likes.length);
    const [likeId, setLikeId] = useState(null);
    const isInitialMount = useRef(true);
    let disabled = localStorage.getItem("currentUserId") == null ? true : false;

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            saveLike();
            setLikeCount(likesCount + 1)
        } else {
            deleteLike();
            setLikeCount(likesCount - 1)
        }
    }
    const refreshComments = () => {
        fetch("/comments?postId=" + postId)
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setCommentList(result)
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }
    const saveLike = () => {
        PostWithAuth("/likes", {
            postId: postId,
            userId: localStorage.getItem("currentUserId")
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }
    const deleteLike = () => {
        DeleteWithAuth("/likes/" + likeId)
            .catch((err) => console.log(err))
    }

    const checkLikes = () => {
        var likeControl = likes.find((like => "" + like.userId === localStorage.getItem("currentUserId")));
        if (likeControl != null) {
            setLikeId(likeControl.id);
            setIsLiked(true);
        }
    }
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else {
            refreshComments();
        }
    }, [commentList])

    useEffect(() => { checkLikes() }, [])

    return (
        <div className="postContainer">
            <Card sx={{ margin: 1, marginLeft: 40, marginRight: 40, width: 800, textAlign: "left" }}>
                <CardHeader
                    avatar={
                        <Link style={{ textDecoration: "none" }} to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ bgcolor: orange[800] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={title}
                // subheader="September 14, 2016"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {disabled ?
                        <IconButton
                            disabled
                            onClick={handleLikeClick}
                            aria-label="add to favorites"
                        >
                            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                        </IconButton> :
                        <IconButton onClick={handleLikeClick} aria-label="add to favorites">
                            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                        </IconButton>}
                    {likesCount}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon style={{ margin: 10, marginRight: 20 }} />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {error ? "error" :
                            isLoaded ? commentList.map(comment => (
                                <Comment userId={userId} userName={userName} text={comment.text}></Comment>
                            )) : "Loading"}
                        {disabled ? "" :
                            <CommentForm userId={userId} userName={localStorage.getItem("userName")} postId={postId}></CommentForm>}
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}

export default Post;