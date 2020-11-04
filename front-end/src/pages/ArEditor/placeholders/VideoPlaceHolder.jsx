import React, { useRef, useEffect } from 'react'
import videoIcon from '../../../app assetrs/editorIcons/play-button.svg';
export default function VideoPlaceHolder() {
    // const videoCanvasRef = useRef(null);
    // const videoCanvasContext = useRef(null);

    useEffect(() => {
        // const canvas = videoCanvasRef.current;
        // canvas.width = '400px';
        // canvas.height = '400px';

        // const context = canvas.getContext('2d');
        // videoCanvasContext.current = context;



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
                <canvas style={{
                    border: '1px solid #000000',
                    backgroundColor: 'red',
                    // paddingLeft: 0,
                    // paddingRight: 0,
                    // marginLeft: 'auto',
                    // marginRight: 'auto',
                    display: 'block',

                }}>

                </canvas>
            </div>
        </>

    )
}
