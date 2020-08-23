import React from 'react'
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

import { makeStyles } from '@material-ui/core/styles';
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


}));

export default function CourseCard(props) {
    const { id, title, subTitle, publicationStatus, pageRoute, onDelete } = props;

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
                        {/* <Typography variant={'caption'}>
                        Snow storm coming in Sommaroy island, Arctic Norway. This is something
                        that you definitely wanna see in your life.
        </Typography> */}
                    </CardContent>
                </CardActionArea>
                <CardActions >
                    <Typography variant={'caption'}>
                        Created at:
                        <Link href="#" underline={'none'}>
                            March 8, 2016
          </Link>
                    </Typography>
                    <div>
                        <IconButton component={RouterLink} to={`/course/${id}`}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => { onDelete() }} >
                            <DeleteIcon />
                        </IconButton>
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