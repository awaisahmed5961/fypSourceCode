import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '10px',
        height: '50vh'
    },
    formCta: {
        marginBottom: '50px',
        textAlign: 'right'
    },

}));

export default function TopicExerciseForm() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.formCta}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Create Exercise
                </Button>
            </div>
        </div>
    )
}
