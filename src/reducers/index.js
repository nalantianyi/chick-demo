/**
 * Created by nalantianyi on 2017/2/16.
 */
import {combineReducers}from 'redux';
import {reducerCreator}from 'redux-amrc';
import {reducer as formReducer} from 'redux-form';
import counter from './counter';

const rootReducer = combineReducers({
    async: reducerCreator({counter}),
    form: formReducer
});
export default rootReducer;