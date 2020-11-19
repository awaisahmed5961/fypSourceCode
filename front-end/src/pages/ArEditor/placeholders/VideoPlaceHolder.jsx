import React, { useRef, useEffect, useState } from 'react'
import videoIcon from '../../../app assetrs/editorIcons/play-button.svg';
import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
const useStyles = makeStyles((theme) => ({
    circle: {
        left: '-20px',
        top: '3px',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'inline-block',
        boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
        position: 'relative',
        height: '35px',
        width: '35px',
        backgroundColor: [theme.palette.primary.main],
        zIndex: '2',
        verticalAlign: 'middle',
        textAlign: 'center',
        lineHeight: '35px',
        fontSize: '25px',
        color: '#fff'
    },
    little_c: {
        marginRight: '4px'
    },
    buttonlist: {
        position: 'absolute',
        top: '0',
        left: '90px',
        display: 'inline - block',
        marginTop: '-12px',
        marginLeft: '-50px',
        verticalAlign: 'middle',
    }

}));

export default function VideoPlaceHolder(props) {
    const [videosource, setVidesource] = useState(null);
    const [aspectRation, setAspectRation] = useState({
        width: 250,
        height: 150
    })
    const [openScaleOption, setOpenScaleOption] = useState(false);
    const classes = useStyles();
    const videoCanvasRef = useRef(null);
    const videoCanvasContext = useRef(null);

    useEffect(() => {
        setVidesource(props.ardata.fileData);
        var videoElement;
        var videoDiv;

        if (props.ardata.fileData) {
            const { ardata } = props;
            videoElement = document.createElement("video");
            videoDiv = document.createElement('div');
            document.body.appendChild(videoDiv);
            videoDiv.appendChild(videoElement);
            videoDiv.setAttribute("style", "display:none;");
            videoElement.setAttribute("src", props.ardata.fileData);
            videoElement.setAttribute("width", '100%');
            videoElement.setAttribute("height", 'auto');
            videoElement.setAttribute("volume", "0");



            const canvas = videoCanvasRef.current;
            canvas.width = ardata.width;
            canvas.height = ardata.height;
            const context = canvas.getContext('2d');
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);



            videoElement.play();

            setInterval(drawScreen, 33);


            function drawScreen() {

                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            }
        }
        else {
            const canvas = videoCanvasRef.current;
            canvas.width = props.ardata.width;
            canvas.height = props.ardata.height;

            const context = canvas.getContext('2d');

            var img = new Image();
            img.src = videoIcon;
            img.onload = function () {
                context.drawImage(img, ((canvas.width - 45) / 2), ((canvas.height - 45) / 2), 45, 45);
            };

        }
        return function cleanup() {
            if (videoElement) {
                videoElement.pause();
            }
        };


    }, [props.ardata.fileData, aspectRation]);
    const scaleUp = () => {
        const { ardata } = props;
        if (ardata.width > 300) {
            alert('Increasing The Aspect Ratio will reduce the video Quality.')
            return
        }
        const newAspectRatio = {
            height: aspectRation.height + 30,
            width: aspectRation.width + 30
        }
        props.setArdata({
            ...ardata,
            ...newAspectRatio
        });
        setAspectRation({
            ...newAspectRatio
        })
    }

    const scaleDown = () => {
        const { ardata } = props
        if (aspectRation.height < 150) {
            alert('Decreasing The Aspect Ratio will affectr the AR Experience.')
            return
        }
        const newAspectRatio = {
            height: aspectRation.height - 30,
            width: aspectRation.width - 30
        }
        props.setArdata({
            ...ardata,
            ...newAspectRatio
        });
        setAspectRation({
            ...newAspectRatio
        })

    }



    return (
        <>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50% ,-50%)'
            }}

            >
                <div className={classes.circle} onClick={() => setOpenScaleOption(!openScaleOption)} id="big_c">
                    {openScaleOption ? (<span>&#10005;</span>) : '+'}
                </div>
                {
                    openScaleOption ? (<div id="l_circles" className={classes.buttonlist}>
                        <div onClick={() => scaleUp()} className={classNames(classes.circle, classes.little_c)} id="c-one">
                            +
                    </div>

                        <div onClick={() => scaleDown()}
                            className={classNames(classes.circle, classes.little_c)}
                            id="c-two">
                            -
                    </div>
                    </div>) : ''
                }
                <canvas ref={videoCanvasRef} style={{
                    border: '1px solid #3f51b5',
                    borderRadius: '4px',
                    display: 'block'

                }}>

                </canvas>

            </div>
        </>

    )
}
