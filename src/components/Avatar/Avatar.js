import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemSecondaryAction, Radio, RadioGroup } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Avatar(props) {
    const { avatarId } = props;
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState([avatarId]);

    const handleToggle = (event) => {
        setChecked(event.target.value);
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        saveAvatar();
    };

    const saveAvatar = () => {
        console.log("saveAvatar");
        console.log(avatarId);
        fetch("/users/" + localStorage.getItem("currentUserId"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                avatar: checked,
            }),
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    }

    return (
        <div>
            <Card sx={{ width: 320, margin: 5 }}>
                <CardMedia
                    sx={{ height: 320 }}
                    image={`/avatars/avatar${checked}.png`}
                    title="User Avatar"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Username
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        User info
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button align='center' size="small"
                        onClick={handleOpen}
                    >Change Avatar</Button>
                </CardActions>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
                        Choose an Avatar
                    </Typography>
                    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {[1, 2, 3, 4, 5, 6].map((value) => {
                            const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                                <ListItem key={value}>
                                    <CardMedia
                                        style={{ maxWidth: 90 }}
                                        component="img"
                                        alt={`Avatar n°${value}`}
                                        image={`/avatars/avatar${value}.png`}
                                        title="User Avatar"
                                    />
                                    <ListItemSecondaryAction>
                                        <Radio
                                            edge="end"
                                            value={value}
                                            onChange={handleToggle}
                                            checked={"" + checked === "" + value}
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Modal>
        </div>
    )
}