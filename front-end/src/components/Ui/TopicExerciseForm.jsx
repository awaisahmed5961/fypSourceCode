import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import Joi from 'joi-browser'
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

export default function TopicExerciseForm() {
    const classes = useStyles();
    const [enableForm, setEnableForm] = useState(false);
    const [options, setOptions] = useState(['', '']);
    const [Question, setQuestion] = useState({
        Question: '',
    });
    const [questions, setQuestions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(0);
    const handleCorrectOption = (i) => {
        setSelectedValue(i);
    };

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

        // validate here

        let newQuestion = {
            question: Question,
            options: options,
            correctOption: selectedValue
        }
        setQuestions([...questions, newQuestion]);
        setQuestion({ Question: '' });
        setOptions(["", ""])
        setSelectedValue(0)
    }
    var ExerciseSchema = {
        Question: Joi.string().required().label('Question'),
        // password: Joi.string().required().label('Password')
    }
    const formValidation = () => {

        const result = Joi.validate(Question, ExerciseSchema, { abortEarly: false });
        if (!result.error) return null;

        let errors = {};
        //     for (let item of result.error.details) {
        //         errors[item.path[0]] = item.message;
        //     }
        //     return errors;
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
                    error
                    helperText="Incorrect entry."
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
                    onClick={() => setEnableForm(true)}
                    {...(enableForm && { disabled: true })}
                >
                    Create Exercise
                </Button>
            </div>
            <div>
                {
                    enableForm && (<form className={classes.form}>

                        <TextField
                            error
                            id="standard-basic"
                            label="Question"
                            name={Question}
                            fullWidth
                            value={Question.Question}
                            onChange={(e) => setQuestion(e.target.value)}
                            helperText="Incorrect entry."
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
        </div>
    )
}
