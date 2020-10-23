import React, { useReducer } from 'react';
import TopicContext from './topicContext';
import topicReducer from './topicReducer';
// import CourseContext from './courseContext';
// import courseReducer from './courseReducer';
import axios from 'axios';
import {
    GET_TOPICS,
    ADD_TOPIC,
    TOPIC_ERROR
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
    const getTopics = async () => {

        try {
            const res = await axios.get('/api/coursetopics');
            dispatch({ type: GET_TOPICS, payload: res.data })
            return res;
        }
        catch (err) {
            console.log('errro in get topics');
            console.log(err)
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
    // clearContacts
    // const clearCourses = () => {
    //     dispatch({ type: CLEAR_COURSES })
    // }

    // // delete Course
    // const deleteCourse = async (id) => {
    //     try {
    //         const res = await axios.delete(`/api/courses/${id}`);

    //         dispatch({ type: DELETE_COURSE, payload: id })
    //         return res;

    //     } catch (err) {
    //         dispatch({
    //             type: COURSE_ERROR,
    //             payload: err.response.msg
    //         });
    //         return err;
    //     }
    // }

    // // update Course
    // const updateCourse = async (course) => {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };

    //     try {
    //         const res = await axios.put(
    //             `/api/courses/${course.id}`,
    //             course,
    //             config
    //         );

    //         dispatch({
    //             type: UPDATE_COURSE,
    //             payload: res.data
    //         });
    //         return res;
    //     } catch (err) {
    //         dispatch({
    //             type: COURSE_ERROR,
    //             payload: err.response.msg
    //         });
    //         return err;
    //     }
    // }
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