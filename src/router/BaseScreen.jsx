import PropTypes from 'prop-types';
import React from 'react';
import APPContext from '../APPContext';
import Config from '../Config';
import Emit from '../utils/EventBus';
import BaseFrame from './BaseFrame';

/**
 * @description: 基础screen活动页面抽象类,覆盖该类方法时必须要调用父类方法
 * @author: Eland.Tong
 */

class BaseScreen extends React.Component {
    static propTypes = {
        router: PropTypes.object,
        intentData: PropTypes.object
    }

    static defaultProps = {
        router: {}, intentData: {}
    }

    static _path = null

    constructor(props) {
        super(props)
        this.renderContent = this.renderContent.bind(this)
        this.onBroadcast = this.onBroadcast.bind(this)
        Emit.on(Config.GLOBAL_EVENT, this.onBroadcast)
    }

    componentWillMount() {
        this.onCreate()
    }

    componentDidMount() {
        this.onStart()
    }

    componentWillUnmount() {
        Emit.remove(this.onBroadcast)

        this.onStop()
    }

    updateIntentData(data) {
        if (this.props.router instanceof BaseFrame) {
            this.props.router.updataScreenIntentData(this, data)
        }
    }

    // ------ 生命周期回调方法 ------

    /**
     * @description: 组件创建回调
     * @param {Object} props 外部入口参数
     */
    onCreate() { }

    /**
     * @description: 组件安装回调
     */
    onStart() { }

    /**
     * @description: 组件恢复回调
     */
    onResume() { }

    /**
     * @description: 组件暂停回调
     */
    onPause() { }

    /**
     * @description: 组件卸载回调
     */
    onStop() { }

    // ------ 生命周期回调方法 ------

    /**
     * @description: 完整的界面呈现
     */
    onComplete() { }

    /**
     * @description: 全局广播接收回调
     * 覆盖警告<!!不建议覆盖该方法 请覆盖它的分支方法!!>: 子类覆盖该方法 必须调用 父类该方法以保证基础广播正常接收
     * @param {Object} data 事件对象
     */
    onBroadcast(data = {}) {
        switch (data.type) {
            case Config.GLOBAL_EVENT_TYPE.NATIVE_BACK: { // 原生返回按钮点击
                this.onNativeBack(this.isStackTop(), data)
                break
            }
            case Config.GLOBAL_EVENT_TYPE.THEME_CHANGE: { // 主题变更
                this.onThemeChange(data)
                break
            }
            case Config.GLOBAL_EVENT_TYPE.LANGUAG_CHANGE: { // 语言变更
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
     * @param {Object} data 广播事件对象
     */
    onNotice(data) { }

    /**
     * @description: 主题变更
     * @param {Object} data 广播事件对象
     */
    onThemeChange(data) { }

    /**
     * @description: 语言变更
     * @param {Object} data 广播事件对象
     */
    onLanguagChange(data) { }

    /**
     * @description: 原生返回事件,需要原生提供支持
     * @param {Boolean} isStacktop 当前screen页面是否处于路由栈顶
     * @param {Object} data 广播事件对象
     */
    onNativeBack(isStacktop, data) {
        if (isStacktop) { this.finish() }
    }

    /**
     * @description: 在内置页面池内导航
     * @param {String} name 路径
     * @param {Object} data 跳转数据
     * @param {Function} handle 页面处理器
     */
    navigationScreen(name, data, handle) {
        if (this.props.router instanceof BaseFrame) {
            this.props.router.navigationScreen(name, data, handle)
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
        if (this.props.router instanceof BaseFrame) {
            this.props.router.startScreen(intent, data, handle)
        }
    }

    /**
     * @description: 在内置视窗池内导航
     * @param {String} name 路径
     * @param {Object} data 跳转数据
     * @param {Function} handle 视窗处理器
     */
    navigationModal(name, data, handle) {
        if (this.props.router instanceof BaseFrame) {
            this.props.router.navigationModal(name, data, handle)
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
        if (this.props.router instanceof BaseFrame) {
            this.props.router.startModal(intent, data, handle)
        }
    }

    /**
     * @description: 是否处于screen页面栈顶
     * @param {Object} screen 页面对象 或 CLASS
     * @return: boole
     */
    isStackTop(screen) {
        if (this.props.router instanceof BaseFrame) {
            return this.props.router.isScreenStackTop(screen || this)
        }
        return false
    }

    /**
     * @description: 关闭页面并退栈
     */
    finish() {
        if (this.props.router instanceof BaseFrame) {
            this.props.router.finishScreen(this)
        }
    }

    /**
     * @description: 发送全局广播
     * @param {Object} data 广播事件对象
     * @return: bool 是否成功
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

export default BaseScreen
