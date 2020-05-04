import('./testing').then(testing => {
    window._ReactTesting = testing.default

    console.error('import testing then', testing)
})

const _APITIPS = require('./assets/json/tipsmessage.json')
const _LANGUAGE = require('./assets/json/language.json')

const _APP_ID = window._APP_ID ? window._APP_ID : 'ig'
const _APP_NAME = window._APP_NAME ? window._APP_NAME : 'IG彩票'
const _APP_VERSION = window._APP_VERSION ? window._APP_VERSION : 101
const _APP_DOMAIN = window._APP_DOMAIN ? window._APP_DOMAIN : '16898YH.COM'

const _RELEASE = window._RELEASE_SERVER ? false : false
const _RELEASE_DOMAIN = window._RELEASE_DOMAIN ? window._RELEASE_DOMAIN : 'yinhe.pjd111.com'
const _TEST_DOMAIN = window._TEST_DOMAIN ? window._TEST_DOMAIN : 'pjd.bctt.cc'
const _DOMAIN_PORT = window._DOMAIN_PORT ? window._DOMAIN_PORT : ''

class Config {
    static APITIPS = _APITIPS
    // app
    static APP_ID = _APP_ID // APP ID

    static APP_VERSION = _APP_VERSION // 版本号

    static APP_DOMAIN = _APP_DOMAIN

    static APP_NAME = _APP_NAME

    static isInApp() {
        let name = window.location.hostname

        if (name === '127.0.0.1' || name === 'localhost') {
            return true
        }

        return false
    }

    static queryParameForURL(name, url) {
        let searchIndex = 0
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

    // server
    static SERVER_XY = this.getSerProtocol() // 协议
    static getSerProtocol() {
        if (this.isInApp()) {
            return 'https:'
        } else {
            return window.location.protocol
        }
    }

    static SERVER_PT = this.getSerPort() // 端口
    static getSerPort() {
        if (this.isInApp()) {
            return _DOMAIN_PORT
        } else {
            return window.location.port
        }
    }

    static SERVER_HS = this.getSerHost() // 域名
    static getSerHost() {
        if (this.isInApp()) {
            return _RELEASE ? _RELEASE_DOMAIN : _TEST_DOMAIN + ':' + this.SERVER_PT
        } else {
            return window.location.host
        }
    }

    static SERVER_DM = this.SERVER_XY + '//' + this.SERVER_HS + '/' // API 地址

    static getLanguage() {
        switch (this.queryParameForURL('language', window.location.href)) {
            case 'en': {
                return _LANGUAGE.en
            }
            case 'cn': {
                return _LANGUAGE.cn
            }
            default: {
                return _LANGUAGE.cn
            }
        }
    }

    static LanguageUse = this.getLanguage()

    static Theme = {
        toolbar: {
            height: 45
        },
        filter: {
            height: 26,
            margin: 4,
            padding: 10
        },
        color: {
            theme: '#090909',
            main: '#cca352',
            main_easy: 'rgb(149,126,76)',
            sub: '#00BFFF',
            sub_deep: '#FF4500',
            sub_dk: 'rgb(104,137,183)',
            font: '#F5F5F5',
            font_deep: '#A9A9A9',
            font_dk: 'rgb(0,0,0)',
            background: 'rgb(205,205,205)',
            background_dk: 'rgb(0,0,0)',
            toolbar: 'white'
        }
    }

    static getZHTips(code) {
        return this.APITIPS[code] ? this.APITIPS[code].zh : code
    }

    static setApiTips(data) {
        this.APITIPS = data
    }
}

export default Config

window._ReatConfig = Config
