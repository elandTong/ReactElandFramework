import Emit from './utils/EventBus'
import Tool from './utils/Tool'

window._APP_ID = 'elandAppId'

const _CHANNEL = require('./assets/json/channel.json')
const _APITIPS = require('./assets/json/tips.json')
const _LANGUAG = require('./assets/json/language.json')

class Config {
    static APPCONFIG = {
        APP_ID: window._APP_ID, APP_NAME: 'ElandFramework', APP_VERSION: 252006002,
        RELEASE: false,
        RELEASE_DOMAIN: 'https://127.0.0.1/',
        TEST_DOMAIN: 'https://127.0.0.1/'
    }

    static CHANNEL = _CHANNEL
    static APITIPS = _APITIPS
    static LANGUAG = _LANGUAG
    static LANGUAG_USE = _LANGUAG.cn

    static SERVER_API = null

    static GLOBAL_EVENT = './_BASE_GLOBAL_THEME/'
    static GLOBAL_EVENT_TYPE = {
        STYLE_THEME_CHANGE: 'STYLE_THEME_CHANGE',
        NATIVE_BACK_EVENT: 'NATIVE_BACK_EVENT'
    }

    static Theme = {
        toolbar: {
            height: 45
        },
        color: {
            theme: 'rgb(218,128,88)',
            font: 'rgb(0,0,0)',
            font_anti: 'rgb(205,205,205)' // 反差抵抗字体
        },
        light: {
            theme: 'rgb(218,128,88)',
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
        },
        resources: {
            iconPath: 'assets/res/icon',
            picPath: 'assets/res/pic',
            channelIconPath: 'assets/res/channel/main/icon',
            channelPicPath: 'assets/res/channel/main/pic'
        }
    }

    static getServerApi() {
        if (this.isInapp()) {
            return this.APPCONFIG.RELEASE ? this.APPCONFIG.RELEASE_DOMAIN : this.APPCONFIG.TEST_DOMAIN
        } else {
            return window.location.protocol + '//' + window.location.host + '/'
        }
    }

    static getApiTips(code, type) {
        return this.APITIPS[code] ? this.APITIPS[code][type || 'zh'] : code
    }

    static setApiTips(data) {
        this.APITIPS = data
    }

    static getAppTheme() {
        return window.document.body.className.replace('theme-', '')
    }

    static setAppTheme(name) {
        let _currname = this.getAppTheme()

        let _data = require('./assets/json/theme.json')[this.APPCONFIG.APP_ID]

        if (_data) { this.Theme = Tool.structureAssignment(this.Theme, _data, false, true) }

        if (_currname === name) { return }

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

    static getLanguage(name) {
        switch (name) {
            case 'en': {
                return this.LANGUAG.en
            }
            case 'cn': {
                return this.LANGUAG.cn
            }
            default: {
                return this.LANGUAG.cn
            }
        }
    }

    static setLanguage(name) {
        this.LANGUAG_USE = this.getLanguage(name || this.getParam('language'))
    }

    static setAppConfig(name) {
        let _data = this.CHANNEL[name || window._APP_ID]

        if (_data) {
            this.APPCONFIG = Object.assign(this.APPCONFIG, _data)
        }

        this.SERVER_API = this.getServerApi()
    }

    static bindWindow() {
        window._NativeBackEventHandle = () => {
            Emit.exe({
                theme: this.GLOBAL_EVENT,
                type: this.GLOBAL_EVENT_TYPE.NATIVE_BACK_EVENT
            })
        }

        window._ReatConfig = Config
    }

    static isInapp() {
        let name = window.location.hostname

        if (name === '127.0.0.1' || name === 'localhost') {
            return true
        }

        return false
    }

    static getParam(name) {
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
}

import('./Testing').then(data => {
    window._ReactTesting = data.default
})

export default Config
