import React, { useContext, useEffect, useState } from 'react'
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
    }

}));


export default function Course(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const courseContext = useContext(CourseContext);
    const { user } = authContext;
    const { addCourse, current, clearCurrent } = courseContext;
    const { id } = props.match.params;
    useEffect(() => {
        authContext.loadUser();
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
    }, []);
    const [course, setCourse] = useState({
        title: '',
        subTitle: '',
        description: '',
        // imagePath: '',
    });

    const [loading, setLoading] = useState(false);
    const [validationErrors, setvalidationErrors] = useState({
        title: '',
        subTitle: '',
        description: '',
        // imagePath: '',


    });
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
            alert(props.match.params.id)
            if (props.match.params.id === undefined) {
                alert('form  is created');

                addCourse(course);
                setCourse({
                    title: '',
                    subTitle: '',
                    description: '',
                });
                setvalidationErrors({})
            }
            else {
                alert('course  is updating')
                // setvalidationErrors({});
                // clearCurrent()
            }

        }

        // console.log(errors)
        // console.log(eerrors)
        // if (errors) {
        // }
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
                                <ImageUpload />
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

                </Grid>
            </Grid>
        </div >
    )
}
