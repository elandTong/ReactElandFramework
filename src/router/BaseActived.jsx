import React from 'react';
import Tool from '../tool/Tool';
import Actived from './Actived';

class BaseActived extends React.Component {
    static _BASE_GLOBAL_THEME = './_BASE_GLOBAL_THEME/'

    _actived = null

    _router = null

    _initPame = {}

    _indata = {}

    _broadcastHandle = null

    _broadcastData = {}

    constructor(props) {
        super(props)

        this._actived = props.active

        this._router = props.router

        this._initPame = props.initPame

        Tool.onEmit(BaseActived._BASE_GLOBAL_THEME, (data) => {
            this._broadcastData = data

            if (this._broadcastHandle) {
                this._broadcastHandle(data)
            }
        })

        console.error('base actived constructor actived', this._actived, ' router', this._router, ' initpame', this._initPame)
    }

    componentDidMount() {
        console.log('base actived component did mount')
    }

    componentWillUnmount() {
        console.log('base actived component will unmount')
    }

    onData(data) {
        this._indata = data
    }

    onBroadcast(han) {
        this._broadcastHandle = han
    }

    // router
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
        this._router.finishActive(this._actived)
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
            return this._actived.pushPopups(list)
        }

        return list
    }

    pushPopup(pame, comp) {
        if (this._actived instanceof Actived) {
            return this._actived.pushPopup(pame, comp)
        }

        return pame ? pame.id : null
    }
}

export default BaseActived
