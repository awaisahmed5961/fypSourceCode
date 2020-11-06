import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    container: {
        width: '90%',
        height: '200px',
        border: `3px dashed ${[theme.palette.primary.main]}`,
        borderRadius: '4px',
        lineHeight: '200px',
        textAlign: 'center',
        textTransform: 'capitalize',
        fontSize: '20px',
        color: [theme.palette.primary.main]
    }
}));
function EmptyAr() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            no Component Selected
        </div>
    )
}

export default EmptyAr
