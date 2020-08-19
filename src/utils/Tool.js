import React from 'react'
import Config from '../Config'
import Spiner from '../modal/Spiner'
import Toast from '../modal/Toast'
import Frame from '../router/Frame'

class ModalTool {
    static showToast(txt, handle) {
        RouterTool.navigationModal(Toast._path, null, (comp) => {
            comp.setText(txt)
            if (handle) {
                handle(comp)
            }
        })
    }

    static showLoading(handle) {
        RouterTool.navigationModal(Spiner._path, null, (comp) => {
            if (handle) { handle(comp) }
        })
    }
}

class RouterTool {
    static _frame = null

    static MountFrame(comp) {
        this._frame = comp
    }

    // 框架工具
    static startScreen(intent, data, handle) {
        if (this._frame instanceof Frame) {
            this._frame.startScreen(intent, data, handle)
        }
    }

    static navigationScreen(name, data, handle) {
        if (this._frame instanceof Frame) {
            this._frame.navigationScreen(name, data, handle)
        }
    }

    static startModal(intent, data, handle) {
        if (this._frame instanceof Frame) {
            this._frame.startModal(intent, data, handle)
        }
    }

    static navigationModal(name, data, handle) {
        if (this._frame instanceof Frame) {
            this._frame.navigationModal(name, data, handle)
        }
    }

    static finishScreen(comp) {
        if (this._frame instanceof Frame) {
            this._frame.finishScreen(comp)
        }
    }

    static finishModal(comp) {
        if (this._frame instanceof Frame) {
            this._frame.finishModal(comp)
        }
    }
}

class Tool {
    static _apiMiddlewareHandle = null

    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry/i.test(window.navigator.userAgent)
    }

    static isIPad() {
        return /webOS|iPad/i.test(window.navigator.userAgent)
    }

    static isInApp() {
        let name = window.location.hostname

        if (name === '127.0.0.1' || name === 'localhost') {
            return true
        }

        return false
    }

    static isInIOS() {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad)?/i)) {
            return true
        }

        return false
    }

    static isInAndroid() {
        let u = navigator.userAgent // 不在主框架则统一模拟安卓

        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    }

    static saveLocalStorage(key, val) {
        if (key === null || key === '') {
            return
        }

        if (window.localStorage) {
            window.localStorage.setItem(key, val)
        }
    }

    static getLocalStorage(key, def) {
        if (!key) { return }

        let val = window.localStorage ? window.localStorage.getItem(key) : null

        return val ? val : def
    }

    static isTopFrame() {
        return window.self === window.top // 是否处于主框架
    }

    static postRequest(api, params, succHandle, errHandle, opts) {
        if (!api) { return }

        let url

        if (this.checkURL(api)) {
            url = api
        } else {
            url = Config.SERVER_API + api
        }

        let fromData = new FormData()

        let pam = ''

        let list = []

        if (params instanceof Object) {
            Object.keys(params).forEach((key) => {
                fromData.append(key, params[key])

                list.push(key + '=' + params[key])
            })

            pam = list.join('&')
        } else {
            fromData = params

            pam = params
        }

        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': '*/*',
                'Content-type': 'application/x-www-form-urlencoded charset=UTF-8'
            },
            body: (pam),  // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer'
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((json) => {
            if (succHandle) { succHandle(json) }
        }).catch((err) => {
            if (errHandle) { errHandle(err) }
        })
    }

    static postRequestXML(api, params, succHandle, errHandle, opts = {}) {
        let url

        if (this.checkURL(api)) {
            url = api
        } else {
            url = Config.SERVER_API + api
        }

        let _htp = new XMLHttpRequest()

        _htp.withCredentials = opts.withCredenIs ? opts.withCredenIs : true

        _htp.onreadystatechange = (state) => {
            let _unsent = () => {
                console.log('XMLHttpRequest post readyState for unsent')
            }

            let _opend = () => {
                console.log('XMLHttpRequest post readyState for opend')
            }

            let _send = () => {
                console.log('XMLHttpRequest post readyState for send')
            }

            let _load = () => {
                console.log('XMLHttpRequest post readyState for loading')
            }

            let _done = () => {
                if (_htp.status === 200) {
                    let data = _htp.responseText


                    let result = null

                    try {
                        result = JSON.parse(data)
                    } catch (e) {
                        result = data
                    }

                    if (this._apiMiddlewareHandle) {
                        this._apiMiddlewareHandle(url, result)
                    }

                    console.log('XMLHttpRequest post success', result)

                    if (succHandle) {
                        succHandle(result)
                    }
                } else {
                    if (errHandle) {
                        errHandle({
                            code: _htp.status,
                            msg: _htp.statusText
                        })

                        errHandle = null
                    }
                }

                console.log('XMLHttpRequest post readyState for done')
            }

            switch (_htp.readyState) {
                case XMLHttpRequest.UNSENT:
                    _unsent()
                    break
                case XMLHttpRequest.OPENED:
                    _opend()
                    break
                case XMLHttpRequest.HEADERS_RECEIVED:
                    _send()
                    break
                case XMLHttpRequest.LOADING:
                    _load()
                    break
                case XMLHttpRequest.DONE:
                    _done()
                    break
                default: break
            }
        }

        _htp.onerror = function (err) {
            if (errHandle) {
                errHandle({
                    code: _htp.status,
                    msg: _htp.statusText
                })

                errHandle = null
            }

            console.log('XMLHttpRequest post error', err)
        }

        _htp.open('POST', url, opts.asyn ? opts.asyn : true)

        _htp.timeout = opts.outTime ? opts.outTime : 5000

        _htp.setRequestHeader('Accept', '*/*')

        _htp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded charset=UTF-8')

        if (params instanceof Object) {
            let _join = []

            Object.keys(params).forEach(function (key) {
                _join.push(key + '=' + params[key])
            })

            _htp.send(_join.join('&'))
        } else {
            _htp.send(params)
        }
    }

    static getRequestXML(url, succHandle, errHandle) {
        let _htp = new XMLHttpRequest()

        _htp.onreadystatechange = function (state) {
            let _unsent = () => {
                console.log('XMLHttpRequest get readyState for unsent')
            }

            let _opend = () => {
                console.log('XMLHttpRequest get readyState for opend')
            }

            let _send = () => {
                console.log('XMLHttpRequest get readyState for send')
            }

            let _load = () => {
                console.log('XMLHttpRequest get readyState for loading')
            }

            let _done = () => {
                if (_htp.status === 200) {
                    let data = _htp.responseText

                    console.log('XMLHttpRequest get succ :', _htp.responseText)

                    let result = null

                    try {
                        result = JSON.parse(data)
                    } catch (e) {
                        result = data
                    }

                    if (succHandle) {
                        succHandle(result)
                    }
                } else {
                    if (errHandle) {
                        errHandle({
                            code: _htp.status,
                            msg: _htp.statusText
                        })

                        errHandle = null
                    }
                }

                console.log('XMLHttpRequest get readyState for done')
            }

            switch (_htp.readyState) {
                case XMLHttpRequest.UNSENT:
                    _unsent()
                    break
                case XMLHttpRequest.OPENED:
                    _opend()
                    break
                case XMLHttpRequest.HEADERS_RECEIVED:
                    _send()
                    break
                case XMLHttpRequest.LOADING:
                    _load()
                    break
                case XMLHttpRequest.DONE:
                    _done()
                    break
                default: break
            }
        }

        _htp.onerror = function (err) {
            if (errHandle) {
                errHandle({
                    code: _htp.status,
                    msg: _htp.statusText
                })

                errHandle = null
            }

            console.log('XMLHttpRequest get error', err)
        }

        _htp.open('GET', url, true)

        _htp.timeout = 5000

        _htp.send(null)
    }

    static getRequest(api, succHandle, errHandle) {
        if (!api) { return }

        let url

        if (this.checkURL(api)) {
            url = api
        } else {
            url = Config.SERVER_API + api
        }

        fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer'
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((json) => {
            if (this._apiMiddlewareHandle) { this._apiMiddlewareHandle(url, json) }

            if (succHandle) { succHandle(json) }
        }).catch((err) => {
            if (errHandle) { errHandle(err) }
        })
    }

    static o(id) {
        return document.getElementById(id)
    }

    static getTimeZoneE8(_tz, _d) {
        if (typeof _tz !== 'number') { return }

        let d = new Date(_d)

        let len = d.getTime()

        let offset = d.getTimezoneOffset() * 60000

        let utcTime = len + offset

        return new Date(utcTime + 3600000 * _tz)
    }

    static getParameForURL(name, url) {
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

    static uuid() {
        let s = []
        let hexDigits = '0123456789abcdef'

        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
        }

        s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010

        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01

        s[8] = s[13] = s[18] = s[23] = '-'

        return s.join('')
    }

    static rotate(idOrDom, times = 2000) {
        let dom = idOrDom

        if (idOrDom instanceof HTMLElement) {
            dom = idOrDom
        } else {
            dom = this.o(idOrDom)
        }

        dom.className = 'common-rotate'

        clearTimeout(window._timeout_rotate)

        window._timeout_rotate = setTimeout(() => {
            dom.className = ''
        }, times)
    }

    static fontsize(size, datum = 1280) {
        return document.body.clientWidth * (size / datum)
    }

    static toscale(size, datum = 1280) {
        return document.body.clientWidth * (size / datum)
    }

    static toscaleY(size, datum = 617) {
        return document.body.clientHeight * (size / datum)
    }

    static topoint(s) {
        if (isNaN(s) === false) { return s }

        return Number(s.replace('%', '')) / 100
    }

    static ispoint(s) {
        if (!s) {
            return false
        }

        return s.indexOf('%') > -1 ? true : false
    }

    /**
     * 对象赋值
     * _opts : 属性接收对象
     * _newopts : 属性赋值对象
     */
    static structureAssignment(_opts, _newopts, identical = false, deeploop = false) {
        if (_newopts == null) { return _opts }

        if (_newopts instanceof Array) {
            return _opts
        } else if (_newopts instanceof Object) {
            _opts = Object.assign({}, _opts)

            Object.keys(_newopts).forEach((key) => {
                if (key in _opts) { // 判断是否存在该属性
                    if (_opts[key] instanceof Array) {
                        if (identical) {
                            if (_opts[key] == null || typeof (_opts[key]) == typeof (_newopts[key])) {
                                _opts[key] = _newopts[key]
                            }
                        } else {
                            _opts[key] = _newopts[key]
                        }
                    } else {
                        if (_opts[key] instanceof Object && deeploop) {
                            _opts[key] = this.structureAssignment(_opts[key], _newopts[key], identical, deeploop)
                        } else {
                            if (identical) {
                                if (_opts[key] == null || typeof (_opts[key]) == typeof (_newopts[key])) {
                                    _opts[key] = _newopts[key]
                                }
                            } else {
                                _opts[key] = _newopts[key]
                            }
                        }
                    }
                }
            })

            return Object.assign(Object.assign({}, _newopts), _opts)
        } else {
            return _opts
        }
    }

    static numberAdd(i, num) {
        let ni = i.toString()
        let len = ni.length
        if (len < num) {
            i = '0' + i
            return this.numberAdd(i, num)
        } else {
            return i
        }
    }

    static secondToDate(result, len) {
        let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
        let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
        let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
        m = parseInt(m) + parseInt(h * 60)
        return result = this.numberAdd(m, len) + ' : ' + this.numberAdd(s, len)
    }

    static checkURL(url) {
        return url.indexOf('http://') > -1 || url.indexOf('https://') > -1
    }

    static randomString(len = 32) {
        let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'

        let maxPos = $chars.length

        let pwd = ''

        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
        }

        return pwd
    }

    static checkInfo(cont, i) {
        let __ = {
            uId: '[0-9a-zA-Z]{6,18}$',
            uPwd: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$'
        }
        let re = new RegExp(__[i], 'g')
        return re.test(cont)
    }

    static toDatestr(time, format = 'yyyy-MM-dd') {
        if (time instanceof Date) {
            return time.format(format)
        } else {
            return new Date(this.getTimeZoneE8(8, time)).format(format)
        }
    }

    static toTimeDistance(time) {
        let target = this.getTimeZoneE8(8, time).getTime()

        let now = this.getTimeZoneE8(8, new Date().getTime()).getTime()

        if (target >= now) {
            let cha = Math.abs(target - now)

            let fen_times = 1000 * 60

            let shi_times = fen_times * 60

            let tan_times = shi_times * 24

            let tian = parseInt(cha / tan_times)

            let shi = parseInt((cha % tan_times) / shi_times)

            let fen = parseInt((cha % tan_times) % shi_times / fen_times)

            return tian + '天 ' + shi + ' 时 ' + fen + ' 分'
        } else {
            return '已结束'
        }
    }

    static insertSplitline(items = [], opts = {}) {
        let {
            select = -1,
            selectClassName = 'common-spline-select',
            side = false,
            orientation = 'x',
            className = null
        } = opts

        let _classname = orientation === 'x' ? 'common-spline-x' : 'common-spline-y'

        let _selectClassName = (i, s = false) => {
            if (s) { return i === select ? selectClassName : '' }
            return (i === select || i === select - 1) ? selectClassName : ''
        }

        let _result = []
        for (let i = 0; i < items.length; i++) {
            let _item = items[i]
            if (side) {
                if (i === 0) {
                    _result.push((
                        <div key={items.length + i} className={`${_classname} ${className || ''} ${_selectClassName(i, true)}`} />
                    ))
                }
                _result.push(_item)
                _result.push((
                    <div key={items.length + i + 1} className={`${_classname} ${className || ''} ${_selectClassName(i)}`} />
                ))
            } else {
                _result.push(_item)
                if (i !== items.length - 1) {
                    _result.push((
                        <div key={items.length + i} className={`${_classname} ${className || ''} ${_selectClassName(i)}`} />
                    ))
                }
            }
        }

        return _result
    }

    static getWeekDay(day) {
        let mDate = new Date(day)

        let myddy = mDate.getDay()

        let weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

        return weekday[myddy]
    }

    static pushFillin(items = [], width, num) {
        let _add = (items.length % num) > 0 ? num - (items.length % num) : 0

        for (let i = 0; i < _add; i++) {
            items.push((<div key={items.length + i} style={{ width: width }}></div>))
        }

        return items
    }

    static domainName(url) {
        let head = ''

        let domain = ''

        if (url.indexOf('://') >= 0) {
            let uList = url.split('://')
            head = uList[0]

            let last = uList[1]

            let dList = last.split('/')

            domain = dList[0]

            return head + '://' + domain
        } else {
            let uList = url.split('/')

            return uList[0]
        }
    }

    // eslint-disable-next-line no-dupe-class-members
    static secondToDate(result) {
        let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)

        let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))

        let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))

        m = parseInt(m) + parseInt(h * 60)

        return result = m + ':' + s
    }

    static addFavorite() {
        if (window.external && window.external.addFavorite) {
            window.external.addFavorite(window.location.href, Config.APPCONFIG.APP_NAME)
        } else if (window.sidebar && window.sidebar.addPanel) {
            window.sidebar.addPanel(window.location.href, Config.APPCONFIG.APP_NAME, '')
        } else {
            alert('当前浏览器无法自动加入收藏,请使用 Ctrl+D 进行添加!')
        }
    }

    static setHomePage() {
        let url = document.URL

        if (document.all) { // IE all 集合返回对文档中所有 HTML 元素的引用
            document.body.style.behavior = 'url(#default#homepage)'
            document.body.setHomePage(url)
        } else if (window.sidebar) { // 火狐
            if (window.netscape) {
                try {
                    window.netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect')
                } catch (e) {
                    alert('此操作被浏览器拒绝! 请在浏览器地址栏输入\'about:config\'并回车然后将[signed.applets.codebase_principal_support]的值设置为\'true\',双击即可!')
                }
            }

            try {
                let serve = window.Components.classes['@mozilla.org/preferences-service1']
                let prefs = serve.getService(window.Components.interfaces.nsIPrefBranch)
                prefs.setCharPref('browser.startup.homepage', url)
            } catch (e) {
                alert('当前浏览器无法自动设置首页,请手动设置!')
            }
        } else {
            alert('当前浏览器无法自动设置首页,请手动设置!')
        }
    }

    static limitFloatnum(val, fractionDigits = 2) {
        return Number.isInteger(val) ? val : parseFloat(val).toFixed(fractionDigits)
    }

    static isEmpty(val) {
        if (val && val.length > 0) {
            return false
        }

        return true
    }

    static lastTask(handle, out = 200, taskHandle) {
        if (handle) {
            let _timeout = setTimeout(() => {
                handle()
            }, out)

            if (taskHandle) {
                taskHandle(_timeout)
            }
        }
    }

    static getRelativePosition(e) { // 获取相对目标的事件坐标
        if (!e) { return {} }

        return {
            x: e.pageX - e.target.x,
            y: e.pageY - e.target.y
        }
    }

    static reqImageSize(url, handle) {
        let img = new Image()
        img.src = url
        if (img.complete) {
            if (handle) {
                handle({
                    w: img.width,
                    h: img.height
                })
            }
        } else {
            img.onload = () => {
                if (handle) {
                    handle({
                        w: img.width,
                        h: img.height
                    })
                }
            }
        }
    }

    static getRandomcolor(alpha = null) {
        let _r = Math.floor(Math.random() * 255)

        let _g = Math.floor(Math.random() * 255)

        let _b = Math.floor(Math.random() * 255)

        if (alpha) {
            return `rgba(${_r},${_g},${_b},${alpha})`
        } else {
            return `rgb(${_r},${_g},${_b})`
        }
    }

    static isIE() {
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            return true
        } else {
            return false
        }
    }

    static changedBankcardno(no) {
        return no.replace(/\s+/g, '').split('').map((_it, key) => {
            if ((key + 1) % 4 === 0) {
                return `${_it}&nbsp&nbsp`
            } else {
                return _it
            }
        }).join('')
    }

    static isOpenDebug() {
        return Number(this.getParameForURL('opendebug', window.location.href)) === 1
    }

    static reduceDimension(list) {
        let ret = []

        let change = (data) => {
            data.forEach((item) => {
                item instanceof Array ? change(item) : ret.push(item)
            })
        }

        change(list)

        return ret
    }

    static getScreenContHeight() {
        return this.getScreenSize().h - Config.Theme.toolbar.height
    }

    static getScreenSize() {
        return {
            w: window.document.body.clientWidth,
            h: window.document.body.clientHeight
        }
    }
}

export default Tool

export { ModalTool, RouterTool, Tool }
