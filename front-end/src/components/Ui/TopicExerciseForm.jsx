import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import Joi from 'joi-browser';
import CustomDialog from '../layouts/LoadingDialog';
import { LoadingSpinner } from '../LoadinSpinner';
import exerciseContext from '../../context/Exercise/exerciseContext';
const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '10px',
        minHeight: '70vh'
    },
    formCta: {
        marginBottom: '50px',
        textAlign: 'right'
    },
    form: {
        display: 'block',
        width: '80%',
        margin: '0 auto'
    },
    options: {
        marginTop: '30px',
        color: 'yellow'
    },
    option: {
        display: 'flex',
        alignItems: 'center'
    },
    question: {
        backgroundColor: '#f4f6f6',
        paddingLeft: '15px',
        paddingTop: '15px',
        marginBottom: '15px',
        minHeight: '100px',
        borderRadius: '4px',
        display: 'block',
        width: '80%',
        margin: '0 auto',
    },
    Questionoption: {
        paddingLeft: "30px"
    }
}));

export default function TopicExerciseForm(props) {
    const { topicId } = props;
    const classes = useStyles();
    const ExerciseContext = useContext(exerciseContext);
    const { addexercise } = ExerciseContext;
    const [enableForm, setEnableForm] = useState(false);
    const [options, setOptions] = useState(['', '']);
    const [Question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(0);
    const [questionErrors, setQuestionErrors] = useState({
        Question: '',
        options: []
    });
    const [optionsError, setOptionsErrors] = useState(['', '']);

    const [openloadingModal, setOpenLoadingModal] = useState(false);
    const handleCorrectOption = (i) => {
        setSelectedValue(i);
    };
    const publishExercise = () => {
        if (enableForm) {
            if (questions.length !== 0) {
                // submit execise here
                addexercise({ topicId, questions }).then(() => {
                    setTimeout(() => {
                        setOpenLoadingModal(false);
                        props.onComplete(topicId);
                    }, 1000)
                }).catch((err) => {
                    alert('failed to create exercise')
                });
                setOpenLoadingModal(true);
            }
            else {
                alert("Please create excercise before submiting")
            }
        }
        else {
            setEnableForm(true)
        }
    }
    const handleChange = (event, i) => {

        let option = [...options];
        option[i] = event.target.value;
        setOptions(option)
    }
    const addClick = () => {
        setOptions([...options, ''])
    }

    const removeClick = (i) => {
        let option = [...options];
        option.splice(i, 1);
        setOptions(option);
        setSelectedValue(0);
    }
    const createQuestion = () => {

        const error = formValidation();
        if (error) {
            setQuestionErrors({ Question: error });
            return;
        }
        const errorsss = options.map((option) => option === "");

        const optionError = optionsValidation();
        console.log(optionError)
        let newQuestion = {
            question: Question,
            options: options,
            correctOption: selectedValue
        }
        console.log(questionErrors)
        setQuestions([...questions, newQuestion]);
        setQuestion("");
        setOptions(["", ""])
        setSelectedValue(0)
    }
    var ExerciseSchema = {
        Question: Joi.string().required().label('Question'),
    }
    var OptionsSchema = {
        options: Joi.array().items(Joi.string().required()),
    }
    const formValidation = () => {
        const result = Joi.validate({ Question }, ExerciseSchema, { abortEarly: false });
        if (!result.error) return null;

        return result.error.details[0].message;

    }
    const optionsValidation = () => {
        const result = Joi.validate({ options }, OptionsSchema, { abortEarly: false });
        if (!result.error) return null;
        return result.error.details[0].message;
    }



    const createUI = () => {

        return options.map((el, i) =>
            <div className={classes.option} key={i}>
                <Radio
                    checked={selectedValue === i}
                    onChange={() => handleCorrectOption(i)}
                    value={i}
                    name="Choose Correct Option"
                // inputProps={{ 'aria-label': 'A' }}
                />
                <TextField
                    id="standard-basic"
                    label={`Option ${i + 1}`}
                    value={el || ''}
                    onChange={(e) => handleChange(e, i)}

                />
                <div>
                    <IconButton aria-label="Drop Option"
                        onClick={() => removeClick(i)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
                {/* <input type="text" value={el || ''} /> */}
                {/* <input type='button' value='remove' /> */}
            </div>
        )
    }
    return (
        <div className={classes.container}>
            <div className={classes.formCta}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => publishExercise()}
                    {...(topicId === undefined && { disabled: true })}
                >
                    {enableForm ? 'Publish Exercise' : 'Create Exercise'}
                </Button>
            </div>
            <div>
                {
                    enableForm && (<form className={classes.form}>

                        <TextField
                            id="standard-basic"
                            label="Question"
                            // name={Question}
                            fullWidth
                            value={Question}
                            onChange={(e) => setQuestion(e.target.value)}
                            {...(questionErrors.Question && { error: true, helperText: questionErrors.Question })}
                        />
                        <div className={classes.options}>
                            {
                                createUI()
                            }
                        </div>
                        <div className={classes.formCta}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addClick();
                                }
                                }
                                style={{
                                    marginRight: '20px'
                                }}
                            >
                                Add Option
                    </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    createQuestion();
                                }
                                }
                            >
                                Add Question
                    </Button>
                        </div>
                    </form>)
                }
            </div>
            <div >
                {
                    questions.length !== 0 ? (
                        <>
                            {
                                questions.map((q, i) => (
                                    <div className={classes.question} key={i}>
                                        Q no: {i + 1}
                                        {' '}
                                        {q.question}

                                        {q.options.map((option, l) => (
                                            <p className={classes.Questionoption} key={l}>{option}</p>
                                        ))}
                                    </div>
                                ))
                            }
                        </>
                    ) : ''
                }
            </div>
            <CustomDialog open={openloadingModal}
                aria-labelledby={'Creating Exercise please wait...'}
                disableBackdropClick={true} >
                <LoadingSpinner style={{ width: '40px', marginRight: '20px' }} />
                {''} {'Creating Exercise please wait...'}
            </CustomDialog>
        </div>
    )
}
