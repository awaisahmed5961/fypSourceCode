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

export default (state, action) => {
    switch (action.type) {
        case GET_TOPICS:
            return {
                ...state,
                topic: action.payload,
                loading: false
            };
        case ADD_TOPIC:
            return {
                ...state,
                topic: [...state.topic, action.payload],
                loading: false
            };
        case TOPIC_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_TOPIC:
            return {
                ...state,
                topic: state.topic.filter(t => t._id !== action.payload),
                loading: false
            };
        // case CLEAR_COURSE_ERRORS:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: null
        //     }


        case UPDATE_TOPIC:
            return {
                ...state,
                topic: state.topic.map(topic => topic._id === action.payload.id ? action.payload : topic),
                loading: false
            };
        // case CLEAR_COURSES:
        //     return {
        //         ...state,
        //         courses: [],
        //         current: null
        //     };
        // case SET_CURRENT:
        //     return {
        //         ...state,
        //         current: action.payload
        //     };
        // case CLEAR_CURRENT:
        //     return {
        //         ...state,
        //         current: null
        //     };
        default:
            return state;
    }
}