/**
 * Created by nalantianyi on 2017/2/16.
 */
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {match, Router, broswerHistory} from 'react-router';
import {configureStore} from './utils/configureStore';
import getRoutes from './routes';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('app');
const history = broswerHistory;
const routes = getRoutes(store);


match({history, routes}, (err, redirect, renderProps) => {
    if (redirect) {
        history.replace(redirect);
    }
    else if (err) {
        history.goBack();
        console.error(err.stack);
    }
    else {
        render(
            <Provider store={store}>
                <Router {...renderProps}></Router>
            </Provider>
            , rootElement);
    }
});