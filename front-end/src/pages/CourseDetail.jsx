import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import BreadCrumbs from '../components/BreadCrumbs'
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '90%',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
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
    search: {
        position: 'relative',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        borderBottom: '2px solid #D8D8D8',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'currentColor'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function CourseDetail(props) {
    const { id } = props.match.params;
    const classes = useStyles();
    const [searchFilter, setSearchFilter] = useState('');

    return (
        <div>
            <NavBar haveButton={true} buttonTxt="Course Topic" buttonPath={`/topic?course_id=${id}`} />
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
                <Grid item >
                    <Grid container direction="row"
                        justify="space-between"
                        alignItems="center">
                        <Grid item >
                            <Typography variant="subtitle1" >
                                Course Name: abc
                    </Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant="subtitle1" >
                                Course Status: Published
                    </Typography>
                        </Grid>
                        {/* course Name: abc
                        couse staus: published
                        total topics:2  */}
                    </Grid>
                    {/* <Tabf onchange={currentIndex} /> */}


                </Grid>
                <Grid item >
                    <Grid direction='row' container>

                        <form>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    value={searchFilter}
                                    onChange={(event) => setSearchFilter(event.target.value)}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </form>
                        {/* <IconButton aria-label="delete" size="small" onClick={() => setCourseView('grid_view')}>
                            <AppsIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="delete" size="small" onClick={() => setCourseView('list_view')}>
                            <ReorderSharpIcon fontSize="inherit" />
                        </IconButton> */}

                    </Grid>
                </Grid>
            </Grid>
            {/* {
                topics.length === 0 ? (<div style={{
                    textAlign: 'center'
                }}  >
                    <Typography variant="h6" >
                        There is no Course.
                                    </Typography>
                    <Button variant="contained" color="primary">
                        Create Course
                                        </Button>
                </div>) : (
                        <Grid container spacing={6} direction="row" justify='center'  >

                            {
                                topics.map((topic) => {
                                    return (<Grid item key={topic.id} >
                                        <CourseCard id={topic.id} title={topic.title} subTitle={topic.subTitle} publicationStatus={topic.publicationStatus} pageRoute={`/${topic.title}`} />
                                    </Grid>);
                                })
                            }
                        </Grid>
                    ) */}
            {/* } */}
        </div>
    )
}
