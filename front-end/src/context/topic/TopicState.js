import React, { useReducer } from 'react';
import TopicContext from './topicContext';
import topicReducer from './topicReducer';
// import CourseContext from './courseContext';
// import courseReducer from './courseReducer';
import axios from 'axios';
import {
    GET_TOPICS,
    ADD_TOPIC,
    TOPIC_ERROR,
    DELETE_TOPIC,
    UPDATE_TOPIC
    // UPDATE_COURSE,
    // DELETE_COURSE,
    // FILTER_COURSE,
    // SET_CURRENT,
    // CLEAR_CURRENT,
    // CLEAR_COURSES,
    // CLEAR_COURSE_ERRORS
} from '../types';

const TopicState = props => {
    const initialState = {
        topic: [],
        loading: true
        , current: null,
        error: null,
    };

    const [state, dispatch] = useReducer(topicReducer, initialState);

    // getTopics
    const getTopics = async (courseId) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                course_id: courseId.course_id,
            }
        }

        try {
            const res = await axios.get('/api/coursetopics', config);
            dispatch({ type: GET_TOPICS, payload: res.data })
            return res;
        }
        catch (err) {

            return err;
        }

    }

    // Add Topic
    const addTopic = async (topic) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/coursetopics', topic, config);
            dispatch({ type: ADD_TOPIC, payload: res.data });
            return res;

        }
        catch (err) {

            dispatch({
                type: TOPIC_ERROR
            });
            return err;
        }

    }

    // delete Topic
    const deleteTopic = async (id) => {
        try {
            const res = await axios.delete(`/api/coursetopics/${id}`);
            dispatch({ type: DELETE_TOPIC, payload: id })
            return res;

        } catch (err) {
            dispatch({
                type: TOPIC_ERROR,
                payload: err.response.msg
            });
            return err;
        }
    }

    // clearContacts
    // const clearCourses = () => {
    //     dispatch({ type: CLEAR_COURSES })
    // }



    // update Course
    const updateTopic = async (topic) => {
        console.log(topic)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.put(
                `/api/coursetopics/${topic.id}`,
                topic,
                config
            );

            dispatch({
                type: UPDATE_TOPIC,
                payload: res.data
            });
            return res;
        } catch (err) {
            dispatch({
                // payload: err.response.msg
            });
            return err;
        }
    }
    // // Filter Course
    // // setCurrentMethod
    // const setCurrent = (course) => {
    //     dispatch({ type: SET_CURRENT, payload: course })
    // }
    // // CLEARCurrentMethod
    // const clearCurrent = () => {
    //     dispatch({ type: CLEAR_CURRENT })
    // }
    // const clearCourseError = () => {
    //     dispatch({ type: CLEAR_COURSE_ERRORS })
    // }

    return (
        <TopicContext.Provider value={{
            topic: state.topic,
            current: state.current,
            loading: state.loading,
            error: state.error,
            getTopics,
            addTopic,
            deleteTopic, updateTopic
        }}>
            {props.children}
        </TopicContext.Provider>
        // <TopicContext.Provider
        //     value={{
        //         topic: state.topic,
        //         current: state.current,
        //         loading: state.loading,
        //         error: state.error,
        //         // courseadded: state.courseadded,
        //         // serverResponseWating: state.serverResponseWating,
        //         getTopics,
        //         // addCourse,
        //         // updateCourse,
        //         // deleteCourse,
        //         // setCurrent,
        //         // clearCurrent,
        //         // clearCourses,
        //         // clearCourseError
        //     }}
        // >
        //     {props.children}
        // </TopicContext.Provider>
    )

}
export default TopicState;