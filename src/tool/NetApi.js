import Tool from "./Tool"

class Carrier {
    api = null

    pame = null

    errorHandle = null

    succHandle = null

    mode = 0 // start 模式 0 : call 1 : sub

    isStart = false

    uuid = null // 请求唯一标识

    // 以下参数在 NetApi.netmode 为 0(http) 模式时才有效
    inter = null

    interTimes = 5000

    pollsize = 0

    pollHandle = null

    constructor(_api, _pame) {
        this.uuid = Tool.uuid()

        this.mode = 0

        this.interTimes = 5000

        this.isStart = false

        this.api = _api

        this.pame = _pame
    }

    onerror(handle) {
        this.errorHandle = handle
        return this
    }

    onsuccess(handle) {
        this.succHandle = handle
        return this
    }

    onpoll(handle) {
        this.pollHandle = handle
        return this
    }

    setmode(_mode = 0) {
        this.mode = _mode
        return this
    }

    setpolltimes(times = 5000) {
        this.interTimes = times
        return this
    }

    uppollsize() {
        return ++this.pollsize
    }

    start() {
        if (this.isStart) {
            return this
        } else {
            this.isStart = true

            NetApi.run(this)

            return this
        }
    }
}

class NetApi {
    static netmode = 0 // 0 : http mode 1: wss mode

    static wsocke = null

    // 以下两个队列只对 wss 模式有效
    static callqueue = [] // 呼叫队列

    static subqueue = [] // 订阅队列

    static monitor = { // 可对所有请求 预处理 以及 结果处理
        onhttppre: null, // http 请求前处理
        onhttpresult: null, // http 请求结果处理
        onwsspre: null, // wss 请求前处理
        onwssresult: null // wss 推送处理
    }

    static create(_monitor) {
        this.monitor = Object.assign(this.monitor, _monitor)

        if (this.wsocke instanceof WebSocket) {
            this.wsocke.close()
        }

        this.wsocke = null

        this.netmode = 0 // http 模式

        this.callqueue = []

        this.subqueue = []

        return this
    }

    static httpmode() {
        this.netmode = 0 // http 模式

        return this
    }

    static wssmode(pame = {
        address: null,
        onopen: null,
        onmessage: null,
        onclose: null,
        onerror: null
    }) {
        let _wsocke = new WebSocket(pame.address)

        _wsocke.onopen = () => { // 连接建立
            this.wsocke = _wsocke

            this.netmode = 1 // wss 模式

            if (pame.onopen) {
                pame.onopen()
            }
        }

        _wsocke.onmessage = (obj) => { // 消息推送
            let data = JSON.parse(obj.data)

            if (this.monitor.onwssresult) {
                data = this.monitor.onwssresult(data) || data
            }

            if (pame.onmessage) {
                pame.onmessage(data)
            }

            this.callqueue = this.callqueue.filter((item, key) => { // 呼叫队列
                if (item instanceof Carrier && item.api === data.command) {
                    if (item.succHandle) {
                        item.succHandle(data.data)
                    }

                    return false
                }

                return true
            })

            this.subqueue.map((item, key) => { // 订阅队列
                if (item instanceof Carrier && item.api === data.command) {
                    if (item.succHandle) {
                        item.succHandle(data.data)
                    }
                }

                return item
            })

            console.log('web socket onmessage', data)
        }

        _wsocke.onclose = () => { // 连接关闭
            this.netmode = 0

            this.callqueue.map((item, key) => {
                if (item instanceof Carrier) {
                    if (item.errorHandle) {
                        item.errorHandle({ message: 'wss close' })
                    }
                }
                return item
            })

            this.callqueue = []

            if (pame.onclose) {
                pame.onclose()
            }

            console.log('web socket connect close')
        }

        _wsocke.onerror = (e) => { // 连接失败
            this.netmode = 0

            this.callqueue.map((item, key) => {
                if (item instanceof Carrier) {
                    if (item.errorHandle) {
                        item.errorHandle(e)
                    }
                }
                return item
            })

            this.callqueue = []

            if (pame.onerror) {
                pame.onerror(e)
            }

            console.log('web socket error', e)
        }

        return this
    }

    static call(api, pame, succHandle, errorHandle) {
        let _carr = new Carrier(api, pame)
            .onsuccess(succHandle)
            .onerror(errorHandle)
            .setmode(0)

        if (this.netmode === 1) { // 只有wss模式才推送入队列
            this.callqueue.push(_carr)
        }

        _carr.start()

        return _carr
    }

    static sub(api, pame, succHandle, errorHandle, pollHandle, times = 5000) { // 最后两个参数在 http 模式下有效
        let _carr = new Carrier(api, pame)
            .onsuccess(succHandle)
            .onerror(errorHandle)
            .onpoll(pollHandle)
            .setpolltimes(times)
            .setmode(1)

        if (this.netmode === 1) { // 只有wss模式才推送入队列
            this.subqueue.push(_carr)
        }

        _carr.start()

        return _carr
    }

    static post(carrier) { // http 请求
        if (this.monitor.onhttppre) { // 预处理
            carrier = this.monitor.onhttppre(carrier) || carrier
        }

        if (carrier instanceof Carrier) {
            Tool.postRequest(carrier.api, carrier.pame, (data) => {
                let _result = data

                if (this.monitor.onhttpresult) {
                    _result = this.monitor.onhttpresult(carrier, data) || data
                }

                if (carrier.succHandle) {
                    carrier.succHandle(_result)
                }
            }, (err) => {
                if (carrier.errorHandle) {
                    carrier.errorHandle(err)
                }
            })
        } else {
            console.error('net api post error for carrier illegal')
        }
    }

    static send(carrier) { // wss 请求
        if (this.monitor.onwsspre) { // 预处理
            carrier = this.monitor.onwsspre(carrier) || carrier
        }

        if (carrier instanceof Carrier && this.wsocke instanceof WebSocket) {
            try {
                this.wsocke.send(JSON.stringify({
                    command: carrier.api,
                    data: carrier.pame
                }))
                return true
            } catch (e) {
                return false
            }
        } else {
            console.error('net api send error for carrier or wsocke illegal')

            return false
        }
    }

    static submithtp(carrier) {
        if (carrier instanceof Carrier) {
            if (carrier.mode === 0) { // call 呼叫
                this.post(carrier)
            } else { // sub 订阅
                carrier.inter = window.setInterval(() => {
                    let _size = carrier.uppollsize()

                    if (carrier.pollHandle && carrier.pollHandle(_size) === false) { // 轮询前确认
                        window.clearInterval(carrier.inter)
                    } else { // 确认可执行
                        this.post(carrier)
                    }
                }, carrier.interTimes)
            }
        } else {
            console.error('net api submithtp error for carrier illegal')
        }
    }

    static submitwss(carrier) {
        if (this.monitor.onwsspre) { // 预处理
            carrier = this.monitor.onwsspre(carrier) || carrier
        }

        if (carrier instanceof Carrier) {
            let _remove = () => { // send 失败则从 呼叫队列 中移除
                if (carrier.mode === 0) { // call 呼叫
                    this.callqueue = this.callqueue.filter((item, key) => {
                        if (item instanceof Carrier && item.uuid === carrier.uuid) {
                            return false
                        }

                        return true
                    })
                } else { // sub 订阅
                }
            }

            if (this.wsocke instanceof WebSocket) {  // 对象已建立
                try {
                    this.wsocke.send(JSON.stringify({
                        command: carrier.api,
                        data: carrier.pame
                    }))
                } catch (e) {
                    if (carrier.errorHandle) {
                        carrier.errorHandle(e)
                    }

                    _remove()
                }
            } else {
                if (carrier.errorHandle) {
                    carrier.errorHandle({ message: 'websocket not connected' })
                }

                _remove()
            }
        } else {
            console.error('net api submitwss error for carrier illegal')
        }
    }

    static run(carrier) {
        if (carrier instanceof Carrier) {
            if (this.netmode === 0) { // http 模式
                this.submithtp(carrier)
            } else { // wss 模式
                this.submitwss(carrier)
            }
        } else {
            console.error('net api run error for carrier illegal')
        }
    }
}

export default NetApi
