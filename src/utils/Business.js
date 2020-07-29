import CryptoJS from 'crypto-js'
import Config from '../Config'
import Tool from './Tool'

class Business {
    static default_aeskey = 'wsx~3319dee^1688' // 默认 aes key

    static _userinfo = {} // 用户信息 complete: 1-只注册, 2-设置用户姓名和支付密码, 3-绑定银行卡

    static _main_wallet = {} // 主钱包

    static _interest_wallet = {} // 利息钱包

    static _status = 0 // 0 未登录 1 已登录

    static setUserinfo(use) {
        this._userinfo = use
    }

    static getUserinfo(key) {
        if (!this._userinfo) { return null }

        if (key) {
            if (this._userinfo[key]) {
                return this._userinfo[key]
            } else {
                return null
            }
        }

        return this._userinfo
    }

    static getUserId() {
        return this._userinfo ? this._userinfo.name : null
    }

    static setMainWallet(use) {
        this._main_wallet = use
    }

    static getMainWallet(key) {
        if (!this._main_wallet) { return null }

        return key ? this._main_wallet[key] : this._main_wallet
    }

    static setInterestWallet(use) {
        this._interest_wallet = use
    }

    static getInterestWallet(key) {
        if (!this._interest_wallet) { return null }

        return key ? this._interest_wallet[key] : this._interest_wallet
    }

    static isLogin() {
        return this._status === 1 ? true : false
    }

    static encryptBase64(txt, key = this.default_aeskey) { // 加密
        let srcs = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(txt))

        let en = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString()

        return en
    }

    static decryptBase64(txt, key = this.default_aeskey) { // 解密
        return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(this.decrypt(txt, key)))
    }

    static encrypt(txt, key = this.default_aeskey) { // 加密
        let srcs = CryptoJS.enc.Utf8.parse(txt)

        let en = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString()

        return encodeURIComponent(en)
    }

    static decrypt(txt, key = this.default_aeskey) { // 解密
        let decrypt = CryptoJS.AES.decrypt(txt, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })

        return CryptoJS.enc.Utf8.stringify(decrypt).toString()
    }

    static saveLoginInfo(name, pass) {
        let pam = {
            name: name,
            pass: this.encrypt(pass),
            date: new Date().getTime()
        }

        Tool.saveLocalStorage(Config.APPCONFIG.APP_ID + '_LoginInfo', JSON.stringify(pam))
    }

    static getLoginInfo() {
        let pam = Tool.getLocalStorage(Config.APPCONFIG.APP_ID + '_LoginInfo')

        pam = pam ? JSON.parse(pam) : null

        if (pam) {
            pam.pass = this.decryptBase64(pam.pass)
        }

        return pam
    }

    // -- ServerApi 接口 --

    static getAesKey(handle) { // 获取 aes key
        if (!handle) { return }

        Tool.postRequestXML('user/getAeskey', null, (data) => {
            if (data.result) {
                handle(this.decrypt(data.result))
            } else {
                handle(null)
            }
        }, (error) => {
            handle(null)
        })
    }

    static LoginApi(pame, succHandle, errHandle) {
        let { name, pass } = pame

        this.getAesKey((key) => {
            let tempPass = pass

            if (key) {
                tempPass = this.encrypt(pass, key)
            }

            let pame = {
                name: name,
                password: tempPass,
                requestType: 'json',
                rand: Tool.randomString()
            }

            Tool.postRequestXML('user/login', pame, (data) => {
                if (data.code === 0) {
                    this._status = 1

                    this.putAccounts(data.result.accounts)

                    this.setUserinfo(data.result)

                    this.saveLoginInfo(name, pass)

                    this.AccountsApi((_data) => {
                        if (succHandle) { succHandle(data) }
                    }, (err) => {
                        if (succHandle) { succHandle(data) }
                    })
                } else {
                    this._status = 0

                    if (succHandle) { succHandle(data) }
                }
            }, (err) => {
                this._status = 0

                if (errHandle) {
                    errHandle(err)
                }
            })
        })
    }

    static RegApi(pame = {
        name: null,
        password: null,
        smsCode: null,
        imgCode: null,
        mobile: null,
        code: null
    }, succHandle, errHandle) {
        let { name, password } = pame

        this.getAesKey((key) => {
            if (key) {
                pame.password = this.encrypt(pame.password, key)
            }

            pame.rand = Tool.randomString()

            Tool.postRequestXML('user/register', pame, (data) => {
                if (data.code === 0) {
                    this._status = 1

                    this.putAccounts(data.result.accounts)

                    this.setUserinfo(data.result)

                    this.saveLoginInfo(name, password)

                    this.AccountsApi((_data) => {
                        if (succHandle) { succHandle(data) }
                    }, (err) => {
                        if (succHandle) { succHandle(data) }
                    })
                } else {
                    this._status = 0

                    if (succHandle) { succHandle(data) }
                }
            }, (error) => {
                this._status = 0

                if (errHandle) { errHandle(error) }
            })
        })
    }

    static UserinfoApi(succHandle, errHandle) {
        Tool.postRequestXML('user/userInfo', {
            requestType: 'json'
        }, (data) => {
            if (data.code === 0) {
                this._status = 1

                this.putAccounts(data.result.accounts)

                this.setUserinfo(data.result)

                this.saveLoginInfo(data.result)

                this.AccountsApi((_data) => {
                    if (succHandle) { succHandle(data) }
                }, (err) => {
                    if (succHandle) { succHandle(data) }
                })
            } else {
                this._status = 0

                if (succHandle) { succHandle(data) }
            }
        }, (error) => {
            this._status = 0

            if (errHandle) { errHandle(error) }
        })
    }

    static AccountsApi(succHandle, errHandle) {
        Tool.postRequestXML('account/getAccounts', {
            requestType: 'json'
        }, (data) => {
            if (data.code === 0) {
                this.putAccounts(data.result)
            }

            if (succHandle) { succHandle(data) }
        }, (err) => {
            if (errHandle) { errHandle(err) }
        })
    }

    static putAccounts(result = []) {
        for (let i = 0; i < result.length; i++) {
            let _it = result[i]

            switch (_it.type_id) {
                case 1: { // 主钱包
                    this.setMainWallet(_it)

                    break
                }
                case 2: { // 利息钱包
                    this.setInterestWallet(_it)

                    break
                }
                default: { break }
            }
        }
    }

    static LoginGameApi(pame, succHandle, errHandle) {
        let ___ = {
            code: null,
            // gm
            gameId: null,
            isFullScreen: 1,
            // ky zz
            kindID: null,
            // lucky361 tm
            gameCode: null,
            // ag
            gameType: null
        }

        pame.requestType = 'json'

        Tool.showLoading((comp) => {
            Tool.postRequestXML('gameApi/login', pame, (data) => {
                comp.close()

                let link = null

                if (data.code === 0) {
                    link = data.result.params ? data.result.params.link : null
                }

                if (succHandle) { succHandle(data, link) }
            }, (error) => {
                comp.close()

                if (errHandle) { errHandle(error) }
            })
        })
    }

    static enterTimeout = null

    static enterGame(pame, succHandle, errHandel) {
        let ___ = {
            code: null,
            requestType: 'json'
        }

        Tool.postRequestXML('gameApi/enter', pame, (data) => {
            if (data.code === 0) {
                switch (data.result) {
                    case 'OK': {
                        if (succHandle) {
                            succHandle({
                                code: 0,
                                tips: 'OK'
                            })
                        }

                        break
                    }
                    case 'MAINTENANCE': { // 维护
                        if (errHandel) {
                            errHandel({
                                code: 900,
                                tips: 'MAINTENANCE',
                                errorMesage: Config.getApiTips('tip.error.game.maintenance')
                            })
                        }

                        break
                    }
                    case 'PLAY_LIMIT': { // 禁赌
                        if (errHandel) {
                            errHandel({
                                code: 130,
                                tips: 'PLAY_LIMIT',
                                errorMesage: Config.getApiTips('tip.error.stopplay')
                            })
                        }

                        break
                    }
                    default: { // 重试
                        if (pame.resiez) {
                            pame.resiez = pame.resiez - 1
                        } else {
                            pame.resiez = 3
                        }

                        if (pame.resiez > 0) {
                            clearTimeout(this.enterTimeout)

                            this.enterTimeout = setTimeout(() => {
                                this.enterGame(pame, succHandle, errHandel)
                            }, 3000)
                        }

                        break
                    }
                }
            }

        }, (error) => {
            errHandel({
                code: -1,
                tips: 'ERROR',
                errorMesage: error
            })
        })
    }

    static LogoutApi(succHandle, errHandel) {
        Tool.postRequestXML('user/logout', {
        }, (data) => {
            if (succHandle) { succHandle(data) }
        }, (err) => {
            if (errHandel) { errHandel(err) }
        })
    }
}

export default Business
