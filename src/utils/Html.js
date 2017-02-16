/**
 * Created by nalantianyi on 2017/2/15.
 * Html组件 用于渲染html页面
 */
import React, {PropTypes} from 'react';
import ReactDom from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

function Html(props) {
    const {assets, component, store}=props;
    const content = component ? ReactDom.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
        <html lang="zh-CN">
        <head>
            {head.base.toComponent()}
            {head.title.toComponent()}
            {head.meta.toComponent()}
            {head.link.toComponent()}
            {head.script.toComponent()}
            <link rel="shortcut icon" href="/favicon.ico"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            {
                Object.keys(assets.styles).map((style, key) =>
                    <link href={assets.styles[style]} key={key} media="screen,projection" rel="stylesheet"
                          type="text/css"
                          charSet="UTF-8"/>)
            }
        </head>
        <body>
        <div id="app" dangerouslySetInnerHTML={{__html: content}}></div>
        <script dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__=${serialize(store.getState())};`
        }} charSet="UTF-8"></script>
        <script src={assets.javascript.main} charSet="UTF-8"></script>
        </body>
        </html>
    );
}
Html.propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
};
export default Html;
