import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';

import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => (
    {
        container: {
            flex: 1,
        },
        dropzoon: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 'auto',
            borderColor: 'grey',
            borderStyle: 'dashed',
            backgroundColor: '#f5fcff',
            borderWidth: '2px',
            borderRadius: '2px',
            color: '#272727',
            outline: 'none',
            transition: 'border .24s ease-in-out',
            padding: '20px',
            [theme.breakpoints.down('sm')]: {
                margin: '10px'
            }
        },
        icon: {
            width: '100px',
            height: '100px',
            marginBottom: '20px'
        }
    }));

export default function Upload3d(props) {
    const classes = useStyles();

    const theme = useTheme();

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.map((file) => {
            props.onUpload(file);

        });

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
        // accept: 'video/*'
        accept: props.acceptedfiles
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
                    <img src={props.icon} alt="" className={classes.icon} onClick={open} />
                </div>
            </div>
            <aside>
                {
                    files.length !== 0 ? (<div>
                        <h4>Model</h4>
                        <div>{files}</div>
                    </div>) : null
                }
            </aside>
        </>
    );
}