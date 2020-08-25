import React from 'react';
import APPContext from '../APPContext';
import Config from '../Config';
import Emit from '../utils/EventBus';
import BaseFrame from './BaseFrame';

/**
 * @description: 基础modal视窗页面抽象类,覆盖该类方法时必须要调用父类方法
 * @author: Eland.Tong
 */

class BaseModal extends React.Component {
    _modalFrame = null

    _router = null

    _initPame = {}

    _indata = {}

    _broadcastData = {}

    constructor(props) {
        super(props)
        this.renderContent = this.renderContent.bind(this)
        this.onBroadcast = this.onBroadcast.bind(this)
        this._modalFrame = this.props.modal
        this._router = this.props.router
        this._initPame = this.props.initPame
        Emit.on(Config.GLOBAL_EVENT, this.onBroadcast)
        this.onCreate()
    }

    componentDidMount() {
        this.onStart()
    }

    componentWillUnmount() {
        Emit.remove(this.onBroadcast)

        this.onStop()
    }

    // ------ 生命周期回调方法 ------

    /**
     * @description: 组件创建回调
     */
    onCreate() {
        console.warn('base modal on create!')
    }

    /**
     * @description: 组件安装回调
     */
    onStart() {
        console.warn('base modal on start!')
    }

    /**
     * @description: 组件恢复回调
     */
    onResume() {
        console.warn('base modal on resume!')
    }

    /**
     * @description: 组件暂停回调
     */
    onPause() {
        console.warn('base modal on pause!')
    }

    /**
     * @description: 组件卸载回调
     */
    onStop() {
        console.warn('base modal on stop!')
    }

    // ------ 生命周期回调方法 ------

    /**
     * @description: 用于路由时数据传递,启动方调用,接收方覆盖
     * @param {Object} data 数据对象
     */
    onData(data) {
        this._indata = data
    }

    /**
     * @description: 全局广播接收回调
     * 覆盖警告<!不建议子类覆盖该方法,请覆盖广播分支方法!>: 子类覆盖该方法 必须调用 父类该方法 以保证广播接收正常
     * @param {Object} data 事件对象
     */
    onBroadcast(data = {}) {
        this._broadcastData = data
        switch (data.type) {
            case Config.GLOBAL_EVENT_TYPE.NATIVE_BACK_EVENT: { // 原生返回按钮点击广播
                this.onNativeBack(this.isStackTop(), data)
                break
            }
            case Config.GLOBAL_EVENT_TYPE.STYLE_THEME_CHANGE: { // 主题变更广播
                this.onThemeChange(data)
                break
            }
            case Config.GLOBAL_EVENT_TYPE.LANGUAG_CHANGE: {
                this.onLanguagChange(data)
                break
            }
            default: { // 普通广播
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
        console.warn('base modal notice event!')
    }

    /**
     * @description: 主题变更
     * @param {Object} event 广播事件对象
     */
    onThemeChange(event) {
        console.warn('base modal app theme change event!')
    }

    /**
     * @description: 语言变更
     * @param {Object} event 广播事件对象
     */
    onLanguagChange(event) {
        console.warn('base modal app language change event!')
    }

    /**
     * @description: 原生返回事件,需要原生提供支持
     * @param {Boolean} isStacktop 当前modal页面是否处于路由栈顶
     * @param {Object} event 广播事件对象
     */
    onNativeBack(isStacktop, event) {
        console.warn('base modal native back event!')
    }

    /**
     * @description: 在内置页面池内导航
     * @param {String} name 路径
     * @param {Object} data 跳转数据
     * @param {Function} handle 页面处理器
     */
    navigationScreen(name, data, handle) {
        if (this._router instanceof BaseFrame) {
            this._router.navigationScreen(name, data, handle)
        }
    }

    /**
     * @description: 意图页面导航
     * @param {Object} intent 意图对象 {
          component: null,
          path: null,
          options: {props:{}}
     * }
     * @param {Object} data 跳转数据
     * @param {Function} handle 页面处理器
     */
    startScreen(intent, data, handle) {
        if (this._router instanceof BaseFrame) {
            this._router.startScreen(intent, data, handle)
        }
    }

    /**
     * @description: 在内置视窗池内导航
     * @param {String} name 路径
     * @param {Object} data 跳转数据
     * @param {Function} handle 视窗处理器
     */
    navigationModal(name, data, handle) {
        if (this._router instanceof BaseFrame) {
            this._router.navigationModal(name, data, handle)
        }
    }

    /**
     * @description: 意图视窗导航
     * @param {Object} intent 意图对象 {
          component: null,
          path: null,
          options: {props:{}}
     * } 
     * @param {Object} data 跳转数据
     * @param {Function} handle 视窗处理器
     */
    startModal(intent, data, handle) {
        if (this._router instanceof BaseFrame) {
            this._router.startModal(intent, data, handle)
        }
    }

    /**
     * @description: 判断modal视窗是否处于路由栈顶部
     * @param {Object} modal 视窗对象 或 CLASS 
     * @return: boole
     */
    isStackTop(modal) {
        if (this._router instanceof BaseFrame) {
            return this._router.isModalStackTop(modal || this)
        }
        return false
    }

    /**
     * @description: 关闭视窗并退栈
     */
    finish() {
        if (this._router instanceof BaseFrame) {
            this._router.finishModal(this._modalFrame)
        }
    }

    /**
     * @description: 发送广播
     * @param {Object} data 广播对象
     * @return: bool 是否发送成功
     */
    sendBroadcast(data) {
        return Emit.exe(Object.assign(data, {
            theme: Config.GLOBAL_EVENT
        }))
    }

    renderContent({ theme, language, getapp }) {
        return null
    }

    render() {
        return (
            <APPContext.Consumer>
                {this.renderContent}
            </APPContext.Consumer>
        )
    }
}

export default BaseModal
