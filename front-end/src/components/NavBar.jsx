import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { APP_NAME } from '../app preferences/app manifest';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AuthContext from '../context/auth/authcontext';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: '#f7f7f7'
    },
    user_avatar: {
        marginRight: '13px',
        marginLeft: '5px'
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const { logOut } = authContext;
    const handleLogOut = () => {
        logOut();
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {APP_NAME}
                    </Typography>
                    <Button variant="outlined" onClick={handleLogOut} >LOG OUT</Button>
                    <Button variant="outlined" >Create Course</Button>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Avatar alt="Remy Sharp" src="" className={classes.user_avatar} />
                    <Typography >
                        Awais
                    </Typography>
                    <ExpandMoreIcon />
                </Toolbar>
            </AppBar>
        </div>
    );
}
