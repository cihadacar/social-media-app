import { Avatar, Button, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { grey } from '@mui/material/colors';
import { AddComment } from "@mui/icons-material";

function CommentForm(props) {
    const { postId, userId, userName } = props;
    const [text, setText] = useState("");

    const saveComment = () => {
        fetch("/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
                text: text,
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }
    const handleSubmit = () => {
        saveComment();
        setText("");
    }
    const handleChange = (input) => {
        setText(input);
    }

    return (
        <CardContent style={{marginLeft:10}}>
            <OutlinedInput
                size="small"
                placeholder="Write your comment here.."
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                value={text}
                onChange={(input) => handleChange(input.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link style={{ textDecoration: "none" }} to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ width: 27, height: 27, bgcolor: grey[800] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                        color="secondary"
                        size="small"
                            variant="outlined"
                            onClick={handleSubmit}
                            endIcon={<AddComment />}>
                            Comment
                        </Button>
                    </InputAdornment>
                }>

            </OutlinedInput>
        </CardContent>
    )
}

export default CommentForm;