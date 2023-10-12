import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { grey } from '@mui/material/colors';

function Comment(props) {
    const { text, userId, userName } = props;

    return (
        <CardContent>
            <OutlinedInput
                size="small"
                readOnly="true"
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Link style={{ textDecoration: "none" }} to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ width: 27, height: 27, bgcolor: grey[800] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }>
            </OutlinedInput>
        </CardContent>
    )
}

export default Comment;