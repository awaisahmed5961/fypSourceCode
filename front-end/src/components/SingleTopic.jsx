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
    }

}));


export default function ListView(props) {
    const classes = useStyles();
    const { _id, TopicTitle, TopicDescription } = props.topic;
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
                        <CardActionArea component={RouterLink} to={`/topic/${_id}`}>
                            <div className={classes.titleInfo}>
                                <Typography
                                    color={'inherit'}
                                    variant={'h6'}
                                >
                                    {TopicTitle}

                                </Typography>
                                <Typography
                                    color={'inherit'}
                                    variant={'subtitle1'}
                                >
                                    ar contentent,
                                    excercises
                </Typography>
                            </div>
                        </CardActionArea>
                    </Grid>
                    <Grid item xs align="right">
                        <div className={classes.listCta}>
                            <IconButton
                                component={RouterLink}
                                // onClick={handleEditCourse}
                                to={`/topic?course_id=${123}&topic_id=${_id}`}
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
