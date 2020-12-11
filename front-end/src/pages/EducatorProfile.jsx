import React from 'react'
import NavBar from '../components/NavBar';
import { makeStyles, fade } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    leftcontainer: {
        width: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "100px"

    },
    leftMenu: {
        width: '90%',
        margin: "0 auto",
        display: "block"
    },
    contentArea: {
        width: '90%',
        margin: "0 auto",
        display: "block",
        backgroundColor: "#f7f7f7",
        height: "700px"
    }
}));

export default function EducatorProfile() {
    const classes = useStyles();
    return (
        <div>
            <NavBar />
            <Grid container direction="row" style={{ backgroundColor: "#eee" }} >
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
                                <div>
                                    <img src="" alt="" />
                                    <svg id="Kid_avatar" height="512" viewBox="0 0 64 64" width="512" xmlns="http://www.w3.org/2000/svg" data-name="Kid avatar"><path d="m19 30h-2.5a3.5 3.5 0 0 1 -3.5-3.5 3.5 3.5 0 0 1 3.5-3.5h2.5z" fill="#ffcbbe" /><path d="m45 30h2.5a3.5 3.5 0 0 0 3.5-3.5 3.5 3.5 0 0 0 -3.5-3.5h-2.5z" fill="#ffcbbe" /><path d="m50 61h-36l.43-8.6a12 12 0 0 1 11.985-11.4h11.17a12 12 0 0 1 11.985 11.4z" fill="#3780ea" /><path d="m38 40c0 3.314-6 10-6 10s-6-6.686-6-10a6 6 0 0 1 12 0z" fill="#ffcbbe" /><path d="m32 42a14 14 0 0 1 -14-14v-13l6-5h16l6 5v13a14 14 0 0 1 -14 14z" fill="#ffddce" /><g fill="#3e3d42"><path d="m25 25v2a1 1 0 0 0 2 0v-2a1 1 0 0 0 -2 0z" /><path d="m37 25v2a1 1 0 0 0 2 0v-2a1 1 0 0 0 -2 0z" /><path d="m39 34h-2c0 1.626-2.29 3-5 3s-5-1.374-5-3h-2c0 2.8 3.075 5 7 5s7-2.2 7-5z" /><path d="m47 23h-2l-2.342-4.683a6 6 0 0 0 -5.366-3.317h-10.967a6 6 0 0 0 -5.088 2.82l-3.237 5.18h-1v-10.146a3 3 0 0 1 1.658-2.683l.342-.171-1-3h4l-1-4h14.686a11.313 11.313 0 0 1 11.314 11.314z" /><path d="m47 22-.707-.707-2.66 2.66a5.992 5.992 0 0 0 -11.543 1.047h-.18a5.992 5.992 0 0 0 -11.543-1.047l-2.66-2.66-.707.707v1l3.022 3.436a5.993 5.993 0 0 0 11.888.564h.18a5.993 5.993 0 0 0 11.888-.564l3.022-3.436zm-21 8a4 4 0 1 1 4-4 4 4 0 0 1 -4 4zm12 0a4 4 0 1 1 4-4 4 4 0 0 1 -4 4z" /></g></svg>
                                </div>
                                <div className={classes.leftMenu}>
                                    <div>Account</div>
                                    <div>Password</div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={9}  >
                            <div className={classes.contentArea}>
                                show here
                            </div>
                        </Grid>
                    </Grid>

                </div>
                {/* <Grid item sm={false} xs={12} style={{
                    marginTop: '50px'
                }}  >
                    <Grid container direction="row"
                        justify="space-between"  >
                        <Grid item >
                        </Grid>
                        <Grid item >
                            <Grid direction='row' container>


                            </Grid>
                        </Grid>
                        <Grid item sm={false} xs={12} >

                        </Grid>
                    </Grid>
                </Grid> */}
            </Grid>
        </div>
    )
}
