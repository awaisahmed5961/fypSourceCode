import React, { useState, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import imageIcon from '../../../app assetrs/editorIcons/image.svg';
import FileUpload from '../FileUpload';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: [theme.palette.primary.main],
        textTransform: 'uppercase',
        letterSpacing: '2px'
    },
    icon: {
        fill: [theme.palette.primary.main]
    },
    contentMainHeading: {
        fontSize: '15px',
        padding: '13px 0px',
        paddingLeft: '-15px',
        marginTop: '-20px',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        display: 'block',
        width: '100%'
    }, contentMBox: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    ExternalUrl: {
        display: 'block',
        width: '98%',
        height: '30px',
        borderRadius: '4px',
        fontSize: '16px',
        paddingLeft: '12px',
        '&:focus': {
            border: `1px solid ${[theme.palette.primary.main]}`,
            outline: 'none'
        }
    }
}));

function ImageAr(props) {
    const classes = useStyles();
    const [file, setFile] = useState(null);
    useEffect(() => {
        if (file) {
            props.onUpload(
                {
                    ...props.ar,
                    type: 'image',
                    fileData: file
                });
        }
    }, [file])
    return (
        <div className={classes.root}>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.icon} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <img src={imageIcon} style={{
                        alignSelf: 'center',
                        width: '25px',
                        height: '25px',
                        marginRight: '10px'
                    }} />
                    <Typography className={classes.heading}>



                        IMAGE <span>
                            <IconButton disableRipple onClick={() => { alert('null the state') }}
                                aria-label="Delete"
                            >
                                <DeleteIcon className={classes.icon} />
                            </IconButton>
                        </span>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <div className={classes.contentMBox}>
                        <div className={classes.contentMainHeading}>
                            Choose Image
                        <div>
                            </div>
                        </div>
                        <div style={{
                            marginTop: '20px',
                            fontSize: '22px',
                            opacity: '.9',
                            letterSpacing: '1px'
                        }}>
                            <div style={{
                                marginTop: '20px'
                            }}>
                                <FileUpload onUpload={setFile} acceptedfiles="image/jpeg, image/png" icon={imageIcon} />
                            </div>
                        </div>

                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default ImageAr
