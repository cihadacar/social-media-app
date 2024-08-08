import * as React from 'react';
import Post from '../Post/Post';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { GetWithAuth } from '../../service/HttpService';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {

  const { isOpen, postId, setIsOpen } = props;
  const [open, setOpen] = React.useState(isOpen);
  const [post, setPost] = useState();

  const getPost = () => {
    GetWithAuth("/posts/" + postId)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setPost(result);
        },
        (error) => {
          console.log(error)
        }
      )
  }

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    getPost();
  }, [postId])

  return (
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar position='relative'>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" marginLeft={2} style={{flex: 2}} >
              Close
            </Typography>
          </Toolbar>
        </AppBar>
        {post? <Post likes={post.postLikes} postId={post.id} userId={post.userId}
          userName={post.userName} title={post.title} text={post.text} ></Post> : "loading"}
      </Dialog>
  )
}

export default function UserActivity(props) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);
  const { userId } = props;
  const [isOpen, setIsOpen] = useState();
  const [selectedPost, setSelectedPost] = useState();

  const handleNotification = (postId) => {
    console.log("popup")
    setSelectedPost(postId);
    setIsOpen(true);
  }

  const getActivity = () => {
    GetWithAuth("/users/activity/" + userId)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
          setRows(result)
        },
        (error) => {
          console.log(error)
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => {
    getActivity()
  }, [])

  return (
    <div>
      {isOpen ? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen} /> : ""}
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440, maxWidth: 1000, margin: 5 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                  User Activities
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <Button onClick={() => handleNotification(row[1])}>
                    <TableRow sx={{minWidth: 900}} >
                      {row[3] + " " + row[0] + " your post"}
                    </TableRow>
                  </Button>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
