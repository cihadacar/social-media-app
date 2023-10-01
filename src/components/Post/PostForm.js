import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { lime } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Button, InputAdornment, OutlinedInput } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SendIcon from '@mui/icons-material/Send';

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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PostForm(props) {
    const [liked, setLiked] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const { userId, userName, refreshPosts } = props;
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [isSent, setIsSent] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSent(false);
    };
    const handleTitle = (input) => {
        setTitle(input);
        setIsSent(false);
    }
    const handleText = (input) => {
        setText(input);
        setIsSent(false);
    }
    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");
        refreshPosts();
    }
    const savePost = () => {
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                userId: userId,
                text: text,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    return (
        <div className="postContainer">
            <Snackbar open={isSent} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Your Post is Sent !
                </Alert>
            </Snackbar>
            <Card sx={{ margin: 2, marginBottom: 10, width: 900, textAlign: "left" }}>
                <CardHeader
                    avatar={
                        <Link style={{ textDecoration: "none" }} to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ bgcolor: lime[900] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    title={<OutlinedInput
                    size="small"
                        id="outlined-adornment-amount"
                        multiline
                        placeholder="Post Title"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={title}
                        onChange={(input) => handleTitle(input.target.value)}>
                    </OutlinedInput>}
                // subheader="September 14, 2016"
                />
                <CardContent>
                    <Typography style={{ marginLeft: 56 }} variant="body2" color="text.secondary">
                        {<OutlinedInput
                            id="outlined-adornment-amount"
                            multiline
                            placeholder="Write your post here.."
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(input) => handleText(input.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                        endIcon={<SendIcon />}>
                                        Post
                                    </Button>
                                </InputAdornment>
                            }>
                        </OutlinedInput>}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default PostForm;