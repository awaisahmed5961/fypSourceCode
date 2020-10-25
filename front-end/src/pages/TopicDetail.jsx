import React, { useState, useContext, useEffect } from 'react'
import NavBar from '../components/NavBar'
import BreadCrumbs from '../components/BreadCrumbs'
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import { makeStyles, fade } from '@material-ui/core/styles';
import TopicContext from '../context/topic/topicContext';
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '90%',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: '100%',

        }
    },

}));

export default function TopicDetail(props) {
    const classes = useStyles();
    const topicContext = useContext(TopicContext);
    const { topic, getTopics } = topicContext;

    const queryStringParameters = queryString.parse(props.location.search);
    const { course_id, topic_id } = queryStringParameters;
    useEffect(() => {
        getTopics({ course_id });

    }, []);

    let courseTopic = topic.filter((f) => f._id === topic_id);
    // console.log(courseTopic)

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
                    courseTopic.length !== 0 ? (
                        <div className={classes.container}>
                            <Typography variant="h6" gutterBottom>
                                {courseTopic[0].TopicTitle}
                            </Typography>
                            <div dangerouslySetInnerHTML={{ __html: courseTopic[0].TopicDescription }} key={courseTopic[0]._id}>
                            </div>
                        </div>

                    ) : ''
                    // topic.map((t) => {
                    //     return (
                    //         
                    //     );
                    // })
                }
            </Grid>

        </div>
    )
}
