import Emit from './tool/EventBus'

import('./testing').then(testing => {
    window._ReactTesting = testing.default
})

const _APITIPS = require('./assets/json/tipsmessage.json')
const _LANGUAGE = require('./assets/json/language.json')

const _APP_ID = 'ig'
const _APP_NAME = 'IG彩票'
const _APP_VERSION = 112

const _RELEASE = false
const _RELEASE_DOMAIN = 'https://pjd.bctt.cc/'
const _TEST_DOMAIN = 'https://pjd.bctt.cc/'

const _INAPP = function () {
    let name = window.location.hostname
    if (name === '127.0.0.1' || name === 'localhost') {
        return true
    }
    return false
}

const _QUERY = function (name) {
    let searchIndex = 0, url = window.location.href
    for (let i = 0; i < url.length; i++) {
        if (url[i] === '?') {
            searchIndex = i
            break
        }
    }
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = url.substr(searchIndex).substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}

class Config {
    static APITIPS = _APITIPS
    static LANGUAGE = _LANGUAGE

    static APP_ID = _APP_ID
    static APP_VERSION = _APP_VERSION
    static APP_NAME = _APP_NAME

    static RELEASE = _RELEASE
    static RELEASE_DOMAIN = _RELEASE_DOMAIN
    static TEST_DOMAIN = _TEST_DOMAIN

    static SERVER_DM = this.getServerAddress()

    static LANGUAGE_USE = this.LANGUAGE.cn

    static GLOBAL_EVENT = './_BASE_GLOBAL_THEME/'

    static GLOBAL_EVENT_TYPE = {
        STYLE_THEME_CHANGE: 'STYLE_THEME_CHANGE'
    }

    static Theme = {
        toolbar: {
            height: 45
        },
        color: {
            theme: 'rgb(204,163,82)',
            font: 'rgb(0,0,0)',
            font_anti: 'rgb(205,205,205)' // 反差抵抗字体
        },
        light: {
            theme: 'rgb(204,163,82)',
            font: 'rgb(0,0,0)',
            font_anti: 'rgb(205,205,205)'
        },
        dark: {
            theme: 'rgb(204,163,82)',
            font: 'rgb(245,245,245)',
            font_anti: 'rgb(0,0,0)'
        },
        user: {
            theme: 'rgb(204,163,82)',
            font: 'rgb(0,0,0)',
            font_anti: 'rgb(205,205,205)'
        }
    }

    static getServerAddress() {
        if (_INAPP()) {
            return this.RELEASE ? this.RELEASE_DOMAIN : this.TEST_DOMAIN
        } else {
            return window.location.protocol + '//' + window.location.host + '/'
        }
    }

    static getLanguage(name) {
        switch (name) {
            case 'en': {
                return this.LANGUAGE.en
            }
            case 'cn': {
                return this.LANGUAGE.cn
            }
            default: {
                return this.LANGUAGE.cn
            }
        }
    }

    static getZHTips(code) {
        return this.APITIPS[code] ? this.APITIPS[code].zh : code
    }

    static setApiTips(data) {
        this.APITIPS = data
    }

    static setAppTheme(name) {
        let _currname = this.getAppTheme()

        if (_currname === name) {
            return
        }

        let _broadcast = () => {
            Emit.exe({
                theme: this.GLOBAL_EVENT,
                type: this.GLOBAL_EVENT_TYPE.STYLE_THEME_CHANGE,
                name: this.getAppTheme()
            })
        }

        switch (name) {
            case 'light': {
                window.document.body.className = 'theme-light'
                this.Theme.color = Object.assign({}, this.Theme.light)
                _broadcast()
                break
            }
            case 'dark': {
                window.document.body.className = 'theme-dark'
                this.Theme.color = Object.assign({}, this.Theme.dark)
                _broadcast()
                break
            }
            case 'user': {
                window.document.body.className = 'theme-user'
                this.Theme.color = Object.assign({}, this.Theme.user)
                _broadcast()
                break
            }
            default: {
                break
            }
        }
    }

    static getAppTheme() {
        return window.document.body.className.replace('theme-', '')
    }

    static setLanguage(name) {
        this.LANGUAGE_USE = this.getLanguage(name || _QUERY('language'))
    }
}

export default Config

window._ReatConfig = Config
