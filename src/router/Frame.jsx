import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group/index';
import Tool from '../tool/Tool';
import Actived from './Actived';
import BaseActived from './BaseActived';
import BaseWindow from './BaseWindow';
import Window from './Window';

/**
 * @description: 基础SPA路由框架,该框架是基于DOM结构的实时渲染控制路由,
 * @author: Eland.Tong
 */

class ActivedAnimation extends React.Component {
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
                <CSSTransitionGroup transitionName={`${this.props.className || 'active-router'}`}
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

class WindowAnimation extends React.Component {
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

class Frame extends React.Component {
    _param = {
        actives: [],
        windows: []
    }

    _keep_param = {
        actives: [],
        windows: []
    }

    _activeZIndex = 100

    _windowZIndex = 100

    __stack_temp = {
        active: null,
        window: null,
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

        this.updateOpts()

        this.state = {
            index: {
                path: props.index
            },
            activeStack: [],
            windowStack: []
        }

        let _index = this.getActiveIntent(this.props.index)

        if (_index) { // 初始化页面
            this.state.activeStack.push(Object.assign({
                active: null,
                compref: null,
                zIndex: ++this._activeZIndex,
                compHandle: (comp) => {
                    if (comp instanceof BaseActived) {
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
    updateOpts() {
        this._param = Tool.structureAssignment(Object.assign({}, this._keep_param), this.props.param)

        // 过滤非法项
        this._param.actives = this._param.actives.filter((item) => {
            return Object.getPrototypeOf(item.component) === BaseActived && !Tool.isEmpty(item.path)
        })

        this._param.windows = this._param.windows.filter((item) => {
            return Object.getPrototypeOf(item.component) === BaseWindow && !Tool.isEmpty(item.path)
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
        let _stack = this.state.activeStack

        _stack = _stack.filter((item) => {
            if (item.path === this.props.index) {
                item.compHandle = (comp) => {
                    if (comp instanceof BaseActived) {
                        comp.onResume()
                    }

                    if (handle) { handle(comp) }
                }
                return true
            } else {
                if (item.compref instanceof BaseActived) {
                    item.compref.onPause()
                }
                return false
            }
        })

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.activeStack = _stack

        this.setState({ activeStack: _stack })
    }

    /**
     * @description: active页面退栈, router frame finish active failure! You have to keep a page active
     * @param {Object} active BaseActive 对象
     */
    finishActive(active) {
        if (active == null || this.state.activeStack.length <= 1) { return }

        let _stack = this.state.activeStack

        let _last = _stack[_stack.length - 1]

        if (active !== _last.active) { return }

        if (_last.compref instanceof BaseActived) {
            _last.compref.onPause()
        }

        _stack.splice(_stack.length - 1, 1)

        _last = _stack[_stack.length - 1]

        if (_last.compref instanceof BaseActived) {
            _last.compref.onResume()
        }

        this.setState({ activeStack: _stack })
    }

    /**
     * @description: active页面路由池导航
     * @param {String} path 路径
     * @param {Object} data 跳转数据
     * @param {Function} handle 内容组件处理器
     */
    navigationActive(path, data, handle) {
        let _intent = this.getActiveIntent(path)

        if (_intent) {
            this.startActive(_intent, data, handle)
        } else {
            console.error('No corresponding entry found in active routing pool!')
        }
    }

    /**
     * @description: 意图启动active页面
     * @param {Object} intent 意图对象
     * @param {Object} data 跳转数据
     * @param {Function} handle 内容组件处理器
     */
    startActive(intent = {
        component: null,
        path: null,
        opts: { props: {} }
    }, data, handle) {
        if (!intent || !intent.component
            || Object.getPrototypeOf(intent.component) !== BaseActived
            || Tool.isEmpty(intent.path)) {
            console.error('router frame start active error please check the configuration parameters!')

            return
        }

        if (intent.path === this.props.index) { // 如果导航到首页则退栈
            this.gohome(handle)
            return
        }

        let _stack = this.state.activeStack

        if (_stack.length > 0) {
            let _last = _stack[_stack.length - 1]

            if (_last.path === intent.path) {
                return
            }

            if (_last.compref instanceof BaseActived) {
                _last.pauseHandle = null

                _last.compref.onPause()
            } else {
                _last.pauseHandle = function (comp) { // 消耗处理器
                    if (comp instanceof BaseActived) {
                        comp.onPause()
                    }
                }
            }
        }

        _stack = _stack.filter((_it) => { return !(_it.path === intent.path) }) // 过滤重复项

        _stack.push(Object.assign({
            active: null,
            compref: null,
            zIndex: ++this._activeZIndex,
            pauseHandle: null,
            compHandle: function (comp) {
                if (comp instanceof BaseActived) {
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
        this.state.activeStack = _stack

        this.setState({ activeStack: _stack })
    }

    /**
     * @description: 获取active页面内容组件对象
     * @param {String} path 路径 
     * @return: 内容组件对象
     */
    getActive(path) {
        for (let it of this._param.actives) {
            if (it.path === path) { return it.compref }
        }

        return null
    }

    /**
     * @description: 在active页面路由池内获取意图
     * @param {String} path 路径 
     * @return: 意图对象
     */
    getActiveIntent(path) {
        for (let item of this._param.actives) {
            if (item.path === path) {
                return item
            }
        }
        return null
    }

    /**
     * @description: 判断active页面是否处于栈顶
     * @param {Object} active BaseActive对象 或 CLASS 
     * @return: boole
     */
    isActiveStackTop(active) {
        if (this.state.activeStack.length < 1) {
            return false
        }

        let _top = this.state.activeStack[this.state.activeStack.length - 1]

        if (active instanceof _top.component || active === _top.component) {
            return true
        }

        return false
    }

    /**
     * @description: window视窗退栈
     * @param {Object} window BaseWindow对象
     */
    finishWindow(window) {
        if (window == null || this.state.windowStack.length < 1) { return }

        let _stack = this.state.windowStack

        let _last = _stack[_stack.length - 1]

        if (window !== _last.window) { return }

        if (_last.compref instanceof BaseWindow) {
            _last.compref.onPause()
        }

        _stack.splice(_stack.length - 1, 1)

        if (_stack.length > 0) {
            _last = _stack[_stack.length - 1]

            if (_last.compref instanceof BaseWindow) {
                _last.compref.onResume()
            }
        }

        this.setState({ windowStack: _stack })
    }

    /**
     * @description: 在window路由池内导航
     * @param {String} path 路径
     * @param {Object} data 跳转数据
     * @param {Function} handle 内容组件处理器
     */
    navigationWindow(path, data, handle) {
        let _intent = this.getWindowIntent(path)

        if (_intent) {
            this.startWindow(_intent, data, handle)
        } else {
            console.error('No corresponding entry found in window routing pool!')
        }
    }

    /**
     * @description: 意图启动window视窗
     * @param {Object} intent 意图对象
     * @param {Object} data 跳转数据
     * @param {Function} handle 内容组件处理器
     */
    startWindow(intent = {
        component: null,
        path: null,
        opts: { props: {} }
    }, data, handle) {
        if (!intent || !intent.component
            || Object.getPrototypeOf(intent.component) !== BaseWindow
            || Tool.isEmpty(intent.path)) {
            console.error('router frame start window error please check the configuration parameters!')

            return
        }

        let _stack = this.state.windowStack

        if (_stack.length > 0) {
            let _last = _stack[_stack.length - 1]

            if (_last.path === intent.path) {
                return
            }

            if (_last.compref instanceof BaseWindow) {
                _last.pauseHandle = null

                _last.compref.onPause()
            } else {
                _last.pauseHandle = function (comp) { // 消耗处理器
                    if (comp instanceof BaseWindow) {
                        comp.onPause()
                    }
                }
            }
        }

        _stack = _stack.filter((_it) => { return !(_it.path === intent.path) }) // 过滤重复项

        _stack.push(Object.assign({
            window: null,
            compref: null,
            zIndex: ++this._windowZIndex,
            pauseHandle: null,
            compHandle: function (comp) {
                if (comp instanceof BaseWindow) {
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
        this.state.windowStack = _stack

        this.setState({ windowStack: _stack })
    }

    /**
     * @description: 获取window视窗内容组件对象
     * @param {String} path 路径 
     * @return: 内容组件对象
     */
    getWindow(path) {
        for (let it of this._param.windows) {
            if (it.path === path) { return it.compref }
        }

        return null
    }

    /**
     * @description: 在window视窗路由池内获取意图
     * @param {String} path 路径 
     * @return: window视窗意图
     */
    getWindowIntent(path) {
        for (let item of this._param.windows) {
            if (item.path === path) {
                return item
            }
        }
        return null
    }

    /**
     * @description: 判断window视窗是否处于栈顶
     * @param {Object} window window 视图对象 或 CLASS 
     * @return: boole
     */
    isWindowStackTop(window) {
        if (this.state.windowStack.length < 1) {
            return false
        }

        let _top = this.state.windowStack[this.state.windowStack.length - 1]

        if (window instanceof _top.component || window === _top.component) {
            return true
        }

        return false
    }

    /**
     * @description: 框架开始渲染
     * @return: JSX
     */
    render() {
        this.updateOpts()

        let actives = this.state.activeStack.filter((item) => {
            return item.component ? true : false
        }).map((item, key) => {
            return (
                <Actived key={key} router={this}
                    component={item.component}

                    initPame={item.opts.props}

                    zIndex={item.zIndex}

                    compHandle={(comp) => {
                        item.compref = comp

                        if (item.compHandle) {
                            item.compHandle(comp)
                        }
                        item.compHandle = null
                    }}

                    ref={(comp) => {
                        item.active = comp
                    }} />
            )
        })

        let windows = this.state.windowStack.filter((item) => {
            return item.component ? true : false
        }).map((item, key) => {
            return (
                <Window key={key} router={this}
                    component={item.component}

                    initPame={item.opts.props}

                    zIndex={item.zIndex}

                    compHandle={(comp) => {
                        item.compref = comp

                        if (item.compHandle) {
                            item.compHandle(comp)
                        }
                        item.compHandle = null
                    }}

                    ref={(comp) => {
                        item.window = comp
                    }} />
            )
        })

        return (
            <div className={'app'}>
                {/* activity stack */}
                <div className={'page-active-root'}>
                    <div className={'page-active-view'}>
                        <ActivedAnimation className={this.props.classNameActiveAnimation}>
                            {actives}
                        </ActivedAnimation>
                    </div>
                </div>

                {/* widget stack */}
                <div className={'page-window-root'}>
                    <div className={'page-window-view'}>
                        <WindowAnimation className={this.props.classNameWindowAnimation}>
                            {windows}
                        </WindowAnimation>
                    </div>
                </div>
            </div>
        )
    }
}

export default Frame
