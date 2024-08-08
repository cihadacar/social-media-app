import React, { useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";
import { deepOrange } from '@mui/material/colors';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { GetWithAuth } from "../../service/HttpService";

function User() {
    const {userId} = useParams();
    const [user, setUser] = useState();
    const myContainer = {
        display: "flex",
        backgroundColor: deepOrange[50],
        height: '95vh'
    }

    const getUser = () => {
        GetWithAuth("/users/" + userId)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                setUser(result);
            },
            (error) => {
                console.log(error)
            }
        )
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div style={myContainer}>
            {user? <Avatar avatarId={user.avatarId}/> : ""}
            <UserActivity userId={userId} />
        </div> 
    );
}

export default User;