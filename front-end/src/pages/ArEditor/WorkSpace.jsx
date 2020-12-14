import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../../components/NavBar'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import videoIcon from '../../app assetrs/editorIcons/play-button.svg';
import audioIcon from '../../app assetrs/editorIcons/speaker.svg';
import imageIcon from '../../app assetrs/editorIcons/image.svg';
import threedIcon from '../../app assetrs/editorIcons/3dmodel.svg';
import xlayerIcon from '../../app assetrs/editorIcons/layers.svg';
import zlayerIcon from '../../app assetrs/editorIcons/layer.svg';
import ylayerIcon from '../../app assetrs/editorIcons/ylayer.svg';
import VideoPlaceHolder from './placeholders/VideoPlaceHolder';
import ImagePlaceHolder from './placeholders/ImagePlaceHolder';
import AudioPlaceHolder from './placeholders/AudioPlaceHolder';
import ThreeDModelPlaceHolder from './placeholders/ThreeDModelPlaceHolder';
import EmptyAr from './ArControlls/EmptyAr';
import VideoAr from './ArControlls/VideoAr';
import axios from 'axios';
import ImageAr from './ArControlls/ImageAr';
import AudioAr from './ArControlls/AudioAr';
import ThreeDAr from './ArControlls/3dAr';
import EditorDialog from '../../components/Ui/editorComponents/EditorDialog';
import Button from '@material-ui/core/Button';
import ProgressBar from '../../components/Ui/editorComponents/ProgressBar'
import SuccessSpinner from '../../components/Ui/editorComponents/successSpinner/successSpinner';

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
        backgroundColor: '#f5f6f7',
        position: 'relative'

    },
    ContentMetabox: {
        width: '330px',
        backgroundColor: '#f5f6f7',
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
        },
        '& img': {
            width: '35px',
            height: '35px',
        }
    },
    ws_wrapper: {
        marginTop: '50px',
        display: 'block',
        margin: '0 auto'
    },
    heading: {
        display: 'block',
        backgroundColor: '#fff',
        paddingLeft: '13px',
        paddingBottom: '13px',
        paddingTop: '13px',
        '& h6': {
            textTransform: 'capitalize'

        }
    },
    bottomControlls: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: '50px',
        left: '30px'
    },
    scaleControlls: {
        display: 'flex',
        border: '2px solid',
        borderColor: [theme.palette.primary.main],
        borderRadius: '50px',
        '& button': {
            background: 'transparent',
            border: 'none',
            color: [theme.palette.primary.main],
            fontSize: '30px',
            margin: '5px 15px',
            '&:hover': {
                cursor: 'pointer'
            },
            '&:focus': {
                border: 'none',
                outline: 'none'
            }
        }
    },
    seenWrapper: {
        backgroundColor: '#eee',
        padding: '30px',
        borderRadius: '4px',
        display: 'block',
        margin: '0 auto'
    },
    ThreedControlls: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& button': {
            // background: [theme.palette.primary.main],
            border: `1px solid ${[theme.palette.primary.main]}`,
            borderRadius: '100px',
            color: [theme.palette.primary.main],
            padding: '13px 15px',
            margin: '5px 15px',
            '&:hover': {
                cursor: 'pointer'
            },
            '&:focus': {
                border: 'none',
                outline: 'none',
                border: `1px solid ${[theme.palette.primary.main]}`,
            },
            '& img': {
                width: '25px',
                height: '25px'
            }
        }
    }, activeTdcontroll: {
        background: [theme.palette.primary.main],
    },
    rangeSlider: {
        '& > input[type=range]': {
            width: '350px',
            cursor: 'pointer'
        }
    },
    progressHolder: {
        position: 'relative',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'yellowgreen',
        overflow: 'hidden',
    },
    semiCircle: {
        width: '100%',
        height: '100%',
        background: 'inherit',
        borderRadius: '50%',
        position: 'absolute',
        top: '0px',
        left: '0px'
    },
    leftBlock: {

        width: '50%',
        height: '100%',
        position: 'absolute',
        top: '0px',
        left: '0px',
        background: '#ccc',
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%'
    },
    rightBlock: {
        width: '50%',
        height: '100%',
        position: 'absolute',
        top: '0px',
        left: '50%',
        background: '#ccc',
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
        transformOrigin: 'left center'
    },
    mask: {
        width: '80%',
        height: '80%',
        position: 'absolute',
        left: '10%',
        top: '10%',
        background: '#fff',
        borderRadius: '50%',
        textAlign: 'center',
        '& > span': {
            color: 'yellowgreen',
            fontSize: '20px',
            fontFamily: 'Arial',
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            top: 'calc(50 % - 16px)',
            left: 'calc(0px)'
        }
    }
}));


export default function WorkSpace() {
    let history = useHistory();
    const [uploadingDialogOpen, setUpLoadingDialogeOpen] = useState(false);
    const [uploadingPercentage, setUploadingPercentage] = useState(0);
    const [uploaded, setUploaded] = useState(false);
    const [uploadedState, setUploadedState] = useState(null);
    const [currentArControll, setCurrentArControll] = useState(null);
    const [xAxiesvalue, setXaxiesValue] = useState(0);
    const [yAxiesvalue, setYaxiesValue] = useState(0);
    const [zAxiesvalue, setZaxiesValue] = useState(0);
    const [filePath, setFilePath] = useState(null);

    const [arContentMetadata, setArContentMetaData] = useState({
        type: 'none',
        fileData: '',
        file: null,
        width: 250,
        height: 150,
        rotate: null,
        controlls: []
    });


    const classes = useStyles();
    const [currentRatio, setCurrentRatio] = useState({
        height: 600,
        width: 1000
    });
    const [current3dControllSelected, setCurrent3dControllSelected] = useState('z');
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
        if (currentRatio.height < 500) {
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
    const uploadAR = () => {
        setUpLoadingDialogeOpen(true);
        setTimeout(() => {
            if (arContentMetadata.type === 'none') {
                return;
            }
            setUpLoadingDialogeOpen(true);
            if (arContentMetadata.type === 'threed') {
                const markerImage = {
                    Image: targetImageInbase64,
                    type: arContentMetadata.type,
                    fileData: arContentMetadata.fileData,
                    file: arContentMetadata.file,
                    width: arContentMetadata.width,
                    height: arContentMetadata.height,
                    rotate: arContentMetadata.rotate,
                }
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        if (totalLength !== null) {
                            setUploadingPercentage(Math.round((progressEvent.loaded * 100) / totalLength));
                        }
                    }
                }
                try {

                    const formData = new FormData();
                    formData.append('file', arContentMetadata.file);
                    formData.append("targetImage", markerImage.Image);
                    formData.append("type", markerImage.type);
                    formData.append("width", markerImage.width);
                    formData.append("height", markerImage.height);
                    formData.append("rotate", markerImage.rotate);
                    // formData.append("metadata", testObj)

                    const res = axios.post('/api/upload3dmodel', formData, config).then((q) => {

                        if (q.data === "some thing went wrong") {

                            setUploaded(true)
                            setUploadedState('error')
                        }
                        else {
                            setUploaded(true)
                            setUploadedState('success')
                        }

                    }).catch((err) => {
                        console.log(err)
                        console.log('workspace line 218')
                    });
                }
                catch (err) {
                    return err;
                }
            }
            else {

                const markerImage = {
                    Image: targetImageInbase64,
                    metadata: arContentMetadata
                }

                const config = {
                    headers: {
                        'Content-Type': 'application/json'

                    },
                    onUploadProgress: (progressEvent) => {
                        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                        if (totalLength !== null) {
                            setUploadingPercentage(Math.round((progressEvent.loaded * 100) / totalLength));
                        }
                    }
                }
                try {
                    const res = axios.post('/api/markerimages', markerImage, config).then((q) => {
                        // setUpLoadingDialogeOpen(false);
                        setUploadedState(true)
                        console.log(q);
                        if (q.data === "some thing went wrong") {
                            setUploaded(true)
                            setUploadedState('error')
                        }
                        else {
                            setUploaded(true)
                            setUploadedState('success')
                        }

                    }).catch((err) => {
                        console.log(err)
                        console.log('workspace line 218')
                    });
                }
                catch (err) {
                    return err;
                }
            }
        }, 3000);
    }

    useEffect(() => {
        setTargetImageUrl(localStorage.getItem('MarkerImage'));
        setTargetImageInbase64(localStorage.getItem('MarkerImageBase64'));
    }, []);
    const handleYAxiesSliderChange = (event) => {
        setYaxiesValue(event.target.value);
        setXaxiesValue(0);
    };
    const handleZAxiesSliderChange = (event) => {
        setYaxiesValue(0);
        setXaxiesValue(event.target.value);
    };
    const [targetImageUrl, setTargetImageUrl] = useState(null);
    const [targetImageInbase64, setTargetImageInbase64] = useState(null);

    const renderPlaceholder = (currentControll) => {
        switch (currentControll) {
            case 'video':
                return <VideoPlaceHolder ardata={arContentMetadata} setArdata={setArContentMetaData} />;
            case 'audio':
                return <AudioPlaceHolder ardata={arContentMetadata} setArdata={setArContentMetaData} />;
            case 'image':
                return <ImagePlaceHolder ardata={arContentMetadata} setArdata={setArContentMetaData} />;
            case 'threed':
                return <ThreeDModelPlaceHolder ardata={arContentMetadata} setArdata={setArContentMetaData} />;
            default:
                return null;
        }
    }
    const renderArContent = (currentControll) => {
        switch (currentControll) {
            case 'video':
                // return <VideoAr onUpload={setFilePath}  />;
                return <VideoAr onUpload={setArContentMetaData} ar={arContentMetadata} />;
            case 'audio':
                return <AudioAr onUpload={setArContentMetaData} ar={arContentMetadata} />;
            case 'image':
                return <ImageAr onUpload={setArContentMetaData} ar={arContentMetadata} />;
            case 'threed':
                return <ThreeDAr onUpload={setArContentMetaData} ar={arContentMetadata} />;
            default:
                return <EmptyAr />;
        }
    }

    return (
        <>
            <NavBar haveButton={false} />
            <Grid container direction="row" >
                <Grid item className={classes.primayControllers} >
                    <div className={classes.pcWrapper}>
                        <div className={classes.pcItem} onClick={() => setCurrentArControll('video')}>
                            <img src={videoIcon} alt="icon" />
                        </div>
                        <div className={classes.pcItem} onClick={() => setCurrentArControll('audio')}>
                            <img src={audioIcon} alt="icon" />
                        </div>
                        <div className={classes.pcItem} onClick={() => setCurrentArControll('image')}>
                            <img src={imageIcon} alt="icon" />
                        </div>
                        <div className={classes.pcItem} onClick={() => setCurrentArControll('threed')}>
                            <img src={threedIcon} alt="icon" />
                        </div>
                    </div>
                </Grid>
                <Grid item className={classes.scene}>
                    <div className={classes.Threedseen}>
                        <div className={classes.ws_wrapper}>
                            <div className={classes.seenWrapper} style={{
                                ...currentRatio,
                                transform: `perspective(${1812}px)
                                            rotateX(${xAxiesvalue}deg)
                                            rotateY(${yAxiesvalue}deg)
                                             rotateZ(${0}deg)`,
                                transformOrigin: 'center center',
                                transition: 'all 4s'
                            }}>
                                {
                                    targetImageUrl ? (

                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundImage: `url(${targetImageUrl})`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            borderRadius: '4px',
                                            position: 'relative'
                                        }}>
                                            {renderPlaceholder(currentArControll)}
                                        </div>
                                    )
                                        :
                                        (
                                            <h5>No Marker Selected</h5>
                                        )
                                }
                            </div>

                        </div>
                        <div className={classes.bottomControlls}>
                            <div className={classes.scaleControlls}>
                                <button onClick={() => zoomPicIn()}> + </button>
                                <button onClick={() => zoomPicOut()}> - </button>
                            </div>
                            <div className={classes.ThreedControlls}>
                                <button onClick={() => {
                                    setCurrent3dControllSelected('z');
                                    setXaxiesValue(0);
                                    setYaxiesValue(0);
                                    setZaxiesValue(0);
                                }
                                }>
                                    <img src={xlayerIcon} alt="layer x controll" />
                                </button>

                                <button onClick={() => setCurrent3dControllSelected('y')}>
                                    <img src={ylayerIcon} alt="layer x controll" />
                                </button>
                                {
                                    current3dControllSelected === 'y' ? (
                                        <div className={classes.rangeSlider}>
                                            <input
                                                type="range"
                                                name="range"
                                                min="-50"
                                                max="50"
                                                value={yAxiesvalue}
                                                step="1"
                                                onChange={(e) => handleYAxiesSliderChange(e)}
                                                style={{
                                                    width: '350px'
                                                }}
                                            />
                                        </div>
                                    ) : ''
                                }

                                <button onClick={() => setCurrent3dControllSelected('x')}>
                                    <img src={zlayerIcon} alt="layer z controll" />
                                </button>
                                {
                                    current3dControllSelected === 'x' ? (
                                        <div className={classes.rangeSlider}>
                                            <input
                                                type="range"
                                                name="range"
                                                min="-10"
                                                max="50"
                                                value={xAxiesvalue}
                                                step="1"
                                                onChange={(e) => handleZAxiesSliderChange(e)}
                                                style={{
                                                    width: '350px'
                                                }}
                                            />
                                        </div>
                                    ) : ''
                                }

                            </div>
                            <div >
                            </div>
                        </div>
                    </div>
                </Grid>

                <div className={classes.ContentMetabox}>
                    <div className={classes.heading}>
                        <Typography variant="h6" color="primary" >
                            AR CONTENT
                        </Typography>
                    </div>
                    {renderArContent(currentArControll)}
                </div>

            </Grid>
            <Grid>
                <div style={{
                    display: 'block',
                    height: '60px',
                    backgroundColor: '#eee',
                    textAlign: 'right',
                    paddingRight: '30px',
                    paddingTop: '30px'
                }}>
                    <Button onClick={() => alert('cancle')} variant="outlined" color="primary" style={{
                        width: '200px',
                        height: '50px',
                        marginRight: '20px'
                    }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={() => uploadAR()}
                        variant="contained"
                        color="primary" style={{
                            width: '200px',
                            height: '50px'
                        }}
                        {...(arContentMetadata.type === 'none' && { disabled: true })}
                    >
                        Save
                    </Button>
                </div>

            </Grid>
            <EditorDialog open={uploadingDialogOpen} >
                <div style={{
                    width: '500px',
                    height: '400px',
                    textAlign: 'center',
                    marginTop: '10px',
                    paddingLeft: '30px',
                    paddingRight: '30px'
                }}>
                    {
                        uploaded ? (<div style={{
                            marginBottom: '20px'
                        }}>
                            {
                                uploadedState === 'success' ? (<div>
                                    <SuccessSpinner style={{
                                        marginBottom: '20px',
                                    }} />
                                    <div style={{
                                        marginTop: '30px'
                                    }}>
                                        <Typography variant="h6" >
                                            AR Uploaded
                </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Please wait, it may take 8-15 minutes to plublish AR Content. Once its published you will get notified
                </Typography>

                                        <Button
                                            onClick={() => history.push('/')}
                                            variant="contained"
                                            color="primary" style={{
                                                width: '200px',
                                                height: '50px',
                                                marginTop: '20px'
                                            }}

                                        >
                                            Back to Dashboard
                    </Button>
                                    </div>
                                </div>) : (<div>

                                    <div style={{
                                        marginTop: '30px'
                                    }}>
                                        <Typography variant="h6" style={{
                                            color: 'red'
                                        }} >
                                            Failed to Uploaded AR
                </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Please retry, Please try with Correct formate or color scheme for Marker Image.
                </Typography>

                                        <Button
                                            onClick={() => history.push('/editor')}
                                            variant="contained"
                                            color="primary" style={{
                                                width: '200px',
                                                height: '50px',
                                                marginTop: '20px'
                                            }}

                                        >
                                            Back to Editor
                    </Button>
                                    </div>
                                </div>)
                            }


                        </div>) : (<div>

                            <div style={{
                                marginBottom: '20px'
                            }}>
                                <ProgressBar
                                    strokeWidth="10"
                                    sqSize="150"
                                    percentage={uploadingPercentage} />
                            </div>
                            <Typography variant="h6" >
                                Publishing AR Content
                </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Please wait, it may take a while
                </Typography>
                        </div>)
                    }

                </div>
            </EditorDialog>
        </ >
    )
}
