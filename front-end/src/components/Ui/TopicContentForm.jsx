import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Joi from 'joi-browser'


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '10px',
        height: '50vh'
    },
    editor: {
        margin: '30px 0px'
    },
    formCta: {
        marginBottom: '50px',
        textAlign: 'right'
    },
    customErrorMessage: {
        color: 'red',
        fontSize: '12px'
    }
}));



export default function TopicContentForm(props) {

    const classes = useStyles();
    const [topicContent, setTopicContent] = useState({
        topicTitle: '',
        topicDiscription: ''
    });
    const [topicContentErrors, setTopicContentErrors] = useState({
        topicTitle: '',
        topicDiscription: '',
    });
    const handleInputOnChange = e => {
        const { name, value } = e.target;
        setTopicContent({
            ...topicContent,
            [name]: value
        });
    }
    var courseTopicSchema = {
        topicTitle: Joi.string().required().label('Course Title'),
        topicDiscription: Joi.string().required().label('Topic Discription')
    }
    const topicContentValidation = () => {

        const result = Joi.validate(topicContent, courseTopicSchema, { abortEarly: false });
        if (!result.error) return null;

        let errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }
    const handleFormSubmition = (e) => {
        e.preventDefault();
        // let { email, password } =;

        const eerrors = topicContentValidation();

        if (eerrors) {
            alert('errors');
            // console.log(eerrors)
            setTopicContentErrors({ ...eerrors });
        }
        else {
            setTopicContentErrors({});

            // here upload content
            props.onComplete();
        }
    }
    return (
        <div className={classes.container}>
            <form action="" onSubmit={handleFormSubmition} >
                <TextField
                    value={topicContent.topicTitle}
                    autoFocus
                    variant="outlined"
                    margin="dense"
                    name="topicTitle"
                    id="name"
                    label="Course Title"
                    type="text"
                    onChange={handleInputOnChange}
                    fullWidth
                    {...(topicContentErrors.topicTitle && { error: true, helperText: topicContentErrors.topicTitle })}
                />

                <div className={classes.editor}>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            toolbar: ['heading', '|', 'bold', 'italic', 'link', 'numberedList', 'bulletedList',
                                '|', 'undo', 'redo']
                        }}
                        data={topicContent.topicDiscription}
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                            setTopicContent({
                                ...topicContent,
                                topicDiscription: data
                            });
                            console.log(topicContent)
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                    <p className={classes.customErrorMessage}>{topicContentErrors.topicDiscription ? topicContentErrors.topicDiscription : ''}</p>
                </div>
                <div className={classes.formCta}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Create Topic
                </Button>
                </div>

            </form>
        </div>
    )
}
