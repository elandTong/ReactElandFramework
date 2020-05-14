import React from 'react';
import Config from '../config';
import Emit from '../tool/EventBus';
import Frame from './Frame';

class BaseWindow extends React.Component {
    static _BASE_GLOBAL_THEME = Config.GLOBAL_EVENT

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

        this.onCreate(props)
    }

    componentDidMount() {
        this.onStart()
    }

    componentWillUnmount() {
        Emit.remove(this.onBroadcast)

        this.onStop()
    }

    /**
     * @description: 组件创建回调
     * @param {Object} props 外部入口参数
     */
    onCreate(props) {
        console.warn('base window on create!')
    }

    /**
     * @description: 组件安装回调
     */
    onStart() {
        console.warn('base window on start!')
    }

    /**
     * @description: 组件恢复回调
     */
    onResume() {
        console.warn('base window on resume!')
    }

    /**
     * @description: 组件暂停回调
     */
    onPause() {
        console.warn('base window on pause!')
    }

    /**
     * @description: 组件卸载回调
     */
    onStop() {
        console.warn('base window on stop!')
    }

    /**
     * @description: 用于路由时数据传递,启动方调用,接收方覆盖
     * @param {Object} data 数据对象
     */
    onData(data) {
        this._indata = data
    }

    /**
     * @description: 全局广播接收, 覆盖警告: 子类覆盖该方法 必须调用 父类该方法
     * @param {Object} data 事件对象
     */
    onBroadcast(data = {}) {
        this._broadcastData = data

        switch (data.type) {
            case Config.GLOBAL_EVENT_TYPE.NATIVE_BACK_EVENT: {
                this.onNativeBack(data)
                break
            }
            case Config.GLOBAL_EVENT_TYPE.STYLE_THEME_CHANGE: {
                this.onAppThemeChange(data.name, data)
                break
            }
            default: {
                this.onNotice(data)
                break
            }
        }
    }

    /**
     * @description: 普通全局事件通知
     * @param {Object} event 广播事件对象
     */
    onNotice(event) {
        console.warn('base window notice event!')
    }

    /**
     * @description: app主题变更回调
     * @param {String} name 主题名称
     * @param {Object} event 广播事件对象
     */
    onAppThemeChange(name, event) {
        console.warn('base window app theme change event!')
    }

    /**
     * @description: 在内置页面池内导航
     * @param {String} name 路径
     * @param {Object} data 跳转数据
     * @param {Function} handle 页面处理器
     */
    navigationActive(name, data, handle) {
        if (this._router instanceof Frame) {
            this._router.navigationActive(name, data, handle)
        }
    }

    /**
     * @description: 意图页面导航
     * @param {Object} intent 意图对象 {
          component: null,
          path: null,
          opts: {props:{}}
     * }
     * @param {Object} data 跳转数据
     * @param {Function} handle 页面处理器
     */
    startActive(intent, data, handle) {
        if (this._router instanceof Frame) {
            this._router.startActive(intent, data, handle)
        }
    }

    /**
     * @description: 在内置视窗池内导航
     * @param {String} name 路径
     * @param {Object} data 跳转数据
     * @param {Function} handle 视窗处理器
     */
    navigationWindow(name, data, handle) {
        if (this._router instanceof Frame) {
            this._router.navigationWindow(name, data, handle)
        }
    }

    /**
     * @description: 意图视窗导航
     * @param {Object} intent 意图对象 {
          component: null,
          path: null,
          opts: {props:{}}
     * } 
     * @param {Object} data 跳转数据
     * @param {Function} handle 视窗处理器
     */
    startWindow(intent, data, handle) {
        if (this._router instanceof Frame) {
            this._router.startWindow(intent, data, handle)
        }
    }

    /**
     * @description: 判断window视窗是否处于路由栈顶部
     * @param {Object} window 视窗对象 或 CLASS 
     * @return: boole
     */
    isStackTop(window) {
        if (this._router instanceof Frame) {
            return this._router.isWindowStackTop(window || this)
        }
        return false
    }

    /**
     * @description: 关闭视窗并退栈
     */
    finish() {
        if (this._router instanceof Frame) {
            this._router.finishWindow(this._window)
        }
    }

    /**
     * @description: 原生返回事件,需要原生提供支持
     * @param {Object} event 广播事件对象
     */
    onNativeBack(event) {
        console.warn('base window native back event!')
    }
}

export default BaseWindow
