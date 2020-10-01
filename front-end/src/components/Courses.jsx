import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/auth/authcontext'
import CourseContext from '../context/course/courseContext';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ICourse from './ICourse';
import CardSkelton from './Ui/CardSkelton';
const useStyles = makeStyles((theme) => ({
    coursesContainer: {
        marginTop: '30px'
    },
    noCouresError: {
        marginBottom: '20px'
    }

}));

export default function Courses(props) {
    console.log(props);
    console.log('courses.jsx at line 22')

    const authContext = useContext(AuthContext);
    const courseContext = useContext(CourseContext);
    const { courses, getCourses, loading } = courseContext;
    const [loadingCourse, setLoadingCourse] = useState(false);
    const classes = useStyles();
    useEffect(() => {
        authContext.loadUser();
        setTimeout(() => {
            const courseLoadingStatus = getCourses();
            courseLoadingStatus.then((data) => {
                setTimeout((data) => {
                    setLoadingCourse(false);
                }, 1000);
                setLoadingCourse(true)
            })
                .catch((err) => {
                    alert('add tost message that says error in get courses ')
                })
        }, 1000);
        return () => {
            return null
        }
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            {

                courses !== null && courses.length === 0 && !loading ? (<div style={{
                    textAlign: 'center'
                }} className={classes.coursesContainer} >
                    <Typography variant="h6" className={classes.noCouresError}>
                        There is no Course.
                                    </Typography>

                    <Button variant="contained" color="primary">
                        Create Course
                                        </Button>
                </div>) : (
                        <Grid container spacing={6} direction="row" justify='center' className={classes.coursesContainer} >
                            {
                                courses.map((course) => {
                                    return loadingCourse ? (
                                        <Grid item key={course._id}>
                                            <CardSkelton />
                                        </Grid>
                                    ) : (

                                            <Grid item key={course._id}>
                                                <ICourse
                                                    id={course._id}
                                                    title={course.title}
                                                    subTitle={course.subTitle}
                                                    description={course.description}
                                                    date={course.date}
                                                    publicationStatus={course.publication_Status}
                                                    pageRoute={`/${course.title.split(' ').join('-')}`}
                                                />
                                            </Grid>);
                                }
                                )
                            }
                        </Grid>
                    )
            }
        </div>
    )
}
