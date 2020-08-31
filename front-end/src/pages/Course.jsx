import React, { useContext, useEffect, useState, useRef } from 'react'
import NavBar from '../components/NavBar'
import BreadCrumbs from '../components/BreadCrumbs'
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ImageUpload from '../components/DrapandDropFileUpload';
import Joi from 'joi-browser';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AuthContext from '../context/auth/authcontext'
import CourseContext from '../context/course/courseContext';
import { ReactComponent as FireCracker } from '../app assetrs/icons/congratulation.svg';
import DownloadButton from '../app assetrs/Images/download button.png'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import QRCode from "react-qr-code";
import InputAdornment from '@material-ui/core/InputAdornment';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Input from '@material-ui/core/Input';
const useStyles = makeStyles((theme) => ({
    formContainer: {
        width: '75%',
        margin: '0 auto',
        marginTop: '30px',
        background: 'yellow',
        marginBottom: '60px'
    },
    heading_primary: {
        padding: '25px'
    },
    form: {
        width: '90%', // Fix IE 11 issue.
        margin: '0 auto',
        marginTop: theme.spacing(1),


    },
    submit: {
        // margin: theme.spacing(5, 0, 5),
        margin: '0 auto',
        marginTop: '50px',
        marginBottom: '50px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '10px',
            marginBottom: '25px'
        }
    },
    textareaWordConunterContainer: {
        textAlign: 'right',
        paddingRight: '8px',
        color: '#333'
    },
    orderedList: {
        counterReset: 'item',
        '& li': {
            display: 'block',
            marginBottom: '.5em',
            marginLeft: '-25px',
            '&::before': {
                display: 'inline-block',
                content: 'counter(item) "."',
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                fontSize: '20px',
                counterIncrement: 'item',
                width: '1.5em',
            }
        }

    }, courseUriFieldHelperText: {
        paddingTop: '10px',
        textAlign: 'left'

    },


}));


export default function Course(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const courseContext = useContext(CourseContext);
    const { user } = authContext;
    const { addCourse, current, clearCurrent, error, clearCourseError, courseadded } = courseContext;
    const [copySuccess, setCopySuccess] = useState('');
    const [image, setImage] = useState(null);
    const textAreaRef = useRef(null);
    const { id } = props.match.params;
    useEffect(() => {
        authContext.loadUser();

        if (error === 'Server Error') {
            alert('course failed to Create');
            clearCourseError();
        }
        // eslint-disable-next-line
        if (props.match.params.id) {
            setCourse({
                ...current
            })
        }
        else {
            setCourse({
                title: '',
                subTitle: '',
                description: ''
            })
        }
    }, [error, courseadded]);
    const [course, setCourse] = useState({
        title: '',
        subTitle: '',
        description: '',

    });

    const [loading, setLoading] = useState(false);
    const [validationErrors, setvalidationErrors] = useState({
        title: '',
        subTitle: '',
        description: '',

    });
    const [openModal, setOpenModal] = useState(false);

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };
    const handleInputOnChange = e => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: value
        });
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const errors = formValidation();
        if (errors) {
            setvalidationErrors({
                ...errors
            }
            );
        }
        else {
            if (props.match.params.id === undefined) {
                console.log('onsubmit click')
            }
            else {
                console.log('edit the cour')
            }

            //     if (props.match.params.id === undefined) {
            //         if (error === "Server Error") {
            //             alert('add alert that says course registeration falied...');
            //         }
            //         else {

            //             // addCourse(course);
            //             const fd = new FormData();
            //             fd.append('title', course.title);
            //             fd.append('subTitle', course.subTitle);
            //             fd.append('description', course.description);
            //             fd.append('ImagePlaceholder', image);
            //             for (var data of fd.entries()) {
            //                 console.log(data[0] + ', ' + data[1]);
            //             }
            //             addCourse(fd)
            //             setTimeout(() => {
            //                 console.log('adding course');
            //                 console.log(courseadded)
            //             }, 3000)

            //             if (courseadded) {
            //                 setOpenModal(true);
            //             }
            //             else {
            //                 alert('add alert that says course registeration falied')
            //                 console.log('add alert that says course registeration falied')
            //             }


            //         }

            //         setCourse({
            //             title: '',
            //             subTitle: '',
            //             description: '',
            //         });
            //         setvalidationErrors({})
            //     }
            //     else {
            //         alert('course is updating')
            //         // setvalidationErrors({});
            //         // clearCurrent()
            //     }

        }

    }
    var schema = {
        title: Joi.string().required().label('Title'),
        subTitle: Joi.string().required().label('Sub Title'),
        description: Joi.string().max(300).required().label('Description')
    }
    const formValidation = () => {
        const result = Joi.validate(course, schema, { abortEarly: false });
        if (!result.error) return null;
        let errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }
    function copyToClipboard(e) {
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
        setTimeout(() => {
            setCopySuccess('');
        }, 4000)
    };
    return (

        <div>
            <NavBar
                haveButton={true
                } buttonTxt="Course Topic"
                buttonPath="/topic" />
            <Box
                component={Grid}
                item
                xl={12}
                display={{ xs: "none", sm: "block" }}
            >
                <BreadCrumbs />
            </Box>
            <Grid container
                direction="row"
                className={classes.formContainer}
                component={Paper} elevation={6}
            >
                <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    component={Paper}  >
                    <Typography
                        variant="h5"
                        className={classes.heading_primary}>
                        {!props.match.params.id ? ' Create New Course' : 'Edit Course'}
                    </Typography>
                </Grid>

                <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    component={Paper}
                    elevation={2} >
                    <form className={classes.form} noValidate onSubmit={handleOnSubmit} encType="multipart/form-data">
                        <Grid container
                            direction="row"
                            align="center" >
                            <Grid item xs={12} sm={12} md={6}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="Title"
                                            value={course.title || ""}
                                            name="title"
                                            label="Title"
                                            variant="filled"
                                            required
                                            autoFocus
                                            onChange={handleInputOnChange}
                                            {...(validationErrors.title
                                                && { error: true, helperText: validationErrors.title })}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField margin="normal"
                                            fullWidth
                                            id="filled-basic"
                                            value={course.subTitle || ""}
                                            label="Sub Title"
                                            variant="filled"
                                            required
                                            name="subTitle"
                                            onChange={handleInputOnChange}
                                            {...(validationErrors.subTitle
                                                && { error: true, helperText: validationErrors.subTitle })}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="filled-basic"
                                            label="Description"
                                            variant="filled"
                                            name="description"
                                            value={course.description || ""}
                                            multiline
                                            rows={matches ? '5' : '10'}
                                            rowsMax={10}

                                            onChange={handleInputOnChange}
                                            {...(validationErrors.description
                                                && { error: true, helperText: validationErrors.description })}
                                        />
                                        <div className={classes.textareaWordConunterContainer}>
                                            {/* <span>{course.description.length || 0}</span>/300 */}
                                        </div>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                {/* <ImageUpload onImageUpload={setImage} />*/}
                                <ImageUpload state={course} onImageUpload={setCourse} />
                            </Grid>
                            <Button
                                {
                                ...(matches && { fullWidth: true })
                                }
                                variant="contained"
                                size="large"
                                type="submit"
                                className={classes.submit}
                                color="primary">
                                Publish Course
                            </Button>
                        </Grid>
                    </form>
                    <Dialog
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="form-dialog-title"
                        maxWidth={'md'}
                    >

                        <DialogTitle id="form-dialog-title" disableTypography={true}>
                            <Typography variant='h5'>
                                Congratulations {' '} <FireCracker style={{
                                    width: '30px',
                                    height: '30px',
                                }} />
                            </Typography>
                            <Typography variant="subtitle1">
                                Share your content with your learners.
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container direction="row" className={classes.modalContainer}>
                                <Grid item xs={12} sm={12} md={6} >
                                    <DialogContentText>
                                        Once the course is deleted, all couse content releated to this course will also be deleted.
                                        </DialogContentText>
                                    <ol className={classes.orderedList}>
                                        <li>
                                            Download the application from Playstore.
                                                <a href="#" target="_blank" rel="noopner noreffer">
                                                <img src={DownloadButton} style={
                                                    {
                                                        width: '140px',
                                                        height: '140px',
                                                        marginTop: '-28px',
                                                        marginBottom: '-28px',
                                                        display: 'block',
                                                        marginLeft: 'auto',
                                                        marginRight: 'auto'
                                                    }
                                                } />
                                            </a>

                                        </li>
                                        <li>
                                            Register free account in the application.
                                            </li>
                                        <li>
                                            Scan the QR on the mobile to register course.
                                            </li>
                                        <li>
                                            Have fun, Learn with Agumented Reality.
                                            </li>
                                    </ol>

                                </Grid>
                                <Grid item xs={12} sm={12} md={6} align="center">
                                    <QRCode value="kjsdji3u4uiueuncew" />
                                    <div>

                                        <form >
                                            <FormControl style={{
                                                marginTop: '20px'
                                            }}>
                                                {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    // type={values.showPassword ? 'text' : 'password'}
                                                    type='text'
                                                    value="akdjfkdjkf"
                                                    inputRef={textAreaRef}
                                                    notched={false}
                                                    readOnly
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                // onClick={handleClickShowPassword}
                                                                // onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                                onClick={copyToClipboard}
                                                            >
                                                                <FileCopyOutlinedIcon />
                                                                {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    labelWidth={70}
                                                />
                                                <div className={classes.courseUriFieldHelperText} >
                                                    {copySuccess || ''}
                                                </div>
                                            </FormControl>
                                        </form>
                                    </div>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <div style={{
                            height: '30px'
                        }}>

                        </div>
                    </Dialog>
                </Grid>
            </Grid>
        </div >
    )
}
