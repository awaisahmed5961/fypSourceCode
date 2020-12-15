import React, { useState, useContext, useEffect } from 'react'
import NavBar from '../components/NavBar'
import BreadCrumbs from '../components/BreadCrumbs'
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import { makeStyles, fade } from '@material-ui/core/styles';
import TopicContext from '../context/topic/topicContext';
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';
import exerciseIcon from '../app assetrs/icons/quiz icon.svg'
import arIcon from '../app assetrs/icons/ar icon.svg'
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    container: {
        width: '90%',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: '100%',

        }
    },
    detailMetaData: {
        width: '100%',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'flex-end'
    },


}));

export default function TopicDetail(props) {
    const classes = useStyles();
    const topicContext = useContext(TopicContext);
    const { topic, getTopics } = topicContext;
    let history = useHistory();

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
                            <div className={classes.detailMetaData}>
                                <div style={{
                                    marginRight: '30px',
                                }}>
                                    <img src={exerciseIcon} onClick={() => history.push(`/exercise?topic_id=${topic_id}&course_id=${course_id}`)} style={{
                                        width: '60px',
                                        height: '60px'
                                    }} />
                                </div>
                                <div>
                                    <img src={arIcon} onClick={() => alert('ar')} style={{
                                        width: '60px',
                                        height: '60px'
                                    }} />
                                </div>


                            </div>
                            <div>
                                <Typography variant="h6" gutterBottom>
                                    {courseTopic[0].TopicTitle}
                                </Typography>
                                <div dangerouslySetInnerHTML={{ __html: courseTopic[0].TopicDescription }} key={courseTopic[0]._id}>
                                </div>
                            </div>
                        </div>

                    ) : ''
                }
            </Grid>

        </div>
    )
}
