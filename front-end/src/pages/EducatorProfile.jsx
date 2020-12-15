import React from 'react'
import NavBar from '../components/NavBar';
import { makeStyles, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'block',
        margin: '0 auto',
        marginTop: '30px',
        width: '90%',
        minHeight: '700px',
        backgroundColor: '#eee',
        borderRadius: '4px',
    },
    containerInner: {
        display: 'flex',
    },
    leftcontainer: {
        width: '30%',
        // backgroundColor: 'yellow'
        minHeight: '700px'
    },
    rightContainer: {
        width: '70%',
        // backgroundColor: '#eee'
    },
    profileImage: {
        display: 'block',
        margin: '0 auto',
        width: '250px',
        height: '250px',
        backgroundColor: 'yellow',
        borderRadius: '50%',
        marginTop: '20px',
        marginBottom: '20px'
    }

    // leftMenu: {
    //     width: '90%',
    //     margin: "0 auto",
    //     display: "block",
    //     textAlign: 'center'
    // },
    // contentArea: {
    //     width: '90%',
    //     margin: "0 auto",
    //     display: "block",
    //     backgroundColor: 'orange',
    //     // backgroundColor: "#f7f7f7",
    //     height: "700px"
    // },

}));

export default function EducatorProfile() {
    const classes = useStyles();
    return (
        <div>
            <NavBar />
            <div className={classes.container}>
                <div className={classes.containerInner}>
                    <div className={classes.leftcontainer} >
                        <div>
                            <div className={classes.profileImage}>
                                {/* profile */}
                            </div>
                            <div className={classes.menuList}>
                                menut list
                            </div>
                        </div>
                    </div>
                    <div className={classes.rightContainer}>
                        right side
                </div>
                </div>
            </div>
            {/* <Grid container direction="row" style={{ backgroundColor: "#eee" }} >
                <div style={{
                    margin: '0 auto',
                    marginTop: '40px',
                    width: '90%',
                    minHeight: '88vh',
                    borderRadius: '4px'
                }}>
                    <Grid container direction="row" >

                        <Grid item xs={3}   >
                            <div className={classes.leftcontainer}>
                                <div className={classes.profileImage}>
                                    {/* <img src="" alt="" /> */}
            {/* <div style={{
                                        width: '200px',
                                        height: '200px',
                                        borderRadius: '50%',
                                        backgroundColor: 'yellow'

                                    }}></div>
                                </div>
                                <div className={classes.leftMenu}>
                                    <div>Account</div>
                                    <div>Password</div>
                                </div>
                            </div >
                        </Grid >
        <Grid item xs={9}  >
            <div className={classes.contentArea}>
                show here
                            </div>
        </Grid>
                    </Grid >

                </div >
                
            </Grid >  */}
        </div >
    )
}
