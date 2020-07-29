// 请勿更改 import 顺序
import cssVars from 'css-vars-ponyfill';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import './assets/style/app.normalize.scss';
import './assets/style/app.index.scss';
import './assets/style/app.common.scss';
import '../node_modules/swiper/css/swiper.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Application from './App';
import Config from './Config';
import NetApi from './utils/NetApi';
import Tool from './utils/Tool';
import * as serviceWorker from './serviceWorker';

cssVars()

function bindPrototype() {
    // eslint-disable-next-line no-extend-native
    Date.prototype.format = function (fmt) {
        let o = {
            'M+': this.getMonth() + 1, //月份
            'd+': this.getDate(), //日
            'h+': this.getHours(), //小时
            'm+': this.getMinutes(), //分
            's+': this.getSeconds(), //秒
            'q+': Math.floor((this.getMonth() + 3) / 3), //季度
            'S': this.getMilliseconds() //毫秒
        }

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        }

        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
        }

        return fmt
    }
}

bindPrototype()

Config.setAppConfig()

document.title = Config.APPCONFIG.APP_NAME

// 绑定属性到 window 对象
Config.bindWindow()
// 主题设置
Config.setAppTheme(Tool.getParameForURL('theme', window.location.href))
// 语言设置
Config.setLanguage()

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

NetApi.call('i18n/getMapKeyLangs', {}, (data) => {
    if (data.code === 0) {
        Config.setApiTips(data.result)
    }

    console.error('getMapKeyLangs succ', data)
}, (err) => {
    console.error('getMapKeyLangs err', err)
})

ReactDOM.render(<Application />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
