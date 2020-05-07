import React from 'react';
import Tool from '../tool/Tool';

class BaseWindow extends React.Component {
    static _BASE_GLOBAL_THEME = './_BASE_GLOBAL_THEME/'

    _window = null

    _router = null

    _initPame = {}

    _indata = {}

    _broadcastHandle = null

    _broadcastData = {}

    _globalEventHandle = null

    constructor(props) {
        super(props)

        this._window = props.window

        this._router = props.router

        this._initPame = props.initPame

        this._globalEventHandle = (data) => {
            this._broadcastData = data
            if (this._broadcastHandle) {
                this._broadcastHandle(data)
            }
        }

        Tool.onEmit(BaseWindow._BASE_GLOBAL_THEME, this._globalEventHandle)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        Tool.removeEmit(this._globalEventHandle)
    }

    onData(data) {
        this._indata = data
    }

    onBroadcast(han) {
        this._broadcastHandle = han
    }

    navigationActive(name, handle) {
        this._router.navigationActive(name, (comp) => {
            if (handle) { handle(comp) }
        })
    }

    navigationWindow(name, handle) {
        this._router.navigationWindow(name, (comp) => {
            if (handle) { handle(comp) }
        })
    }

    finish() {
        this._router.finishWindow(this._window)
    }
}

export default BaseWindow
