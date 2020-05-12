import React from 'react';
import Emit from '../tool/EventBus';
import Frame from './Frame';

class BaseWindow extends React.Component {
    static _BASE_GLOBAL_THEME = './_BASE_GLOBAL_THEME/'

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
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        Emit.remove(this.onBroadcast)
    }

    onData(data) {
        this._indata = data
    }

    onBroadcast(data) {
        this._broadcastData = data
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
            this._router.startActive(intent, handle)
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
            this._router.startWindow(intent, handle)
        }
    }

    finish() {
        if (this._router instanceof Frame) {
            this._router.finishWindow(this._window)
        }
    }
}

export default BaseWindow
