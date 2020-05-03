// 请勿更改 import 顺序
import cssVars from 'css-vars-ponyfill';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './assets/style/normalize.css';
import '../node_modules/swiper/css/swiper.min.css';
import './assets/style/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Config from './config';
import * as serviceWorker from './serviceWorker';
import NetApi from './tool/NetApi';

cssVars()

document.title = Config.APP_NAME

NetApi.create({
    onhttppre: (carr) => {
        console.error('onhttppre', carr)
        return null
    },
    onhttpresult: (carr, data) => {
        console.error('onhttpresult carr', carr, ' data', data)
        return null
    },
    onwsspre: (carr) => {
        console.error('onwsspre', carr)
        return null
    },
    onwssresult: (data) => {
        console.error('onwssresult', data)
        return null
    }
}).httpmode()

NetApi.sub('i18n/getMapKeyLangs', {}, (data) => {
    if (data.code === 0) {
        Config.setApiTips(data.result)
    }

    console.error('getMapKeyLangs succ', data)
}, (err) => {
    console.error('getMapKeyLangs err', err)
}, (size) => {
    if (size === 5) {
        return false
    }

    console.error(`getMapKeyLangs poll handle size: ${size}`)

    return true
}, 3000)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
