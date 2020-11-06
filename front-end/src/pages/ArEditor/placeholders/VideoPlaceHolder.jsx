import React, { useRef, useEffect, useState } from 'react'
import videoIcon from '../../../app assetrs/editorIcons/play-button.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

export default function VideoPlaceHolder(props) {
    const [videosource, setVidesource] = useState(null);
    const classes = useStyles();
    const videoCanvasRef = useRef(null);
    const v = useRef(null);
    const videoCanvasContext = useRef(null);

    useEffect(() => {
        setVidesource(props.videoSrc);
        if (props.videoSrc) {

            var videoElement;
            var videoDiv;
            videoElement = document.createElement("video");
            videoDiv = document.createElement('div');
            document.body.appendChild(videoDiv);
            videoDiv.appendChild(videoElement);
            videoDiv.setAttribute("style", "display:none;");
            videoElement.setAttribute("src", props.videoSrc);
            videoElement.setAttribute("width", '100%');
            videoElement.setAttribute("height", 'auto');


            const canvas = videoCanvasRef.current;
            canvas.width = '250';
            canvas.height = '150';
            const context = canvas.getContext('2d');
            context.drawImage(videoElement, 0, 0);



            videoElement.play();

            setInterval(drawScreen, 33);


            function drawScreen() {

                context.drawImage(videoElement, 0, 0);

            }
        }
        else {
            const canvas = videoCanvasRef.current;
            canvas.width = '250';
            canvas.height = '150';

            const context = canvas.getContext('2d');

            var img = new Image();
            img.src = videoIcon;
            img.onload = function () {
                context.drawImage(img, ((canvas.width - 45) / 2), ((canvas.height - 45) / 2), 45, 45);
            };

        }


    }, [props.videoSrc]);




    return (
        <>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50% ,-50%)'
            }}>
                controlls
                <canvas ref={videoCanvasRef} style={{
                    border: '1px solid #3f51b5',
                    borderRadius: '4px',
                    display: 'block'

                }}>

                </canvas>
                <div style={{ display: 'none' }}>
                    <video ref={v} controls loop style={{
                        height: 'auto',
                        width: '100%'
                    }}  >
                        <source src="" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                    </video>

                </div>

            </div>
        </>

    )
}
