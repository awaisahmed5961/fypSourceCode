import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link as RouterLink } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ConformationDialog from '../components/layouts/ConformationDialoge';
import TopicContext from '../context/topic/topicContext';
import CustomDialog from '../components/layouts/LoadingDialog';
import { LoadingSpinner } from '../components/LoadinSpinner';
import exerciseIcon from '../app assetrs/icons/quiz.svg';
import ArIcons from '../app assetrs/icons/mobile.svg';

const useStyles = makeStyles((theme) => ({
    title: {
        backgroundColor: 'white',
        width: '70vw', /* You can change the size however you like. */
        minHeight: '70px',
        margin: '10px',
        overflow: 'hidden',
        borderRadius: '4px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.4)',
        textAlign: "left",
        lineHeight: '70px',
    },
    titleInfo: {
        height: 'inherit',
        padding: '1em',
        // marginLeft: '15em',
    },
    listCta: {
        marginRight: '10px'
    },
    IconBox: {
        display: 'flex',
        alignItems: 'center',
        height: '30px'
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '30px',
        '& img': {
            marginRight: '5px'
        },
        '& span': {
            color: '#272727'
        }
    }

}));


export default function ListView(props) {
    const classes = useStyles();
    const { _id, TopicTitle, TopicDescription } = props.topic;
    const { courseId } = props;
    const [openConformationDialog, setOpenConformationDialog] = useState(false);
    const [openloadingModal, setOpenLoadingModal] = useState(false);
    const topicContext = useContext(TopicContext);
    const { deleteTopic } = topicContext;

    const handleOnDelete = () => {
        setTimeout(() => {
            deleteTopic(_id).then(topic => {
                setOpenLoadingModal(false);

            }).catch(err => {
                console.log(err)
                alert('error....')
            });
        }, 2000)
        setOpenLoadingModal(true);

    };
    return (
        <div>

            <div className={classes.title}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                >
                    <Grid item xs>
                        <CardActionArea component={RouterLink} to={`/topic?course_id=${courseId}&topic_id=${_id}`}>
                            <div className={classes.titleInfo}>
                                <Typography
                                    color={'inherit'}
                                    variant={'h6'}
                                >
                                    {TopicTitle}

                                </Typography>
                                <div className={classes.IconBox}>
                                    <div className={classes.icon}>
                                        <img src={exerciseIcon} style={{
                                            width: '15px',
                                            height: '15px'
                                        }} />
                                        <span>10</span>
                                    </div>
                                    <div className={classes.icon}>
                                        <img src={ArIcons} style={{
                                            width: '15px',
                                            height: '15px'
                                        }} />
                                        <span>12</span>
                                    </div>

                                </div>
                            </div>
                        </CardActionArea>
                    </Grid>
                    <Grid item xs align="right">
                        <div className={classes.listCta}>
                            <IconButton
                                component={RouterLink}
                                // onClick={handleEditCourse}
                                to={`/topiceditor?course_id=${courseId}&topic_id=${_id}`}
                                aria-label="Edit Coures">
                                <EditIcon />
                            </IconButton >

                            <IconButton
                                onClick={() => { setOpenConformationDialog(true) }}
                                aria-label="Delete"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <ConformationDialog
                open={openConformationDialog}
                onClose={setOpenConformationDialog}
                DialogTitleHeading="Are you agree to delete the topic?"
                DialogDescription="Are you agree to delete the topic?"
                onDelete={handleOnDelete}
            >
            </ConformationDialog>
            <CustomDialog open={openloadingModal}
                aria-labelledby={"Deleting Topic"}
                disableBackdropClick={true} >
                <LoadingSpinner style={{ width: '40px', marginRight: '20px' }} />
                {''} {'Deleting Topic. Please wait...'}
            </CustomDialog>
        </div>
    )
}
