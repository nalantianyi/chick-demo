/**
 * Created by nalantianyi on 2017/2/15.
 * 前端服务器
 */
import path from 'path';
import Express from 'express';
import favicon from 'serve-favicon';
import httpProxy from 'http-proxy';
import compresssion from 'compression';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';
import configureStore from './utils/configureStore';
import getRouters from './routes';
import Html from './utils/Html';
import config from './config';

const app = new Express();
const port = config.port;
const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const proxy = httpProxy.createProxyServer({
    target: targetUrl
});

app.use(compresssion());
app.use(Express.static(path.join(__dirname, '..', 'static')));
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use('/api', (req, res) => {
    proxy.web(req, res, {target: targetUrl});
});

app.use((req, res) => {
    global.__COOKIE__=req.get('cookie');
    if (process.env.NODE_ENV !== 'production') {
        webpackIsomorphicTools.refresh();
    }
    const store = configureStore();
    const routes = getRouters(store);

    function hydrateOnClient() {
        res.send('<!doctype html>\n' +
            renderToString(<html assets={webpackIsophicTools.assets()} store={store}></html>));
    };
    if (__DISABLE_SSR__) {
        hydrateOnClient();
        return;
    }
    match({routes, location: req.url}, (err, redirect, renderProps) => {
        if (redirect) {
            res.redirect(redirect.pathname + redirect.search);
        }
        else if (err) {
            res.status(500);
            hydrateOnClient();
            console.error('ROUTER ERROR:', err.stack);
        }
        else if (renderProps) {
            res.status(200);
            const component = (<Provider store={store}>
                <RouterContext {...renderProps}></RouterContext>
            </Provider>);
            res.send('<!doctype html>\n' +
                renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}></Html>));
        }
        else {
            res.status(404).send('Not found');
        }
    });
});


app.listen(port, (error) => {
    if (error) {
        console.error(error);
    }
    else {
        console.info('==> Open http://%s:%s in browser to view the app.', config.host, port);
    }
});

