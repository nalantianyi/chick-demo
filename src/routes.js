/**
 * Created by nalantianyi on 2017/2/15.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {Main, Home, Counter, NotFound, Forms, Statistic, Login} from './containers';
import {loadCounter} from './actions/counter';
import {loadStatistic} from './actions/statistic';
import {loadAuthIfNeeded} from './actions/auth';

const preload = promise => (nextState, replace, cb) => {
    if (__SERVER__ || nextState.location.action === 'PUSH') {
        promise().then(() => cb());
    }
    else {
        cb();
    }
}

export default store => {
    const counterPromise = () => store.dispatch(loadCounter);
    return (
        <Route path="/" component={Main}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="counter" component={Counter} onEnter={preload(counterPromise)}></Route>
            <Route path="*" component={NotFound} status={404}></Route>
        </Route>
    );
}