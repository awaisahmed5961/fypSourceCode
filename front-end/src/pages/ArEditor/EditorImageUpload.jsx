import React, { useState } from 'react'
import { makeStyles, fade } from '@material-ui/core/styles';

import NavBar from '../../components/NavBar'
import BreadCrumbs from '../../components/BreadCrumbs';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import CustomImageUpload from '../../components/customFileUploader';
import Button from '@material-ui/core/Button';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
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
    uploadImageContainerWrapper: {
        width: '600px',
        height: '400px',
        border: '1px solid #e1e1e1',
        borderRadius: '4px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50% , -50%)',
        padding: '10px',
        "& img": {
            width: '100%',
            height: '100%'
        }

    },
    ImageContainerWrapper: {
        minWidth: '800px',
        minHeight: '400px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50% , -50%)',
        // padding: '10px',
        "& img": {
            width: '100%',
            height: '100%',
            border: '1px solid #e1e1e1',
            borderRadius: '4px',
            padding: '10px'
        }
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
    }, botomCta: {
        display: "block",
        margin: '0 auto',
        marginTop: '10px',
        marginBottom: '10px'
    }
}));


export default function EditorImageUpload() {
    const [rotation, setRotation] = useState(0);
    const [currentRatio, setCurrentRatio] = useState({
        height: 400,
        width: 800
    });
    const [file, SetFile] = useState(null);
    const [crop, setCrop] = useState(
        {
            unit: 'px', // default, can be 'px' or '%'
            x: 0,
            y: 0,
            width: 200,
            height: 200,
            aspect: 1 / 1
        }
    );
    const classes = useStyles();

    const handleOnChange = (crop) => {
        console.log(crop);
        setCrop(crop);

    }
    const handleImageLoaded = (image) => {
        console.log(image);
        console.log("editorImageUpload line 146")
    }
    const handleOnCropChange = (crop) => {
        setCrop(crop);
        console.log("log from editorImageupload line 150")
    }
    const handleOnCropComplete = (crop, pixelCrop) => {
        console.log(crop, pixelCrop)
    }
    const zoomPicIn = () => {
        if (currentRatio.height > 600) {
            return
        }
        const newRatio = {
            height: currentRatio.height + 30,
            width: currentRatio.width + 30
        }

        setCurrentRatio({
            ...newRatio
        });
    }

    const zoomPicOut = () => {
        if (currentRatio.height < 200) {
            return
        }
        const newRatio = {
            height: currentRatio.height - 30,
            width: currentRatio.width - 30
        }
        setCurrentRatio({
            ...newRatio
        });
    }

    const rotate = () => {
        let newRotation = rotation + 90;
        if (newRotation >= 360) {
            newRotation = - 360;
        }
        setRotation(newRotation);
    }

    const rotateleft = () => {
        let newRotation = rotation - 90;
        if (newRotation >= 360) {
            newRotation = -360;
        }
        setRotation(newRotation)
        // this.setState({
        //     rotation: newRotation,
        // })
    }

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
                            {
                                file ? (
                                    <div
                                        style={{ ...currentRatio }}
                                        className={classes.ImageContainerWrapper}>
                                        {/* <img
                                            style={{ transform: `rotate(${rotation}deg)` }}
                                            src={file ? file[0].preview : ''} /> */}
                                        <ReactCrop
                                            src={file ? file[0].preview : ''}
                                            style={{ transform: `rotate(${rotation}deg)` }
                                            }
                                            crop={crop}
                                            onChange={handleOnCropChange}
                                            onImageLoaded={handleImageLoaded}
                                            onComplete={handleOnCropComplete}
                                        />

                                    </div>
                                ) : (
                                        <div className={classes.uploadImageContainerWrapper}>
                                            <CustomImageUpload onUpload={SetFile} />
                                        </div>
                                    )}


                            {file && (<><div className={classes.containerLeftSideControllers}>
                                <button onClick={() => zoomPicIn()}>+</button>
                                <button onClick={() => zoomPicOut()}>-</button>
                            </div>

                                <div className={classes.containerRightSideControllers}>
                                    <div>
                                        <div className={classes.buttonRow}>
                                            <button className={classes.outlinedButton} onClick={() => rotateleft()} >left</button>
                                            <button className={classes.outlinedButton} onClick={() => rotate()}>right</button>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => SetFile(null)} className={classes.outlinedButton}>Remove</button>
                                    </div>
                                    <div>
                                        <button className={classes.outlinedButton} >Gray Scale</button>
                                    </div>
                                </div>
                            </>)
                            }

                        </div>
                        {
                            file && (<>
                                <div className={classes.botomCta}>
                                    <Button variant="outlined" color="primary" style={{
                                        marginRight: '20px'
                                    }}>
                                        Cancel
                            </Button>
                                    <Button variant="contained" color="primary">
                                        Use This Marker
                            </Button>
                                </div>
                            </>)
                        }
                    </Grid>

                </Grid>
            </Grid>


        </div >
    )
}
