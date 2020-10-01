import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/auth/authcontext'
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavBar'
import BreadCrumbs from '../components/BreadCrumbs';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import { ReactComponent as GridIcon } from '../app assetrs/icons/grid view icon.svg';
import { ReactComponent as FilterIcon } from '../app assetrs/icons/filter icon filled.svg';
import { ReactComponent as ListIcon } from '../app assetrs/icons/list icon.svg';
import Tabf from '../components/Tabf';
import Courses from '../components/Courses';
import AppsIcon from '@material-ui/icons/Apps';
import ReorderSharpIcon from '@material-ui/icons/ReorderSharp';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
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
}));


export default function Dashboard() {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const [tabIndex, setTabIndex] = useState(0);
    const [courseView, setCourseView] = useState('grid_view');
    const currentIndex = (newValue) => {
        setTabIndex(newValue);
        console.log(newValue);
        console.log('dashboard line 46')
    };
    useEffect(() => {
        authContext.loadUser();
        // getCourses();
        // eslint-disable-next-line
    }, []);

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
                                <IconButton aria-label="delete" size="small" onClick={() => setCourseView('grid_view')}>
                                    <AppsIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" onClick={() => setCourseView('list_view')}>
                                    <ReorderSharpIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" onClick={() => alert('filter view')}>
                                    <SearchIcon fontSize="inherit" />
                                </IconButton>

                                {/* <ReorderSharpIcon />
                                <SearchIcon /> */}
                                {/* <GridIcon className={classes.icons} />
                                <ListIcon className={classes.icons} />
                                <FilterIcon className={classes.icons} /> */}
                            </Grid>
                        </Grid>
                        <Grid item sm={false} xs={12} >
                            <Courses publicationFilter={tabIndex} courseView={courseView} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


        </div>
    )
}
