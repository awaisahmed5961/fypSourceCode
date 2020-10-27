import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/auth/authcontext'
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../components/NavBar'
import BreadCrumbs from '../components/BreadCrumbs';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TopicContentForm from '../components/Ui/TopicContentForm';
import TopicExerciseForm from '../components/Ui/TopicExerciseForm';
import AgumentedContentForm from '../components/Ui/AgumentedContentForm';


import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: '90%',
        margin: '0 auto',
        height: "100%",
        [theme.breakpoints.down('sm')]: {
            width: '100%',

        }
    },
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    step: {
        display: 'block',
        width: '80%',
        margin: '0 auto'
    },
    bottomButtons: {
        marginBottom: '20px'
    }
}));



export default function Topic(props) {
    const queryStringParameters = queryString.parse(props.location.search);
    const { course_id, topic_id } = queryStringParameters;

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set());
    const [topicId, setTopicID] = React.useState(topic_id ? topic_id : undefined)
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();





    const currentTab = (newValue) => {
        setActiveStep(newValue);
    };

    const totalSteps = () => {
        return getSteps().length;
    };

    const isStepOptional = (step) => {
        return step === 1;
    };
    function getSteps() {
        return ['Create Topic ', 'Create Assesment Exercise', 'Create Agumented Content'];
    }



    function getStepContent(step) {
        switch (step) {
            case 0:
                return (<TopicContentForm onComplete={handleComplete} courseId={course_id} topicId={topic_id} />);
            case 1:
                return (<TopicExerciseForm topicId={topicId} onComplete={handleComplete} />);
            case 2:
                return (<AgumentedContentForm />);
            default:
                return 'Unknown step';
        }
    }

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const skippedSteps = () => {
        return skipped.size;
    };

    const completedSteps = () => {
        return completed.size;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps() - skippedSteps();
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed
                // find the first step that has been completed
                steps.findIndex((step, i) => !completed.has(i))
                : activeStep + 1;

        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = (topic_id) => {
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);
        setTopicID(topic_id);

        /**
         * Sigh... it would be much nicer to replace the following if conditional with
         * `if (!this.allStepsComplete())` however state is not set when we do this,
         * thus we have to resort to not being very DRY.
         */
        if (completed.size !== totalSteps() - skippedSteps()) {
            handleNext();
        }
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted(new Set());
        setSkipped(new Set());
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    function isStepComplete(step) {
        return completed.has(step);
    }

    return (
        <div>
            <NavBar haveButton={false}
            />
            <Grid container >
                <Box
                    component={Grid}
                    item
                    xl={12}
                    display={{ xs: "none", sm: "block" }}
                >
                    <BreadCrumbs />
                </Box>
                <Grid container
                    direction="row"
                    className={classes.mainContainer}
                    component={Paper} elevation={6}
                >

                    <div className={classes.mainContainer}>
                        <div className={classes.root}>
                            <Stepper alternativeLabel nonLinear activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    const stepProps = {};
                                    const buttonProps = {};
                                    if (isStepOptional(index)) {
                                        buttonProps.optional = <Typography variant="caption">Optional</Typography>;
                                    }
                                    if (isStepSkipped(index)) {
                                        stepProps.completed = false;
                                    }
                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepButton
                                                onClick={handleStep(index)}
                                                completed={isStepComplete(index)}

                                                {...buttonProps}
                                            >
                                                {label}
                                            </StepButton>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            <div>
                                {allStepsCompleted() ? (
                                    <div>
                                        <Typography className={classes.instructions}>
                                            All steps completed - you&apos;re finished
            </Typography>
                                        <Button onClick={handleReset}>Reset</Button>
                                    </div>
                                ) : (
                                        <div>
                                            <Typography component={'span'} variant={'body2'} className={classes.instructions}>
                                                {getStepContent(activeStep)}
                                            </Typography>

                                            {/* <div className={classes.bottomButtons}>
                                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                                    Back
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleNext}
                                                    className={classes.button}
                                                >
                                                    Next
                                                 </Button>
                                                {isStepOptional(activeStep) && !completed.has(activeStep) && (
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleSkip}
                                                        className={classes.button}
                                                    >
                                                        Skip
                                                    </Button>
                                                )}

                                                {activeStep !== steps.length &&
                                                    (completed.has(activeStep) ? (
                                                        <Typography variant="caption" className={classes.completed}>
                                                            Step {activeStep + 1} already completed
                                                        </Typography>
                                                    ) : (
                                                            <Button variant="contained" color="primary" onClick={handleComplete}>
                                                                {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                                                            </Button>
                                                        ))}
                                            </div> */}
                                        </div>
                                    )}
                            </div>

                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
