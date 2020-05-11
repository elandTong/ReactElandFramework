import React from 'react';
import Tool from '../tool/Tool';
import Frame from './Frame';

class BaseWindow extends React.Component {
    static _BASE_GLOBAL_THEME = './_BASE_GLOBAL_THEME/'

    _window = null

    _router = null

    _initPame = {}

    _indata = {}

    _broadcastHandle = null

    _broadcastData = {}

    constructor(props) {
        super(props)

        this._window = props.window

        this._router = props.router

        this._initPame = props.initPame

        this.onGlobalEvent = this.onGlobalEvent.bind(this)

        Tool.onEmit(BaseWindow._BASE_GLOBAL_THEME, this.onGlobalEvent)
    }

    onGlobalEvent(data) {
        this._broadcastData = data

        if (this._broadcastHandle) { this._broadcastHandle(data) }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        Tool.removeEmit(this.onGlobalEvent)
    }

    onData(data) {
        this._indata = data
    }

    onBroadcast(han) {
        this._broadcastHandle = han
    }

    navigationActive(name, handle) {
        if (this._router instanceof Frame) {
            this._router.navigationActive(name, (comp) => {
                if (handle) { handle(comp) }
            })
        }
    }

    startActive(intent, handle) {
        if (this._router instanceof Frame) {
            this._router.startActive(intent, (comp) => {
                if (handle) { handle(comp) }
            })
        }
    }

    navigationWindow(name, handle) {
        if (this._router instanceof Frame) {
            this._router.navigationWindow(name, (comp) => {
                if (handle) { handle(comp) }
            })
        }
    }

    startWindow(intent, handle) {
        if (this._router instanceof Frame) {
            this._router.startWindow(intent, (comp) => {
                if (handle) { handle(comp) }
            })
        }
    }

    finish() {
        if (this._router instanceof Frame) {
            this._router.finishWindow(this._window)
        }
    }
}

export default BaseWindow
