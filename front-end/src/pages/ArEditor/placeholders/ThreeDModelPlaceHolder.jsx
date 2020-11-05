import React, { useRef, useEffect } from 'react';
import threedIcon from '../../../app assetrs/editorIcons/3dmodel.svg';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

}));

function ThreeDModelPlaceHolder() {
    const classes = useStyles();
    const videoCanvasRef = useRef(null);
    const videoCanvasContext = useRef(null);

    useEffect(() => {
        const canvas = videoCanvasRef.current;
        canvas.width = '250';
        canvas.height = '150';

        const context = canvas.getContext('2d');

        var img = new Image();
        img.src = threedIcon;
        img.onload = function () {
            context.drawImage(img, ((canvas.width - 45) / 2), ((canvas.height - 45) / 2), 45, 45);

        };


    }, []);
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
                    border: '1px solid #000000',
                    borderColor: 'green',
                    borderRadius: '4px',
                    display: 'block'

                }}>

                </canvas>

            </div>
        </>
    )
}

export default ThreeDModelPlaceHolder
