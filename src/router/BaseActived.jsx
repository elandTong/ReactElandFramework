import React from 'react';
import Tool from '../tool/Tool';
import Actived from './Actived';
import Frame from './Frame';

class BaseActived extends React.Component {
    static _BASE_GLOBAL_THEME = './_BASE_GLOBAL_THEME/'

    _actived = null

    _router = null

    _initPame = {}

    _indata = {}

    _broadcastHandle = null

    _broadcastData = {}

    _globalEventHandle = null

    constructor(props) {
        super(props)

        this._actived = props.active

        this._router = props.router

        this._initPame = props.initPame

        this._globalEventHandle = (data) => {
            this._broadcastData = data
            if (this._broadcastHandle) {
                this._broadcastHandle(data)
            }
        }

        Tool.onEmit(BaseActived._BASE_GLOBAL_THEME, this._globalEventHandle)
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

    // router
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
            this._router.finishActive(this._actived)
        }
    }

    // popup
    showPopup(id, pos) {
        if (this._actived instanceof Actived) {
            this._actived.showPopup(id, pos)
        }
    }

    closePopup(id) {
        if (this._actived instanceof Actived) {
            this._actived.closePopup(id)
        }
    }

    removePopup(id) {
        if (this._actived instanceof Actived) {
            this._actived.removePopup(id)
        }
    }

    pushPopups(list) {
        if (this._actived instanceof Actived) {
            this._actived.pushPopups(list)
        }
    }

    pushPopup(pame, comp) {
        if (this._actived instanceof Actived) {
            return this._actived.pushPopup(pame, comp)
        }

        return pame ? pame.id : null
    }
}

export default BaseActived
