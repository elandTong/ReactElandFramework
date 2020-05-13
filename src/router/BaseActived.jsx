import React from 'react';
import Emit from '../tool/EventBus';
import Actived from './Actived';
import Frame from './Frame';

class BaseActived extends React.Component {
    static _BASE_GLOBAL_THEME = './_BASE_GLOBAL_THEME/'

    _actived = null

    _router = null

    _initPame = {}

    _indata = {}

    _broadcastData = {}

    constructor(props) {
        super(props)

        this._actived = props.active

        this._router = props.router

        this._initPame = props.initPame

        this.onBroadcast = this.onBroadcast.bind(this)

        Emit.on(BaseActived._BASE_GLOBAL_THEME, this.onBroadcast)
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
     *  }
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
     *  }
     * @param {Function} handle 视窗处理器
     */
    startWindow(intent, handle) {
        if (this._router instanceof Frame) {
            this._router.startWindow(intent, handle)
        }
    }

    /**
     * @description: 判断active页面是否处于路由栈顶部
     * @param {Object} active 页面对象 或 CLASS
     * @return: boole
     */
    isStackTop(active) {
        if (this._router instanceof Frame) {
            return this._router.isActiveStackTop(active || this)
        }

        return false
    }

    /**
     * @description: 关闭页面并退栈
     */
    finish() {
        if (this._router instanceof Frame) {
            this._router.finishActive(this._actived)
        }
    }

    /**
     * @description: 在当前页面弹出一个已推送的窗口
     * @param {String} id 窗口ID 
     * @param {Object} pos 位置对象
     */
    showPopup(id, pos) {
        if (this._actived instanceof Actived) {
            this._actived.showPopup(id, pos)
        }
    }

    /**
     * @description: 关闭当前页面已弹出的窗口
     * @param {String} id 窗口ID
     */
    closePopup(id) {
        if (this._actived instanceof Actived) {
            this._actived.closePopup(id)
        }
    }

    /**
     * @description: 从当前页面中移除已推送窗口
     * @param {String} id 窗口ID
     */
    removePopup(id) {
        if (this._actived instanceof Actived) {
            this._actived.removePopup(id)
        }
    }

    /**
     * @description: 推送多个窗口到当前页面中
     * @param {Array} list 多个窗口列表
     */
    pushPopups(list) {
        if (this._actived instanceof Actived) {
            this._actived.pushPopups(list)
        }
    }

    /**
     * @description: 推送一个窗口到当前页面中
     * @param {Object} pame 指定窗口位置 
     * @param {React} comp 窗口组件
     */
    pushPopup(pame, comp) {
        if (this._actived instanceof Actived) {
            return this._actived.pushPopup(pame, comp)
        }

        return pame ? pame.id : null
    }
}

export default BaseActived
