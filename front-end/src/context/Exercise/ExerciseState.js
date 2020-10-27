import React, { useReducer } from 'react';
import ExerciseContext from './exerciseContext';
import exerciseReducer from './exerciseReducer';
import axios from 'axios';
import {
    GET_EXERCISES,
    ADD_EXERCISE
} from '../types';

const ExerciseState = props => {
    const initialState = {
        exercise: [],
        loading: true
        , current: null,
        error: null,
    };

    const [state, dispatch] = useReducer(exerciseReducer, initialState);
    // Add Course
    const addexercise = async (exercise) => {
        console.log(exercise)
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
            const res = await axios.post('/api/exercisequestions', exercise, config);
            dispatch({ type: ADD_EXERCISE, payload: res.data });
            return res;
        }
        catch (err) {
            console.log(err);
            // dispatch({
            //     type: COURSE_ERROR
            // });
            return err;
        }

    }

    // getCourses
    // const getCourses = async () => {

    //     try {
    //         const res = await axios.get('/api/courses');
    //         dispatch({ type: GET_COURSES, payload: res.data })
    //         return res;
    //     }
    //     catch (err) {
    //         console.log('errro in couse add course state js');
    //         return err;
    //     }

    // }
    // // clearContacts
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
        <ExerciseContext.Provider
            value={{
                exercise: state.exercise,
                addexercise,
                // current: state.current,
                // loading: state.loading,
                // error: state.error,
                // courseadded: state.courseadded,
                // serverResponseWating: state.serverResponseWating,
                // getCourses,
                // updateCourse,
                // deleteCourse,
                // setCurrent,
                // clearCurrent,
                // clearCourses,
                // clearCourseError
            }}
        >
            {props.children}
        </ExerciseContext.Provider>
    )

}
export default ExerciseState;