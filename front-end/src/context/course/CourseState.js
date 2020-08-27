import React, { useReducer } from 'react';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import axios from 'axios';
import {
    GET_COURSES,
    ADD_COURSE,
    UPDATE_COURSE,
    DELETE_COURSE,
    FILTER_COURSE,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_COURSES
} from '../types';
import { NavItem } from 'react-bootstrap';

const CourseState = props => {
    const initialState = {
        courses: [], loading: true
        // {
        //     id: 0,
        //     title: 'Dynamic physics',
        //     subTitle: 'Compulasary part II',
        //     description: 'djfhdjhfkjdshf',
        //     publicationStatus: 'published'
        // },
        // {
        //     id: 1,
        //     title: 'Chemistary',
        //     subTitle: 'part I',
        //     description: 'djfhdjhfkjdshf',
        //     publicationStatus: 'draft'
        // },
        // {
        //     id: 2,
        //     title: 'Dynamic physics',
        //     subTitle: 'Compulasary part II',
        //     description: 'djfhdjhfkjdshf',
        //     publicationStatus: 'draft'
        // },
        // {
        //     id: 3,
        //     title: 'Dynamic physics',
        //     subTitle: 'Compulasary part II',
        //     description: 'djfhdjhfkjdshf',
        //     publicationStatus: 'published'
        // },
        // {
        //     id: 4,
        //     title: 'Dynamic physics',
        //     subTitle: 'Compulasary part II',
        //     description: 'djfhdjhfkjdshf',
        //     publicationStatus: 'archived'
        // },
        // {
        //     id: 5,
        //     title: 'Dynamic physics',
        //     subTitle: 'Compulasary part II',
        //     description: 'djfhdjhfkjdshf',
        //     publicationStatus: 'archived'
        // },
        // ],
        , current: null
    };

    const [state, dispatch] = useReducer(courseReducer, initialState);

    // getCourses
    const getCourses = async () => {

        try {
            const res = await axios.get('/api/courses');
            dispatch({ type: GET_COURSES, payload: res.data })
        }
        catch (err) {
            console.log('errro in couse add course state js')
        }

    }
    // clearContacts
    const clearCourses = () => {
        dispatch({ type: CLEAR_COURSES })
    }
    // Add Course
    const addCourse = async (course) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/courses', course, config);
            dispatch({ type: ADD_COURSE, payload: res.data })
        }
        catch (err) {
            console.log('errro in couse add course state js')
        }

    }
    // delete Course
    const deleteCourse = (id) => {
        dispatch({ type: DELETE_COURSE, payload: id })
    }
    // update Course
    const updateCourse = (contact) => {
        dispatch({ type: UPDATE_COURSE, payload: contact })
    }
    // Filter Course
    // setCurrentMethod
    const setCurrent = (course) => {
        dispatch({ type: SET_CURRENT, payload: course })
    }
    // CLEARCurrentMethod
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    return (
        <CourseContext.Provider
            value={{
                courses: state.courses,
                current: state.current,
                loading: state.loading,
                getCourses,
                addCourse,
                deleteCourse,
                setCurrent,
                clearCurrent,
                clearCourses
            }}
        >
            {props.children}
        </CourseContext.Provider>
    )

}
export default CourseState;