import {
    GET_EXERCISES,
    ADD_EXERCISE
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_EXERCISES:
            return {
                ...state,
                exercise: action.payload,
                loading: false
            };
        case ADD_EXERCISE:
            return {
                ...state,
                exercise: [...state.exercise, action.payload],
                serverResponseWating: action.payload,
                loading: false
            };
        //     case COURSE_ERROR:
        //         return {
        //             ...state,
        //             loading: false,
        //             error: action.payload
        //         }
        //     case CLEAR_COURSE_ERRORS:
        //         return {
        //             ...state,
        //             loading: false,
        //             error: null
        //         }

        //     case DELETE_COURSE:
        //         return {
        //             ...state,
        //             courses: state.courses.filter(course => course._id !== action.payload),
        //             loading: false
        //         };
        //     case UPDATE_COURSE:
        //         return {
        //             ...state,
        //             courses: state.courses.map(course => course._id === action.payload.id ? action.payload : course),
        //             loading: false
        //         };
        //     case CLEAR_COURSES:
        //         return {
        //             ...state,
        //             courses: [],
        //             current: null
        //         };
        //     case SET_CURRENT:
        //         return {
        //             ...state,
        //             current: action.payload
        //         };
        //     case CLEAR_CURRENT:
        //         return {
        //             ...state,
        //             current: null
        //         };
        default:
            return state;
    }
}