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

export default (state, action) => {
    switch (action.type) {
        case GET_COURSES:
            return {
                ...state,
                courses: action.payload,
                loading: false
            };
        case ADD_COURSE:
            return {
                ...state,
                courses: [...state.courses, action.payload],
                loading: false
            };
        case DELETE_COURSE:
            return {
                ...state,
                courses: state.courses.filter(course => course.id !== action.payload),
                loading: false
            };
        case UPDATE_COURSE:
            return {
                ...state,
                // courses: state.courses.filter(course => course.id !== action.payload),
                loading: false
            };
        case CLEAR_COURSES:
            return {
                ...state,
                courses: [],
                current: null
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        default:
            return state;
    }
}