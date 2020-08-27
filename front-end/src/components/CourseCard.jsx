import React, { useContext, useState } from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link as RouterLink } from 'react-router-dom'
import collapseLargeString from '../utils/collapseLargeString';
import CourseContext from '../context/course/courseContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
const useStyles = makeStyles((theme) => ({
    root: {
        color: '#fff'
    },
    card: {
        width: '300px'
    },
    cardImage: {
        height: '130px'
    },
    publicationBadge: {
        padding: '7px',
        display: 'inline-block',
        width: '200px',
        borderRadius: '2px',
        margin: '20px',
        textTransform: 'capitalize',

    },
    publishBadge: {
        background: '#2a77aa',
    },
    draftBadge: {
        background: '#ad3959',
    },
    archiveBadge: {
        backgroundColor: '#018377'
        // rgb(227, 116, 0)
    },
    cardAction: {
        display: 'flex',
        alignItems: 'center',
    },
    publisheMetaData: {
        display: 'flex',
        flexDirection: 'column'
    }, cta: {
        textAlign: 'right',
    }
}));

export default function CourseCard(props) {
    const { _id, title, description, subTitle, publicationStatus, pageRoute, onDelete } = props;
    const courseContext = useContext(CourseContext);
    const { setCurrent } = courseContext;

    const handleEditCourse = () => {
        const Course = {
            _id,
            title,
            subTitle,
            description,
            publicationStatus
        }
        setCurrent(Course)
    }

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [isDeleteAble, setisDeleteAble] = useState(false);

    const handlecourseDelete = (e) => {
        const { value } = e.target;
        if (value === title) {
            alert('you can delete the course');
        }


    }

    const classes = useStyles();
    return (
        <div>
            <Card className={classes.card} elevation={6} >
                <CardActionArea component={RouterLink} to={pageRoute}>
                    <CardMedia
                        className={classes.cardImage}
                        image={
                            'https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80'
                        }
                    >
                        <div  >
                            <Typography
                                color={'inherit'}
                                variant={'subtitle2'}
                                style={{
                                    padding: '7px',
                                    display: 'inline-block',
                                    borderRadius: '2px',
                                    margin: '20px',
                                    textTransform: 'capitalize'
                                }}
                                className={
                                    publicationStatus === 'published'
                                        ? (classes.publishBadge)
                                        :
                                        (publicationStatus === 'draft'
                                            ? classes.draftBadge
                                            : classes.archiveBadge)}
                            >
                                {publicationStatus}
                            </Typography>
                        </div>

                    </CardMedia>
                    <CardContent >
                        <Typography
                            variant={'h6'}
                        >
                            {
                                collapseLargeString(title, 20)
                            }


                        </Typography>
                        <Typography
                            variant={'subtitle1'}
                            gutterBottom
                        >
                            {
                                collapseLargeString(
                                    subTitle, 25)
                            }
                        </Typography>

                    </CardContent>
                </CardActionArea>
                <CardActions >
                    {/* <Typography variant={'caption'}>
                        Created at:
                        <Link href="#" underline={'none'}>
                            March 8, 2016
          </Link>
                    </Typography> */}
                    <div className={classes.cardAction}>
                        <div className={classes.publisheMetaData}>
                            <Typography variant={'caption'}>
                                Created at
                            </Typography>
                            <Typography variant={'caption'}>
                                <Link href="#" underline={'none'}>
                                    March 8, 2016
          </Link>
                            </Typography>
                        </div>
                        <div className={classes.cta}>
                            <IconButton
                                component={RouterLink}
                                to={`/course/${_id}`}
                                onClick={handleEditCourse}
                                aria-label="Edit Coures">
                                <EditIcon />
                            </IconButton >
                            <IconButton onClick={() => { handleClickOpen(); }}
                                aria-label="Delete"
                            >
                                <DeleteIcon />
                            </IconButton>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">
                                    <ReportProblemOutlinedIcon
                                        style={{
                                            color: 'red',
                                            fontSize: 40,
                                            verticalAlign: 'bottom',
                                            paddingRight: '15px'
                                        }} />
                                        Delete Course
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Once the course is deleted, all couse content releated to this course will also be deleted.
                                        To delete course enter the course title <b>{title}</b> below.
                                </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Course Title"
                                        type="text"
                                        error
                                        // {...(isDeleteAble && { error: true, helperText: 'error' })}
                                        fullWidth
                                        onChange={handlecourseDelete}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleClose}
                                        variant="contained"
                                        color="secondary"

                                    >
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </CardActions>
            </Card>
        </div >
    )
}
function getPublicationBadge(publicationstatus) {
    switch (publicationstatus) {
        case 'published':
            return 'classes.publishBadge';
        case 'archived':
            return 'classes.archiveBadge';
        default:
            return 'classes.draftBadge';
    }
}