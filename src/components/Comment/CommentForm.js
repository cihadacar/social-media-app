import { Avatar, Button, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { grey } from '@mui/material/colors';
import { AddComment } from "@mui/icons-material";
import { PostWithAuth, RefreshToken } from "../../service/HttpService";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CommentForm(props) {
    let history = useHistory();
    const { postId, userId, userName, setCommentRefresh } = props;
    const [text, setText] = useState("");

    const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("currentUserId")
        localStorage.removeItem("userName")
        history.push('/')
        window.location.reload(false)
      }

      const saveComment = () => {
        PostWithAuth("/comments",{
            postId: postId, 
            userId : userId,
            text : text,
          })
          .then((res) => {
            if(!res.ok) {
                RefreshToken()
                .then((res) => { if(!res.ok) {
                    logout();
                } else {
                   return res.json()
                }})
                .then((result) => {
                    console.log(result)

                    if(result != undefined){
                        localStorage.setItem("tokenKey",result.accessToken);
                        saveComment();
                        setCommentRefresh();
                    }})
                .catch((err) => {
                    console.log(err)
                })
            } else 
            res.json()
        })
          .catch((err) => {
            console.log(err)
          })
    }
    const handleSubmit = () => {
        saveComment();
        setText("");
        setCommentRefresh();
    }
    const handleChange = (input) => {
        setText(input);
    }

    return (
        <CardContent style={{ marginLeft: 10 }}>
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