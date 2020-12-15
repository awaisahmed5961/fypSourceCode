import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles((theme) => ({
    title: {
        backgroundColor: 'white',
        width: '90vw', /* You can change the size however you like. */
        minHeight: '70px',
        marginBottom: '20px',
        overflow: 'hidden',
        borderRadius: '4px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.4)',
        textAlign: "left",
        lineHeight: '70px',

    },

}));


export default function SingleQuestion(props) {
    const classes = useStyles();

    const { Question } = props;
    console.log(Question)

    return (
        <div>

            <div className={classes.title}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                >

                    <CardActionArea style={{
                        padding: '0px 20px'
                    }} >
                        <p> <b>
                            {Question.Question}
                        </b></p>
                        <ul>
                            {
                                // Question.length > 0 ? 
                                Question.Options.map((option) => <li key={option._id}>{option.Option}</li>)
                                // : ''
                            }
                        </ul>
                        <p>Correct Option: <b>{Question.Options[Question.CorrectOption].Option}</b></p>
                        {/* {
                            Question.length > 0 ? (
                                <>
                                   
                                </>
                            ) : ""
                        } */}
                    </CardActionArea>

                </Grid>
            </div>

        </div >
    )
}
