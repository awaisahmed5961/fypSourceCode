import { APP_NAME } from '../app preferences/app manifest';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/login" {...props} />
));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                {APP_NAME}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '80vh',
        width: '70vw',
        margin: '8vh auto'
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

// const handleOnSubmit = (e) => {
//     e.preventDefault();
//     alert('form is empty is empty')

// }

export default function SignUp() {
    const classes = useStyles();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        conformPassword: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        conformPassword: ''
    });

    const handleInputOnChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(errors)
        console.log()
        if (formValidation()) {
            alert('form is submitting')
        }

    }
    const formValidation = () => {
        let temp = {};
        temp.name = values.name ? '' : 'Please Provide Name';
        temp.email = values.email ? '' : 'Please Provide email';
        // temp.email = (/$|.+@.+..+/).test(values.email) ? '' : 'pppp'
        temp.password = values.password ? '' : 'Please Provide Password';
        temp.conformPassword = (values.conformPassword) ? '' : 'Conform Your Password';
        temp.conformPassword = (values.conformPassword.length > 1 && values.password === values.conformPassword) ? '' : 'Conform password does not match';
        // temp.conformPassword = (values.password === values.conformPassword) ? '' : 'Conform Password is not matched';
        setErrors({
            ...temp
        });
        return Object.values(temp).every(x => x === "");
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={6} className={classes.image} />
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
          </Typography>
                    <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={values.name}
                            id="name"
                            label="name"
                            name="name"
                            autoComplete="name"
                            {...(errors.name && { error: true, helperText: errors.name })}
                            autoFocus
                            onChange={handleInputOnChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={values.email}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            {...(errors.email && { error: true, helperText: errors.email })}
                            onChange={handleInputOnChange}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={values.password}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...(errors.password && { error: true, helperText: errors.password })}
                            onChange={handleInputOnChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={values.conformPassword}
                            name="conformPassword"
                            label="conform Password"
                            type="password"
                            id="conformPassword"
                            {...(errors.conformPassword && { error: true, helperText: errors.conformPassword })}
                            autoComplete="current-password"
                            onChange={handleInputOnChange}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Create Account
            </Button>
                        <Grid container>
                            <Grid item xs>
                                {/* <Link href="#" variant="body2">
                                    Forgot password?
                </Link> */}
                            </Grid>
                            <Grid item>
                                <Link component={LinkBehavior} variant="body2">
                                    {"I've an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}