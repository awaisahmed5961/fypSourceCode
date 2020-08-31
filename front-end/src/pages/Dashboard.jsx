import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/auth/authcontext'
import CourseContext from '../context/course/courseContext';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavBar'
import BreadCrumbs from '../components/BreadCrumbs';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import { ReactComponent as GridIcon } from '../app assetrs/icons/grid view icon.svg';
import { ReactComponent as FilterIcon } from '../app assetrs/icons/filter icon filled.svg';
import { ReactComponent as ListIcon } from '../app assetrs/icons/list icon.svg';
import Tabf from '../components/Tabf';
import CourseCard from '../components/CourseCard';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    container: {
        width: '90%',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: '100%',

        }
    },
    icons: {
        width: '15px',
        height: '15px',
        border: '2px solid #555',
        marginLeft: '8px',
        padding: '8px',
        borderRadius: '5px',
        fill: '#555'

    },
    rounded: {
        border: '1px solid #555',
        background: 'none'
    },
    coursesContainer: {
        marginTop: '30px'
    },
    noCouresError: {
        marginBottom: '20px'
    }

}));


export default function Dashboard() {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const courseContext = useContext(CourseContext);
    const { courses, deleteCourse, clearCurrent, getCourses, loading } = courseContext;
    const [tabIndex, setTabIndex] = useState(0);
    const currentIndex = (newValue) => {
        setTabIndex(newValue);
    };
    useEffect(() => {
        authContext.loadUser();
        getCourses();
        // eslint-disable-next-line
    }, []);

    const handleCourseDelete = () => {
        alert('show a model for conformation of the course. after that the course will be deleted')
        clearCurrent();


    }
    return (
        <div>
            <NavBar haveButton={true}
                buttonTxt="Create Course"
                buttonPath={`/course/`} />
            <Grid container >
                <Box
                    component={Grid}
                    item
                    xl={12}
                    display={{ xs: "none", sm: "block" }}
                >
                    <BreadCrumbs />
                </Box>
                <Grid item sm={false} xs={12}  >
                    <Grid container direction="row"
                        justify="space-between" className={classes.container} >
                        <Grid item >
                            <Tabf onchange={currentIndex} />
                        </Grid>
                        <Grid item >
                            <Grid direction='row' container>
                                <GridIcon className={classes.icons} />
                                <ListIcon className={classes.icons} />
                                <FilterIcon className={classes.icons} />
                            </Grid>
                        </Grid>
                        <Grid item sm={false} xs={12} >
                            {
                                courses !== null && courses.length === 0 && !loading ? (<div style={{
                                    textAlign: 'center'
                                }} className={classes.coursesContainer} >
                                    <Typography variant="h6"
                                        className={classes.noCouresError}>
                                        There is no Course.
                                    </Typography>

                                    <Button variant="contained" component={RouterLink} to="/course" color="primary">
                                        Create Course
                                        </Button>
                                </div>) : (
                                        <Grid container spacing={6} direction="row" justify='center' className={classes.coursesContainer} >
                                            {
                                                courses.map((course) => {
                                                    return (
                                                        <Grid item key={course._id}>
                                                            <CourseCard
                                                                id={course._id}
                                                                title={course.title}
                                                                subTitle={course.subTitle}
                                                                description={course.description}
                                                                publicationStatus={course.publication_Status}
                                                                pageRoute={`/${course.title.split(' ').join('-')}`}
                                                                onDelete={handleCourseDelete}
                                                            />
                                                        </Grid>);
                                                })
                                            }
                                        </Grid>
                                    )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


        </div>
    )
}
