import React from 'react';
import Emit from '../tool/EventBus';
import Frame from './Frame';

class BaseWindow extends React.Component {
    static _BASE_GLOBAL_THEME = './_BASE_GLOBAL_THEME/'

    _window = null

    _router = null

    _initPame = {}

    _indata = {}

    _broadcastData = {}

    constructor(props) {
        super(props)

        this._window = props.window

        this._router = props.router

        this._initPame = props.initPame

        this.onBroadcast = this.onBroadcast.bind(this)

        Emit.on(BaseWindow._BASE_GLOBAL_THEME, this.onBroadcast)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        Emit.remove(this.onBroadcast)
    }

    /**
     * @description: 用于路由时数据传递,启动方调用,接收方覆盖
     * @param {Object} data 数据对象
     */
    onData(data) {
        this._indata = data
    }

    /**
     * @description: 全局广播接收
     * @param {Object} data 事件对象
     */
    onBroadcast(data) {
        this._broadcastData = data
    }

    /**
     * @description: 在内置页面池内导航
     * @param {String} name 路径
     * @param {Function} handle 页面处理器
     */
    navigationActive(name, handle) {
        if (this._router instanceof Frame) {
            this._router.navigationActive(name, (comp) => {
                if (handle) { handle(comp) }
            })
        }
    }

    /**
     * @description: 意图页面导航
     * @param {Object} intent 意图对象 {
          component: null,
          path: null,
          opts: {props:{}}
     * } 
     * @param {Function} handle 页面处理器
     */
    startActive(intent, handle) {
        if (this._router instanceof Frame) {
            this._router.startActive(intent, handle)
        }
    }

    /**
     * @description: 在内置视窗池内导航
     * @param {String} name 路径
     * @param {Function} handle 视窗处理器
     */
    navigationWindow(name, handle) {
        if (this._router instanceof Frame) {
            this._router.navigationWindow(name, (comp) => {
                if (handle) { handle(comp) }
            })
        }
    }

    /**
     * @description: 意图视窗导航
     * @param {Object} intent 意图对象 {
          component: null,
          path: null,
          opts: {props:{}}
     * }
     * @param {Function} handle 视窗处理器 
     */
    startWindow(intent, handle) {
        if (this._router instanceof Frame) {
            this._router.startWindow(intent, handle)
        }
    }

    /**
     * @description: 关闭视窗并退栈
     */
    finish() {
        if (this._router instanceof Frame) {
            this._router.finishWindow(this._window)
        }
    }
}

export default BaseWindow
