/**
 * Created by nalantianyi on 2017/2/15.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {Main, Home, NotFound} from './containers';

const preload = promise => (nextState, replace, cb) => {
    if (__SERVER__ || nextState.location.action === 'PUSH') {
        promise().then(() => cb());
    }
    else {
        cb();
    }
}

export default store => {
    return (
        <Route path="/" component={Main}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="*" component={NotFound} status={404}></Route>
        </Route>
    );
}