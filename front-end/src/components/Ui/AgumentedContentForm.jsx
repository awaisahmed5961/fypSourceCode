import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '10px',
        height: '50vh',
        marginBottom: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerWrapper: {
        width: '80%',
        height: '80%',
        border: '2px dashed',
        borderColor: [theme.palette.primary.main],

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'


    }
}));

export default function AgumentedContentForm() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.container}>
                <div className={classes.innerWrapper}>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => window.open("/editor", "_blank")}>
                        Create Augmentation
                        </Button>
                </div>
            </div>
        </div>
    )
}
