import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { deepOrange } from '@mui/material/colors';
import { Logout } from "@mui/icons-material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Navbar() {
  let history = useHistory();
  const link = {
    textDecoration: "none", boxShadow: "none", color: "white"
  }
  const title = {
    flexGrow: 1,
    textAlign: "left"
  }
  const handleLogout = () => {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUserId")
    localStorage.removeItem("userName")
    history.push('/')
    window.location.reload(false)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={link} sx={{ bgcolor: deepOrange[600] }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={title} variant="h6" component="div">
            <Link style={link} to="/">Home</Link>
          </Typography>
          <Typography variant="h6" component="div">
            {localStorage.getItem("currentUserId") == null ? <Link style={link} to="/auth">Login/Register</Link> :
              <div>
                <Link style={{ marginRight: 20, textDecoration: "none", boxShadow: "none", color: "white" }}
                  to={{ pathname: '/users/' + localStorage.getItem("currentUserId") }}> {localStorage.getItem("userName").toLocaleUpperCase()} Profile</Link>
                <IconButton onClick={handleLogout}><Logout style={link}></Logout></IconButton>
              </div>}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box >
  );
}

export default Navbar;