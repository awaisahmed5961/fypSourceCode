import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ReactComponent as FileIcon } from '../app assetrs/icons/image.svg'

const useStyles = makeStyles((theme) => (
    {
        container: {
            flex: 1,
        },
        dropzoon: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '335px',
            borderColor: 'grey',
            borderStyle: 'dashed',
            backgroundColor: '#f5fcff',
            borderWidth: '2px',
            borderRadius: '2px',
            color: '#272727',
            outline: 'none',
            transition: 'border .24s ease-in-out',
            margin: '10px',
            padding: '20px',
            [theme.breakpoints.down('sm')]: {
                margin: '10px'
            }
        },
        HeadingPrimary: {
            textTransform: "uppercase",
            fontSize: '20px',
            fontWeight: '100',
            letterSpacing: '-0.8',
            "&:hover": {
                color: [theme.palette.primary.main]
            },
            transition: 'color 2s'
        },
        innerText: {
            textAlign: 'center'
        }
    }));

export default function CustomImageUpload() {

    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const onDrop = useCallback(acceptedFiles => {
        // props.onImageUpload(acceptedFiles);

    }, [])

    const { getRootProps,
        getInputProps,
        open,
        acceptedFiles,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({

        onDrop,
        noClick: true,
        noKeyboard: true,
        multiple: false,
        maxSize: 1000000,
        accept: 'image/jpeg, image/png'
    });



    const files = acceptedFiles.map(file => (
        <p key={file.path}>
            {file.path} - {file.size} bytes
        </p>
    ));

    return (
        <>
            <div className={classes.container}>
                <div {...getRootProps({
                    className: classes.dropzoon,

                })}>

                    <input {...getInputProps()} />
                    <FileIcon style={{
                        width: '150px',
                        height: '150px'

                    }} />
                    {/* <Button variant="contained" color="primary" onClick={open}>
                        Upload Image
                    </Button> */}
                    {isDragReject && (
                        <p >Image should be JPEG / PNG </p>)}
                    {
                        matches ? (<div className={
                            classes.innerText
                        }>

                            {isDragActive ? (<p>Drop Image here</p>) : (<>
                                <p onClick={open} className={
                                    classes.HeadingPrimary
                                }>Upload Image to define Propotion</p>
                                <em>(At Least 320 x 320 px)</em>
                            </>)}


                        </div>) : ''
                    }
                </div>
            </div>
            <aside>
                {
                    files.length !== 0 ? (<div>
                        <h4>Image</h4>
                        <div>{files}</div>
                    </div>) : null
                }
            </aside>
        </>
    );
}