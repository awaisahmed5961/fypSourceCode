import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { APP_NAME } from '../app preferences/app manifest';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AuthContext from '../context/auth/authcontext';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';

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
    },
    custom_button: {
        borderColor: '#f7f7f7',
        color: '#f7f7f7'
    }
}));

export default function ButtonAppBar(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const { haveButton } = props;

    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const { logOut } = authContext;
    const handleLogOut = () => {
        logOut();
    }
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleListKeyDown = event => {
        if (event.key === 'Tab') {
            event.preventDefault();
            // setOpen(false);
        }
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        className={classes.title} >
                        {APP_NAME}
                    </Typography>
                    {haveButton ? (
                        matches ? (<Button component={Link} variant="outlined" className={classes.custom_button} to={props.buttonPath} >{props.buttonTxt}</Button>
                        ) : null
                    ) : null}

                    <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={1} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    {matches ? (

                        <Avatar alt="Remy Sharp"
                            className={classes.user_avatar} />

                    ) : null}
                    {
                        matches ? (
                            <div aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                Awais
                            </div>
                        ) : null}
                    {
                        matches ? (<ExpandMoreIcon />) : null
                    }
                    {
                        !matches ? (<MenuIcon />) : null
                    }
                    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper >
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="simple-menu" onKeyDown={handleListKeyDown}  >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={() => {
                                                handleClose();
                                                handleLogOut();
                                            }}>Logout</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Toolbar>
            </AppBar>
        </div>
    );
}
