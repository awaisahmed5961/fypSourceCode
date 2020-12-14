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



    return (
        <ExerciseContext.Provider
            value={{
                exercise: state.exercise,
                addexercise,

            }}
        >
            {props.children}
        </ExerciseContext.Provider>
    )

}
export default ExerciseState;