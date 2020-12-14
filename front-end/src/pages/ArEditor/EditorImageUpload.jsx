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
import EditorDialog from '../../components/Ui/editorComponents/EditorDialog';
import { LoadingSpinner } from '../../components/LoadinSpinner';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import imagebase64 from '../../utils/imagebase64'

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
    },

}));


export default function EditorImageUpload() {
    let history = useHistory();
    const [rotation, setRotation] = useState(0);
    const [currentRatio, setCurrentRatio] = useState({
        height: 400,
        width: 800
    });
    const [file, SetFile] = useState(null);
    const [filein64, SetFileIn64] = useState(null);
    if (file) {
        const result = imagebase64(file[0]);
        result.then((w) => {
            SetFileIn64(w);
        })
    }

    const [crop, setCrop] = useState(
        {
            unit: 'px',
            x: 0,
            y: 0,
            width: 800,
            height: 400,
            aspect: 1 / 1
        }
    );
    const [processing, setProcessing] = React.useState(false);
    const classes = useStyles();

    const handleOnChange = (crop) => {
        setCrop(crop);

    }
    const handleImageLoaded = (image) => {


    }
    const handleOnCropChange = (crop) => {
        setCrop(crop);

    }
    const handleOnCropComplete = (cropPixel, pixelCrop) => {

        // percentages to pixel calculation
        // var percentsWidth = parseInt(pixelCrop.width);
        // var parentWidth = parseInt(cropPixel.width);
        // var pixels = parentWidth * (percentsWidth / 100);
        // console.log('width in pixel' + parseInt(pixels))

        // var percentsHeight = parseInt(pixelCrop.height);
        // var parentHeight = parseInt(cropPixel.height);
        // var pixelsheight = parentHeight * (percentsHeight / 100);
        // console.log('height in pixel' + parseInt(pixelsheight))

        // var percentsx = parseInt(pixelCrop.x);
        // var parentW = parseInt(cropPixel.width);
        // var pixelsx = parentW * (percentsx / 100);
        // console.log('x in pixel' + parseInt(pixelsx))

        // var percentsY = parseInt(pixelCrop.y);
        // var parentH = parseInt(cropPixel.height);
        // var pixelsy = parentH * (percentsY / 100);
        // console.log('y in pixel' + parseInt(pixelsy))


        // var canvas = document.getElementById('myCanvas');
        // canvas.width = pixels;
        // canvas.height = pixelsheight;

        // var context = canvas.getContext('2d');
        // var imageObj = new Image();

        // imageObj.onload = function () {
        //     // draw cropped image
        //     // var sourceX = cropPixel.x;
        //     // var sourceY = cropPixel.y;
        //     // var sourceWidth = cropPixel.width;
        //     // var sourceHeight = cropPixel.height;
        //     // var destWidth = sourceWidth;
        //     // var destHeight = sourceHeight;
        //     // var destX = canvas.width / 2 - destWidth / 2;
        //     // var destY = canvas.height / 2 - destHeight / 2;

        //     context.drawImage(imageObj, cropPixel.x, cropPixel.y, cropPixel.width, cropPixel.height, parseInt(pixelsx), parseInt(pixelsy), parseInt(pixels), parseInt(pixelsheight));
        // };
        // imageObj.src = filein64;
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
    const handleUploadingMarker = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            history.push("/editor/workspace");
        }, 2000)

        localStorage.setItem('MarkerImage', file ? file[0].preview : '');
        localStorage.setItem('MarkerImageBase64', filein64 ? filein64 : '');
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

                                        <ReactCrop
                                            src={filein64 ? filein64 : ''}
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
                                        {/* <div className={classes.buttonRow}>
                                            <button className={classes.outlinedButton} onClick={() => rotateleft()} >left</button>
                                            <button className={classes.outlinedButton} onClick={() => rotate()}>right</button>
                                        </div> */}
                                    </div>
                                    <div>
                                        <button onClick={() => SetFile(null)} className={classes.outlinedButton}>Remove</button>
                                    </div>
                                    {/* <div>
                                        <button className={classes.outlinedButton} >Gray Scale</button>
                                    </div> */}
                                </div>
                            </>)
                            }

                        </div>
                        {
                            file && (<>
                                <div className={classes.botomCta}>

                                    <canvas id="myCanvas" ></canvas>

                                    <Button variant="outlined" color="primary" style={{
                                        marginRight: '20px'
                                    }}>
                                        Cancel
                            </Button>
                                    <Button onClick={() => handleUploadingMarker()} variant="contained" color="primary">
                                        Use This Marker
                            </Button>
                                </div>
                            </>)
                        }
                    </Grid>

                </Grid>
            </Grid>
            <EditorDialog open={processing} >
                <LoadingSpinner style={{
                    display: 'block',
                    margin: '0 auto'
                }} />
                <div style={{
                    textAlign: 'center',
                    marginTop: '10px'
                }}>
                    <Typography variant="h6" >
                        Processing Marker
                </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Please wait, it may take a while
                </Typography>
                </div>
            </EditorDialog>

        </div >
    )
}
