import Application from './App'
import Emit from './utils/EventBus'
import Tool from './utils/Tool'

window._APP_ID = 'elandAppId'

const _CHANNEL = require('./assets/json/channel.json')
const _APITIPS = require('./assets/json/tips.json')
const _LANGUAG = require('./assets/json/language.json')

class Config {
    static APPCONFIG = {
        APP_ID: window._APP_ID,
        APP_NAME: 'ElandFramework',
        APP_VERSION: 320004024,
        RELEASE: false,
        RELEASE_DOMAIN: 'https://127.0.0.1/',
        TEST_DOMAIN: 'https://127.0.0.1/'
    }

    static CHANNEL = _CHANNEL
    static APITIPS = _APITIPS
    static LANGUAG = _LANGUAG.cn

    static USE_LANGUAG_TYPE = 'cn'

    static SERVER_API = null

    static GLOBAL_EVENT = './_BASE_GLOBAL_THEME/'
    static GLOBAL_EVENT_TYPE = {
        THEME_CHANGE: 'THEME_CHANGE',
        LANGUAG_CHANGE: 'LANGUAG_CHANGE',
        NATIVE_BACK: 'NATIVE_BACK'
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
        resources: {
            defaultIconPath: 'assets/res/icon',
            defaultPicPath: 'assets/res/pic',
            defaultChannelIconPath: 'assets/res/channel/main/icon',
            defaultChannelPicPath: 'assets/res/channel/main/pic',

            iconPath: 'assets/res/icon-dark',
            picPath: 'assets/res/pic-dark',
            channelIconPath: 'assets/res/channel/test/icon',
            channelPicPath: 'assets/res/channel/test/pic'
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
        name = Tool.isEmpty(name) ? 'light' : name

        if (this.getAppTheme() === name) {
            return
        }

        let _data = require('./assets/json/theme.json')[name]

        if (_data) {
            this.Theme = Tool.structureAssignment(this.Theme, _data, false, true)

            window.document.body.className = `theme-${name}`

            if (Application._Self instanceof Application) {
                Application._Self.updateContextForTheme(this.Theme)

                Emit.exe({
                    theme: this.GLOBAL_EVENT,
                    type: this.GLOBAL_EVENT_TYPE.THEME_CHANGE,
                    name: name
                })
            }
        }
    }

    static setLanguage(name) {
        name = Tool.isEmpty(name) ? 'cn' : name

        if (this.USE_LANGUAG_TYPE === name) {
            return
        }

        let _data = _LANGUAG[name]

        if (_data) {
            this.LANGUAG = _data

            this.USE_LANGUAG_TYPE = name

            if (Application._Self instanceof Application) {
                Application._Self.updateContextForLanguage(this.LANGUAG)

                Emit.exe({
                    theme: this.GLOBAL_EVENT,
                    type: this.GLOBAL_EVENT_TYPE.LANGUAG_CHANGE,
                    name: name
                })
            }
        }
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
                type: this.GLOBAL_EVENT_TYPE.NATIVE_BACK
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
}

import('./Testing').then(data => {
    window._ReactTesting = data.default
})

export default Config
