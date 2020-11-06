import React, { useState, useEffect } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import videoIcon from '../../../app assetrs/editorIcons/play-button.svg';
import Button from '@material-ui/core/Button';
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
    }
}));

function VideoAr(props) {
    const classes = useStyles();
    const [file, setFile] = useState(null);
    useEffect(() => {
        if (file) {
            props.onUpload(file);
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
                    <img src={videoIcon} style={{
                        alignSelf: 'center',
                        width: '25px',
                        height: '25px',
                        marginRight: '10px'
                    }} />
                    <Typography className={classes.heading}>



                        Video <span>
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
                            Video Source
                        <div>
                                <Button variant="contained" color="primary" style={{
                                    marginTop: '10px',
                                }}>
                                    From Youtube
                    </Button>
                            </div>
                        </div>
                        <div style={{
                            marginTop: '20px',
                            fontSize: '22px',
                            opacity: '.9',
                            letterSpacing: '1px'
                        }}>
                            PAST URL
                            <input type="text" />
                            <div style={{
                                marginTop: '20px'
                            }}>
                                <FileUpload onUpload={setFile} />
                            </div>
                        </div>

                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default VideoAr
