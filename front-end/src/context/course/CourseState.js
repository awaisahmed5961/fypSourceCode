import React, { useReducer } from 'react';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';

import {
    ADD_COURSE,
    UPDATE_COURSE,
    DELETE_COURSE,
    FILTER_COURSE
} from '../types';

const CourseState = props => {
    const initialState = {
        courses: [
            {
                id: 0,
                title: 'Dynamic physics',
                subTitle: 'Compulasary part II',
                publicationStatus: 'published'
            },
            {
                id: 1,
                title: 'Chemistary',
                subTitle: 'part I',
                publicationStatus: 'draft'
            },
            {
                id: 2,
                title: 'Dynamic physics',
                subTitle: 'Compulasary part II',
                publicationStatus: 'draft'
            },
            {
                id: 3,
                title: 'Dynamic physics',
                subTitle: 'Compulasary part II',
                publicationStatus: 'published'
            },
            {
                id: 4,
                title: 'Dynamic physics',
                subTitle: 'Compulasary part II',
                publicationStatus: 'archived'
            },
            {
                id: 5,
                title: 'Dynamic physics',
                subTitle: 'Compulasary part II',
                publicationStatus: 'archived'
            },
        ]
    };

    const [state, dispatch] = useReducer(courseReducer, initialState);

    // Add Course
    const addCourse = (course) => {
        dispatch({ type: ADD_COURSE, payload: course })
    }
    // delete Course
    const deleteCourse = (id) => {
        dispatch({ type: DELETE_COURSE, payload: id })
    }
    // update Course
    // Filter Course

    return (
        <CourseContext.Provider
            value={{
                courses: state.courses,
                deleteCourse,
                addCourse
            }}
        >
            {props.children}
        </CourseContext.Provider>
    )

}
export default CourseState;