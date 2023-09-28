import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { lime } from '@mui/material/colors';

function Navbar() {
  let userId = 5;
  const link = {
    textDecoration: "none", boxShadow: "none", color: "#696567"
  }
  const title = {
    flexGrow: 1,
    textAlign: "left"
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ color: "#696567", bgcolor: lime[500] }} position="static">
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
            <Link style={link} to={{ pathname: '/users/' + userId }}>User</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box >
  );
}

export default Navbar;