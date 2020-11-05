import React, { useState, useEffect } from 'react'
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
        backgroundColor: '#fff'
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
        paddingLeft: '13px'
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
                background: [theme.palette.primary.main],
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
    }
}));


export default function WorkSpace() {
    const [currentArControll, setCurrentArControll] = useState(null);
    const [xAxiesvalue, setXaxiesValue] = useState(0);
    const [yAxiesvalue, setYaxiesValue] = useState(0);
    const [zAxiesvalue, setZaxiesValue] = useState(0);
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
    useEffect(() => {
        setTargetImageUrl(localStorage.getItem('MarkerImage'));
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

    const renderPlaceholder = (currentControll) => {
        switch (currentControll) {
            case 'video':
                return <VideoPlaceHolder />;
            case 'audio':
                return <AudioPlaceHolder />;
            case 'image':
                return <ImagePlaceHolder />;
            case 'threed':
                return <ThreeDModelPlaceHolder />;
            default:
                return null;
        }
    }

    const renderArContent = (currentControll) => {
        switch (currentControll) {
            case 'video':
                return null;
            case 'audio':
                return null;
            case 'image':
                return null;
            case 'threed':
                return null;
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
                            AR Content
                        </Typography>
                        {renderArContent(setCurrentArControll)}
                    </div>
                </div>


            </Grid>
        </ >
    )
}
