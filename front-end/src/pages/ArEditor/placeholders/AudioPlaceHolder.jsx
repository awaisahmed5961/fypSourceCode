import React, { useEffect, useRef, useState } from 'react'
import audioIcon from '../../../app assetrs/editorIcons/speaker.svg';
import { makeStyles } from '@material-ui/core/styles';
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
function AudioPlaceHolder(props) {
    const classes = useStyles();
    const videoCanvasRef = useRef(null);
    const videoCanvasContext = useRef(null);

    const [openScaleOption, setOpenScaleOption] = useState(false);
    useEffect(() => {
        const canvas = videoCanvasRef.current;
        canvas.width = props.ardata.width;
        canvas.height = props.ardata.height;

        const context = canvas.getContext('2d');

        var img = new Image();
        img.src = audioIcon;
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

export default AudioPlaceHolder
