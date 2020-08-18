import React from 'react';
import APPContext from '../APPContext';
import Config from '../Config';
import Emit from '../utils/EventBus';
import BaseFrame from './BaseFrame';
import ScreenFrame from './ScreenFrame';

/**
 * @description: 基础screen活动页面抽象类,覆盖该类方法时必须要调用父类方法
 * @author: Eland.Tong
 */

class BaseScreen extends React.Component {
    _screenFrame = null

    _router = null

    _initPame = {}

    _indata = {}

    _broadcastData = {}

    constructor(props) {
        super(props)
        this.renderContent = this.renderContent.bind(this)
        this.onBroadcast = this.onBroadcast.bind(this)
        this._screenFrame = this.props.screen
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
        console.warn('base screen on create!')
    }

    /**
     * @description: 组件安装回调
     */
    onStart() {
        console.warn('base screen on start!')
    }

    /**
     * @description: 组件恢复回调
     */
    onResume() {
        console.warn('base screen on resume!')
    }

    /**
     * @description: 组件暂停回调
     */
    onPause() {
        console.warn('base screen on pause!')
    }

    /**
     * @description: 组件卸载回调
     */
    onStop() {
        console.warn('base screen on stop!')
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
                this.onAppThemeChange(data.name, data)
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
        console.warn('base screen notice event!')
    }

    /**
     * @description: app主题变更回调
     * @param {String} name 主题名称
     * @param {Object} event 广播事件对象
     */
    onAppThemeChange(name, event) {
        console.warn('base screen app theme change event!')
    }

    /**
     * @description: 原生返回事件,需要原生提供支持
     * @param {Boolean} isStacktop 当前screen页面是否处于路由栈顶
     * @param {Object} event 广播事件对象
     */
    onNativeBack(isStacktop, event) {
        console.warn('base screen native back event!')
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
          opts: {props:{}}
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
          opts: {props:{}}
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
     * @description: 是否处于screen页面栈顶
     * @param {Object} screen 页面对象 或 CLASS
     * @return: boole
     */
    isStackTop(screen) {
        if (this._router instanceof BaseFrame) {
            return this._router.isScreenStackTop(screen || this)
        }
        return false
    }

    /**
     * @description: 关闭页面并退栈
     */
    finish() {
        if (this._router instanceof BaseFrame) {
            this._router.finishScreen(this._screenFrame)
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

    /**
     * @description: 在当前页面弹出一个已推送的窗口
     * @param {String} id 窗口ID 
     * @param {Object} pos 位置对象 
     */
    showPopup(id, pos) {
        if (this._screenFrame instanceof ScreenFrame) {
            this._screenFrame.showPopup(id, pos)
        }
    }

    /**
     * @description: 关闭当前页面已弹出的窗口
     * @param {String} id 窗口ID
     */
    closePopup(id) {
        if (this._screenFrame instanceof ScreenFrame) {
            this._screenFrame.closePopup(id)
        }
    }

    /**
     * @description: 从当前页面中移除已推送窗口
     * @param {String} id 窗口ID
     */
    removePopup(id) {
        if (this._screenFrame instanceof ScreenFrame) {
            this._screenFrame.removePopup(id)
        }
    }

    /**
     * @description: 推送多个窗口到当前页面中
     * @param {Array} list 多个窗口列表
     */
    pushPopups(list) {
        if (this._screenFrame instanceof ScreenFrame) {
            this._screenFrame.pushPopups(list)
        }
    }

    /**
     * @description: 推送一个窗口到当前页面中
     * @param {Object} pame 指定窗口位置 
     * @param {React} comp 窗口组件
     */
    pushPopup(pame, comp) {
        if (this._screenFrame instanceof ScreenFrame) {
            return this._screenFrame.pushPopup(pame, comp)
        }

        return pame ? pame.id : null
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

export default BaseScreen
