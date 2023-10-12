import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Authentication() {

    let history = useHistory();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsername = (value) => {
        setUsername(value)
    }
    const handlePassword = (value) => {
        setPassword(value)
    }
    const handleButton = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        history.go("/auth")
    }
    const sendRequest = (path) => {
        fetch("/auth/" + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: username,
                password: password,
            }),
        }).then((res) => res.json())
            .then((result) => {
                console.log(result);
                localStorage.setItem("tokenKey", result.message);
                localStorage.setItem("currentUserId", result.userId);
                localStorage.setItem("userName", username)
            })
            .catch((err) => console.log(err))
    }

    return (
        <FormControl style={{ margin: 50 }}>
            <InputLabel>Username</InputLabel>
            <Input onChange={(input) => handleUsername(input.target.value)} />
            <InputLabel style={{ top: 80 }}>Password</InputLabel>
            <Input style={{ top: 40 }}
                onChange={(input) => handlePassword(input.target.value)} />
            <Button color="secondary" variant="outlined" style={{ top: 80 }}
                onClick={() => handleButton("register")}>Register</Button>
            <FormHelperText style={{ color: "black", fontSize: 18, marginTop: 150 }}>Are you already registered?</FormHelperText>
            <Button color="secondary" variant="contained" style={{ top: 10 }}
                onClick={() => handleButton("login")}>Login</Button>
        </FormControl>
    )
}

export default Authentication;