import React, { useState, useEffect, useRef } from 'react'
import imageIcon from '../../../app assetrs/editorIcons/image.svg';
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

function ImagePlaceHolder(props) {
    const [aspectRation, setAspectRation] = useState({
        width: 250,
        height: 150
    })
    const [openScaleOption, setOpenScaleOption] = useState(false);
    const classes = useStyles();
    const videoCanvasRef = useRef(null);

    useEffect(() => {

        if (props.ardata.fileData) {
            const canvas = videoCanvasRef.current;
            canvas.width = props.ardata.width;
            canvas.height = props.ardata.height;
            const context = canvas.getContext('2d');
            var img = new Image();
            img.src = props.ardata.fileData;
            img.onload = function () {
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            };

        }
        else {
            const canvas = videoCanvasRef.current;
            canvas.width = props.ardata.width;
            canvas.height = props.ardata.height;

            const context = canvas.getContext('2d');

            var img = new Image();
            img.src = imageIcon;
            img.onload = function () {
                context.drawImage(img, ((canvas.width - 45) / 2), ((canvas.height - 45) / 2), 45, 45);
            };

        }
    }, [aspectRation, props.ardata.fileData]);
    const scaleUp = () => {
        const { ardata } = props;
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
        });
    }

    const scaleDown = () => {
        const { ardata } = props;
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
        });

    }


    return (
        <>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50% ,-50%)'
            }}>
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

export default ImagePlaceHolder
