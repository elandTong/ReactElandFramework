import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group/index';
import Tool from '../utils/Tool';
import BaseFrame from './BaseFrame';
import BaseModal from './BaseModal';
import BaseScreen from './BaseScreen';
import ModalFrame from './ModalFrame';
import ScreenFrame from './ScreenFrame';

/**
 * @description: 基础SPA路由框架,该框架是基于DOM结构的实时渲染控制路由!
 * @author: Eland.Tong
 */

class ScreenAnimation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        if (this.props.status === false) {
            return (this.props.children)
        } else {
            return (
                <CSSTransitionGroup transitionName={`${this.props.className || 'screen-router'}`}
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                    transitionAppear={true}
                    transitionAppearTimeout={200}>
                    {this.props.children}
                </CSSTransitionGroup>
            )
        }
    }
}

class ModalAnimation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        if (this.props.status === false) {
            return (this.props.children)
        } else {
            return (
                <CSSTransitionGroup transitionName={`${this.props.className || 'example'}`}
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                    transitionAppear={true}
                    transitionAppearTimeout={200}>
                    {this.props.children}
                </CSSTransitionGroup>
            )
        }
    }
}

class Frame extends BaseFrame {
    _param = {
        screens: [], modals: []
    }

    _keep_param = {
        screens: [], modals: []
    }

    _screenZIndex = 100

    _modalZIndex = 100

    __stack_temp = {
        screen: null,
        modal: null,
        compref: null,
        zIndex: 0,
        compHandle: null
    }

    /**
     * @description: 初始化框架基础
     * @param {Object} props 外部入口参数
     */
    constructor(props) {
        super(props)

        this.updateOptions()

        this.state = {
            index: {
                path: props.index
            },
            screenStack: [],
            modalStack: []
        }

        let _index = this.getScreenIntent(this.props.index)

        if (_index) { // 初始化页面
            this.state.screenStack.push(Object.assign({
                screen: null,
                compref: null,
                zIndex: ++this._screenZIndex,
                compHandle: (comp) => {
                    if (comp instanceof BaseScreen) {
                        comp.onResume()
                        comp.onData({
                            message: 'This data is constructed by the routing framework',
                            date: new Date().getTime()
                        })
                    }
                }
            }, _index))
        } else {
            console.error('Serious error! The homepage path you specified is not in the routing pool!')
        }
    }

    /**
     * @description: 更新 props 参数到本地 _param 对象 并过滤非法项
     */
    updateOptions() {
        this._param = Tool.structureAssignment(this._keep_param, this.props.param)

        // 过滤非法项
        this._param.screens = this._param.screens.filter((item) => {
            return Object.getPrototypeOf(item.component) === BaseScreen && !Tool.isEmpty(item.path)
        })

        this._param.modals = this._param.modals.filter((item) => {
            return Object.getPrototypeOf(item.component) === BaseModal && !Tool.isEmpty(item.path)
        })
    }

    /**
     * @description: 框架安装
     */
    componentDidMount() {
    }

    /**
     * @description: 框架卸载
     */
    componentWillUnmount() {
    }

    /**
     * @description: 退回首页
     * @param {Function} 内容组件回调
     */
    gohome(handle) {
        let _stack = this.state.screenStack

        _stack = _stack.filter((item) => {
            if (item.path === this.props.index) {
                item.compHandle = (comp) => {
                    if (comp instanceof BaseScreen) {
                        comp.onResume()
                    }

                    if (handle) { handle(comp) }
                }
                return true
            } else {
                if (item.compref instanceof BaseScreen) {
                    item.compref.onPause()
                }
                return false
            }
        })

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.screenStack = _stack

        this.setState({ screenStack: _stack })
    }

    /**
     * @description: screen页面退栈, router frame finish screen failure! You have to keep a page screen
     * @param {Object} screen BaseScreen 对象
     */
    finishScreen(screen) {
        if (screen == null || this.state.screenStack.length <= 1) { return }

        let _stack = this.state.screenStack

        let _last = _stack[_stack.length - 1]

        if (screen !== _last.screen) { return }

        if (_last.compref instanceof BaseScreen) {
            _last.compref.onPause()
        }

        _stack.splice(_stack.length - 1, 1)

        _last = _stack[_stack.length - 1]

        if (_last.compref instanceof BaseScreen) {
            _last.compref.onResume()
        }

        this.setState({ screenStack: _stack })
    }

    /**
     * @description: screen页面路由池导航
     * @param {String} path 路径
     * @param {Object} data 跳转数据
     * @param {Function} handle 内容组件处理器
     */
    navigationScreen(path, data, handle) {
        let _intent = this.getScreenIntent(path)

        if (_intent) {
            this.startScreen(_intent, data, handle)
        } else {
            console.error('No corresponding entry found in screen routing pool!')
        }
    }

    /**
     * @description: 意图启动screen页面
     * @param {Object} intent 意图对象
     * @param {Object} data 跳转数据
     * @param {Function} handle 内容组件处理器
     */
    startScreen(intent = {
        component: null,
        path: null,
        options: { props: {} }
    }, data, handle) {
        if (!intent || !intent.component
            || Object.getPrototypeOf(intent.component) !== BaseScreen
            || Tool.isEmpty(intent.path)) {
            console.error('router frame start screen error please check the configuration parameters!')

            return
        }

        if (intent.path === this.props.index) { // 如果导航到首页则退栈
            this.gohome(handle)
            return
        }

        let _stack = this.state.screenStack

        if (_stack.length > 0) {
            let _last = _stack[_stack.length - 1]

            if (_last.path === intent.path) {
                return
            }

            if (_last.compref instanceof BaseScreen) {
                _last.pauseHandle = null

                _last.compref.onPause()
            } else {
                _last.pauseHandle = function (comp) { // 消耗处理器
                    if (comp instanceof BaseScreen) {
                        comp.onPause()
                    }
                }
            }
        }

        _stack = _stack.filter((_it) => { return !(_it.path === intent.path) }) // 过滤重复项

        _stack.push(Object.assign({
            screen: null,
            compref: null,
            zIndex: ++this._screenZIndex,
            pauseHandle: null,
            compHandle: function (comp) {
                if (comp instanceof BaseScreen) {
                    comp.onResume()

                    comp.onData(data || {})
                }

                if (this.pauseHandle) {
                    this.pauseHandle(comp) // 执行暂停处理器
                }
                this.pauseHandle = null

                if (handle) { handle(comp) }
            }
        }, intent))

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.screenStack = _stack

        this.setState({ screenStack: _stack })
    }

    /**
     * @description: 获取screen页面内容组件对象
     * @param {String} path 路径 
     * @return: 内容组件对象
     */
    getScreen(path) {
        for (let it of this._param.screens) {
            if (it.path === path) { return it.compref }
        }

        return null
    }

    /**
     * @description: 在screen页面路由池内获取意图
     * @param {String} path 路径 
     * @return: 意图对象
     */
    getScreenIntent(path) {
        for (let item of this._param.screens) {
            if (item.path === path) {
                return item
            }
        }
        return null
    }

    /**
     * @description: 判断screen页面是否处于栈顶
     * @param {Object} screen BaseScreen对象 或 CLASS 
     * @return: boole
     */
    isScreenStackTop(screen) {
        if (this.state.screenStack.length < 1) {
            return false
        }

        let _top = this.state.screenStack[this.state.screenStack.length - 1]

        if (screen instanceof _top.component || screen === _top.component) {
            return true
        }

        return false
    }

    /**
     * @description: modal视窗退栈
     * @param {Object} modal BaseModal对象
     */
    finishModal(modal) {
        if (modal == null || this.state.modalStack.length < 1) { return }

        let _stack = this.state.modalStack

        let _last = _stack[_stack.length - 1]

        if (modal !== _last.modal) { return }

        if (_last.compref instanceof BaseModal) {
            _last.compref.onPause()
        }

        _stack.splice(_stack.length - 1, 1)

        if (_stack.length > 0) {
            _last = _stack[_stack.length - 1]

            if (_last.compref instanceof BaseModal) {
                _last.compref.onResume()
            }
        }

        this.setState({ modalStack: _stack })
    }

    /**
     * @description: 在modal路由池内导航
     * @param {String} path 路径
     * @param {Object} data 跳转数据
     * @param {Function} handle 内容组件处理器
     */
    navigationModal(path, data, handle) {
        let _intent = this.getModalIntent(path)

        if (_intent) {
            this.startModal(_intent, data, handle)
        } else {
            console.error('No corresponding entry found in modal routing pool!')
        }
    }

    /**
     * @description: 意图启动modal视窗
     * @param {Object} intent 意图对象
     * @param {Object} data 跳转数据
     * @param {Function} handle 内容组件处理器
     */
    startModal(intent = {
        component: null,
        path: null,
        options: { props: {} }
    }, data, handle) {
        if (!intent || !intent.component
            || Object.getPrototypeOf(intent.component) !== BaseModal
            || Tool.isEmpty(intent.path)) {
            console.error('router frame start modal error please check the configuration parameters!')

            return
        }

        let _stack = this.state.modalStack

        if (_stack.length > 0) {
            let _last = _stack[_stack.length - 1]

            if (_last.path === intent.path) {
                return
            }

            if (_last.compref instanceof BaseModal) {
                _last.pauseHandle = null

                _last.compref.onPause()
            } else {
                _last.pauseHandle = function (comp) { // 消耗处理器
                    if (comp instanceof BaseModal) {
                        comp.onPause()
                    }
                }
            }
        }

        _stack = _stack.filter((_it) => { return !(_it.path === intent.path) }) // 过滤重复项

        _stack.push(Object.assign({
            modal: null,
            compref: null,
            zIndex: ++this._modalZIndex,
            pauseHandle: null,
            compHandle: function (comp) {
                if (comp instanceof BaseModal) {
                    comp.onResume()

                    comp.onData(data || {})
                }

                if (this.pauseHandle) {
                    this.pauseHandle(comp) // 执行暂停处理器
                }
                this.pauseHandle = null

                if (handle) { handle(comp) }
            }
        }, intent))

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.modalStack = _stack

        this.setState({ modalStack: _stack })
    }

    /**
     * @description: 获取modal视窗内容组件对象
     * @param {String} path 路径 
     * @return: 内容组件对象
     */
    getModal(path) {
        for (let it of this._param.modals) {
            if (it.path === path) { return it.compref }
        }

        return null
    }

    /**
     * @description: 在modal视窗路由池内获取意图
     * @param {String} path 路径 
     * @return: modal视窗意图
     */
    getModalIntent(path) {
        for (let item of this._param.modals) {
            if (item.path === path) {
                return item
            }
        }
        return null
    }

    /**
     * @description: 判断modal视窗是否处于栈顶
     * @param {Object} modal modal 视图对象 或 CLASS 
     * @return: boole
     */
    isModalStackTop(modal) {
        if (this.state.modalStack.length < 1) {
            return false
        }

        let _top = this.state.modalStack[this.state.modalStack.length - 1]

        if (modal instanceof _top.component || modal === _top.component) {
            return true
        }

        return false
    }

    /**
     * @description: 框架开始渲染
     * @return: JSX
     */
    render() {
        this.updateOptions()

        let screens = this.state.screenStack.filter((item) => { return item.component ? true : false }).map((item, key) => {
            return (
                <ScreenFrame key={key} router={this}
                    component={item.component}
                    initPame={item.options.props}
                    zIndex={item.zIndex}
                    compHandle={(comp) => {
                        item.compref = comp
                        if (item.compHandle) {
                            item.compHandle(comp)
                        }
                        item.compHandle = null
                    }}
                    ref={(comp) => {
                        item.screen = comp
                    }} />
            )
        })
        let modals = this.state.modalStack.filter((item) => { return item.component ? true : false }).map((item, key) => {
            return (
                <ModalFrame key={key} router={this}
                    component={item.component}
                    initPame={item.options.props}
                    zIndex={item.zIndex}
                    compHandle={(comp) => {
                        item.compref = comp
                        if (item.compHandle) {
                            item.compHandle(comp)
                        }
                        item.compHandle = null
                    }}
                    ref={(comp) => {
                        item.modal = comp
                    }} />
            )
        })

        return (
            <div className={'app'}>
                {/* screen stack */}
                <div className={'page-screen-root'}>
                    <div className={'page-screen-view'}>
                        <ScreenAnimation className={this.props.classNameScreenAnimation}>
                            {screens}
                        </ScreenAnimation>
                    </div>
                </div>

                {/* modal stack */}
                <div className={'page-modal-root'}>
                    <div className={'page-modal-view'}>
                        <ModalAnimation className={this.props.classNameModalAnimation}>
                            {modals}
                        </ModalAnimation>
                    </div>
                </div>
            </div>
        )
    }
}

export default Frame
