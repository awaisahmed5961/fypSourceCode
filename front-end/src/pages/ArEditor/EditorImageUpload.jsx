import React, { useContext, useEffect, useState } from 'react'
import { makeStyles, fade } from '@material-ui/core/styles';

import NavBar from '../../components/NavBar'
import BreadCrumbs from '../../components/BreadCrumbs';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import CustomImageUpload from '../../components/customFileUploader';
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
    MainScreeen: {
        height: '100vh',
        backgroundColor: '#eee',
        width: '100vw',
        position: 'relative'
    },
    ImageContainerWrapper: {
        width: '600px',
        height: '400px',
        border: '1px solid #e1e1e1',
        borderRadius: '4px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50% , -50%)',
        padding: '10px'

    },
    containerLeftSideControllers: {
        height: '100px',
        width: '100px',
        position: 'absolute',
        left: '10px',
        bottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& > button': {
            backgroundColor: [theme.palette.primary.main],
            border: 'none',
            outline: 'none',
            marginBottom: '20px',
            height: '40px',
            width: '40px',
            borderRadius: '3px',
            color: '#fff',
            fontSize: '30px'

        }
    },
    containerRightSideControllers: {
        height: '100px',
        width: '150px',
        position: 'absolute',
        right: '30px',
        top: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '& > div': {
            marginBottom: '10px',
        }
    },
    buttonRow: {
        display: 'flex',

        "& button:first-child": {
            marginRight: '20px'
        }

    },
    outlinedButton: {
        width: '100%',
        color: [theme.palette.primary.main],
        backgroundColor: '#fff',
        border: 'none',
        border: '2px solid green',
        borderColor: [theme.palette.primary.main],
        borderRadius: '4px',
        outline: 'none',
        padding: '10px',
        textTransform: 'uppercase'
    }
}));


export default function EditorImageUpload() {
    const classes = useStyles();


    return (
        <div>
            <NavBar haveButton={false}
                buttonTxt="Create Course"
                buttonPath={`/courseform?action=new`} />
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
                        <div className={
                            classes.MainScreeen
                        }>
                            <div className={classes.ImageContainerWrapper}>
                                <CustomImageUpload />
                            </div>
                            <div className={classes.containerLeftSideControllers}>
                                <button onClick={() => alert('zoom in')}>+</button>
                                <button onClick={() => alert('zoom out')}>-</button>

                            </div>
                            <div className={classes.containerRightSideControllers}>
                                <div>
                                    <div className={classes.buttonRow}>
                                        <button className={classes.outlinedButton} >left</button>
                                        <button className={classes.outlinedButton}>right</button>
                                    </div>
                                </div>
                                <div>
                                    <button className={classes.outlinedButton}>Remove</button>
                                </div>
                                <div>
                                    <button className={classes.outlinedButton} >Gray Scale</button>
                                </div>


                            </div>
                        </div>
                    </Grid>

                </Grid>
            </Grid>


        </div>
    )
}
