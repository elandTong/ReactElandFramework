import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group/index';
import Tool from '../tool/Tool';
import Actived from './Actived';
import Window from './Window';

/**
 * 基础SPA路由框架
 * <br>
 * 基于DOM结构的渲染控制路由框架
 * 作者: Eland.Tong 
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
                <CSSTransitionGroup transitionName={'active-router'}
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
                <CSSTransitionGroup transitionName={'example'}
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

    constructor(props) {
        super(props)

        this._param = Tool.structureAssignment(Object.assign({}, this._keep_param), this.props.param)

        this.state = {
            index: {
                path: props.index
            },
            activeStack: [],
            windowStack: []
        }

        // 初始化页面
        for (let item of this._param.actives) {
            if (item.path === this.props.index) {
                this.state.activeStack.push(Object.assign({
                    active: null,
                    compref: null,
                    zIndex: ++this._activeZIndex,
                    compHandle: (comp) => {
                        console.error('index active comp ref', comp)
                    }
                }, item))
            }
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    // active
    finishActive(active) {
        if (active == null) { return }

        let _stack = this.state.activeStack

        let last = _stack[_stack.length - 1]

        if (last.path === this.props.index) { return } // 首页无法finish

        if (active !== last.active) { return }

        _stack.splice(_stack.length - 1, 1)

        this.setState({ activeStack: _stack })
    }

    navigationActive(path, handle) {
        let _stack = this.state.activeStack

        for (let item of this._param.actives) {
            if (item.path === path) {
                _stack = _stack.filter((_it) => { return !(_it.path === item.path) }) // 过滤重复项

                _stack.push(Object.assign({
                    active: null,
                    compref: null,
                    zIndex: ++this._activeZIndex,
                    compHandle: handle
                }, item))

                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.activeStack = _stack

                this.setState({ activeStack: _stack })

                break
            }
        }
    }

    getActive(path) {
        for (let it of this._param.actives) {
            if (it.path === path) { return it.compref }
        }

        return null
    }

    // widget
    finishWindow(window) {
        if (window == null) { return }

        let _stack = this.state.windowStack

        let last = _stack[_stack.length - 1]

        if (last == null) { return }

        if (window !== last.window) { return }

        _stack.splice(_stack.length - 1, 1)

        this.setState({ windowStack: _stack })
    }

    navigationWindow(path, handle) {
        let _stack = this.state.windowStack

        for (let item of this._param.windows) {
            if (item.path === path) {
                _stack = _stack.filter((_it) => { return !(_it.path === item.path) }) // 过滤重复项

                _stack.push(Object.assign({
                    window: null,
                    compref: null,
                    zIndex: ++this._windowZIndex,
                    compHandle: handle
                }, item))

                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.windowStack = _stack

                this.setState({ windowStack: _stack })

                break
            }
        }
    }

    getWindow(path) {
        for (let it of this._param.windows) {
            if (it.path === path) { return it.compref }
        }

        return null
    }

    render() {
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

        // App base frame
        return (
            <div className={'app'}>
                {/* activity */}
                <div className={'page-root'}>
                    <div className={'page-view'}>
                        <ActivedAnimation>
                            {actives}
                        </ActivedAnimation>
                    </div>
                </div>

                {/* widget */}
                <div className={'widget-root'}>
                    <div className={'widget-view'}>
                        <WindowAnimation>
                            {windows}
                        </WindowAnimation>
                    </div>
                </div>
            </div>
        )
    }
}

export default Frame
