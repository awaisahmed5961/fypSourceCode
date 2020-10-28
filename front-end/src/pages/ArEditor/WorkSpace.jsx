import React, { useState } from 'react'
import { makeStyles, fade } from '@material-ui/core/styles';
import NavBar from '../../components/NavBar'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
    container: {

    },
    primayControllers: {
        width: '8%',
        height: '100vh',
        borderRight: '1px solid #e1e1e1',
        background: '#fff'
    },
    scene: {
        flex: 1,
        width: 'auto',
        height: '100vh',
        backgroundColor: '#f5f6f7',
        position: 'relative'
    },
    ContentMetabox: {
        position: 'absolute',
        top: 80,
        right: 0,
        bottom: 0,
        width: '330px',
    },
    pcWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    pcItem: {
        margin: '10px 0px',
        padding: '25px',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0 0 11px 0 rgba(0,0,0,.14)',
        position: 'relative',
        transition: 'box-shadow .3s linear,transform .15s linear',
        textAlign: 'center',
        fontSize: '15px',
        '&:hover': {
            boxShadow: '0 0 22px 0 rgba(0,0,0,.23)',
        }
    },
    ws_wrapper: {
        marginTop: '50px',
        marginLeft: '30px',
        minHeight: '600px',
        width: '800px',
        borderRadius: '4px',
        border: '1px solid #e1e1e1'
    }

}));


export default function WorkSpace() {

    const classes = useStyles();

    return (
        <>
            <NavBar haveButton={false} />
            <Grid container direction="row" >
                <Grid item className={classes.primayControllers} >
                    <div className={classes.pcWrapper}>
                        <div className={classes.pcItem}>Video</div>
                        <div className={classes.pcItem}>Button</div>
                        <div className={classes.pcItem}>Image</div>
                        <div className={classes.pcItem}>Audio</div>
                        <div className={classes.pcItem}>3D model</div>
                    </div>
                </Grid>
                <Grid item className={classes.scene}>
                    <div className={classes.ws_wrapper}>
                        workspace container
                    </div>
                </Grid>
                {/* <Grid item style={{
                    width: '25%',
                    height: '100vh',
                    backgroundColor: '#f5f6f7'
                }}>
                    ar meta data
            </Grid> */}

                <div className={classes.ContentMetabox}>
                    <Typography variant="h6" >
                        AR Content
                </Typography>
                </div>

                {/* <Grid item sm={false} xs={12}  >
                    <Grid container direction="row"
                        justify="space-between" className={classes.container} >

                    </Grid>

                </Grid> */}
            </Grid>
        </ >
    )
}
