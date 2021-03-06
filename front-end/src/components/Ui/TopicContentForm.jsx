import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Joi from 'joi-browser';
import TopicContext from '../../context/topic/topicContext';
import CustomDialog from '../layouts/LoadingDialog';
import { LoadingSpinner } from '../LoadinSpinner';
import SuccessSpinner from './successSpinner/successSpinner';
import { useEffect } from 'react';
const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '10px',
        minHeight: '70vh'
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
    const { courseId, topicId } = props;
    useEffect(() => {
        if (topicId !== undefined) {
            getTopics({ course_id: courseId }).then((t) => {
                let abc = t.data.filter((topic) => topic._id === topicId);
                const { TopicTitle, TopicDescription } = abc[0];
                let currentTopic = {
                    TopicTitle,
                    TopicDescription
                }

                setTopicContent(currentTopic);

            })

        }
    }, []);



    const topicContext = useContext(TopicContext);
    const { addTopic, topic, getTopics, updateTopic } = topicContext;
    const [openloadingModal, setOpenLoadingModal] = useState(false);
    const [openActionModal, setOpenActionModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const classes = useStyles();
    const [topicContent, setTopicContent] = useState({
        TopicTitle: '',
        TopicDescription: ''
    });
    const [topicContentErrors, setTopicContentErrors] = useState({
        TopicTitle: '',
        TopicDescription: '',
    });

    const handleInputOnChange = e => {
        const { name, value } = e.target;
        setTopicContent({
            ...topicContent,
            [name]: value
        });
    }
    var courseTopicSchema = {
        TopicTitle: Joi.string().required().label('Course Title'),
        TopicDescription: Joi.string().required().label('Topic Discription')
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


        if (topicId === undefined) {
            const eerrors = topicContentValidation();
            if (eerrors) {
                // console.log(eerrors)
                setTopicContentErrors({ ...eerrors });
            }
            else {
                setTopicContentErrors({});
                topicContent.course_id = courseId;

                setTimeout(() => {
                    addTopic(topicContent).then(topic => {
                        setOpenLoadingModal(false);
                        setOpenActionModal(true);
                        setTimeout(() => {
                            setOpenActionModal(false);
                            props.onComplete(topic.data._id);
                        }, 1000)

                    }).catch(err => {
                        console.log(err)
                        alert('error....')
                    });
                }, 2000)
                setOpenLoadingModal(true);
                setTopicContent({
                    id: null,
                    TopicTitle: '',
                    TopicDescription: ''
                })
            }
        }
        else {
            const eerrors = topicContentValidation();
            if (eerrors) {
                // console.log(eerrors)
                setTopicContentErrors({ ...eerrors });
            }
            else {
                // alert('no error, update the ocures')
                var topic = {
                    id: topicId,
                    TopicTitle: topicContent.TopicTitle,
                    TopicDescription: topicContent.TopicDescription
                }
                updateTopic(topic).then((q) => {
                    setOpenLoadingModal(false)
                    setOpenActionModal(true)
                    setTimeout(() => {
                        setOpenActionModal(false);
                        props.onComplete(q.data._id);
                    }, 1000)
                    console.log(q);

                }).catch((e) => {
                    console.log(e)
                })
                setOpenLoadingModal(true)
            }
        }
    }
    return (
        <div className={classes.container}>
            <form action="" onSubmit={handleFormSubmition} >
                <TextField
                    value={topicContent.TopicTitle}
                    autoFocus
                    variant="outlined"
                    margin="dense"
                    name="TopicTitle"
                    id="name"
                    label="Course Title"
                    type="text"
                    onChange={handleInputOnChange}
                    fullWidth
                    {...(topicContentErrors.TopicTitle && { error: true, helperText: topicContentErrors.TopicTitle })}
                />

                <div className={classes.editor}>
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            toolbar: ['heading', '|', 'bold', 'italic', 'link', 'numberedList', 'bulletedList',
                                '|', 'undo', 'redo']
                        }}
                        data={topicContent.TopicDescription}

                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setTopicContent({
                                ...topicContent,
                                TopicDescription: data
                            });
                        }}
                        onBlur={(event, editor) => {
                        }}
                        onFocus={(event, editor) => {
                        }}
                    />
                    <p className={classes.customErrorMessage}>{topicContentErrors.TopicDescription ? topicContentErrors.TopicDescription : ''}</p>
                </div>
                <div className={classes.formCta}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        {topicId === undefined ? "Create Topic" : "Edit Topic"}
                    </Button>
                </div>

            </form>
            <CustomDialog open={openloadingModal}
                aria-labelledby={isEdit ? 'Editing Topic Please Wait' : "Publishing Topic Please Wait"}
                disableBackdropClick={true} >
                <LoadingSpinner style={{ width: '40px', marginRight: '20px' }} />
                {''} {isEdit ? 'Updating Topic...' : 'Publishing Topic...'}
            </CustomDialog>
            <CustomDialog open={openActionModal}
                aria-labelledby="Topic Created Successfully"
                disableBackdropClick={true} >
                <SuccessSpinner style={{
                    paddingRight: '20px'
                }} />{' '} {'Topic Created Successfully'}
            </CustomDialog>
        </div>
    )
}
