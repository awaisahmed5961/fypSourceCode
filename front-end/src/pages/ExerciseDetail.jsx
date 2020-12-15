import React, { useState, useContext, useEffect } from 'react'
import NavBar from '../components/NavBar'
import BreadCrumbs from '../components/BreadCrumbs'
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import { makeStyles, fade } from '@material-ui/core/styles';
import ExerciseContext from '../context/Exercise/exerciseContext';
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';
import SingleQuestion from '../components/SingleQuestion';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    container: {
        width: '90%',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: '100%',

        }
    },

}));

export default function ExerciseDetail(props) {
    let history = useHistory();
    const classes = useStyles();
    const exerciseContext = useContext(ExerciseContext);
    const { exercise, getExercise, deleteExercise } = exerciseContext;
    const queryStringParameters = queryString.parse(props.location.search);
    const { course_id, topic_id } = queryStringParameters;
    useEffect(() => {
        getExercise(topic_id)

    }, []);
    const handleDeleteExercise = () => {

        deleteExercise(topic_id).then((data) => {

        }).catch((err) => {
            console.log("error");
            console.log(err)
        })
    }
    return (
        <div>
            <NavBar haveButton={false} />
            <Box
                component={Grid}
                item
                xl={12}
                display={{ xs: "none", sm: "block" }}
            >
                <BreadCrumbs />
            </Box>
            <Grid container direction="row"
                justify="space-between" className={classes.container} >
                {
                    exercise.length === 0 ? (<div style={{ margin: '0 auto' }}>

                        <Typography
                            variant="h5"
                        >
                            No Exercise
                    </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            onClick={() => history.push(`/topiceditor?course_id=${course_id}&`)}
                            color="primary">
                            Create Exercise
                        </Button>
                    </div>) : (<div>
                        <div style={{
                            marginBottom: '20px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleDeleteExercise}
                                color="primary">
                                Delete Exercise
                        </Button>
                        </div>
                        {
                            exercise.map((question) => <SingleQuestion Question={question} key={question._id} />)
                        }
                    </div>)
                }
            </Grid>

        </div >
    )
}
