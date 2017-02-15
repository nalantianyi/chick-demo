/**
 * Created by nalantianyi on 2017/2/15.
 */
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {asyncMiddleware} from 'redux-amrc';

let createStoreWithMiddleware;
if (process.env.NODE_ENV === 'production') {
    createStoreWithMiddleware = compose(applyMiddleware(thunk, asyncMiddleware))(createStore);
} else {
    createStoreWithMiddleware = compose(applyMiddleware(thunk, asyncMiddleware), typeof window === 'object'
    && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtensions() : f => f)(createStore);
}
export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index').default;
            store.replaceReducer(nextRootReducer);
        })
    }
    return store;
}