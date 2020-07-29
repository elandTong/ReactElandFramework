import React from 'react'
import Tool from '../utils/Tool'

class Toolbar extends React.Component {
    _opts = {
        title: null,
        hideBack: false,
        hideMenu: false,
        onBack: null,
        onMenu: null
    }

    _keep_opts = {
        title: null,
        hideBack: false,
        hideMenu: false,
        onBack: null,
        onMenu: null
    }

    constructor(props) {
        super(props)

        this.state = {
            timeoutclick: 160,
            icon: {
                height: '55%'
            }
        }

        this.onMenuClick = this.onMenuClick.bind(this)

        this.onFinishClick = this.onFinishClick.bind(this)
    }

    onMenuClick(e) {
        if (e instanceof Event) { e.stopPropagation() }

        if (this._opts.hideMenu) { return }

        if (this.state.timeoutclick <= 0) {
            if (this._opts.onMenu) { this._opts.onMenu(e) }
        } else {
            setTimeout(() => {
                if (this._opts.onMenu) { this._opts.onMenu(e) }
            }, this.state.timeoutclick)
        }
    }

    onFinishClick(e) {
        if (e instanceof Event) { e.stopPropagation() }

        if (this._opts.hideBack) { return }

        if (this.state.timeoutclick <= 0) {
            if (this._opts.onBack) { this._opts.onBack(e) }
        } else {
            setTimeout(() => {
                if (this._opts.onBack) { this._opts.onBack(e) }
            }, this.state.timeoutclick)
        }
    }

    render() {
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        return (
            <div className={'display-space page-screen-container-toolbar-view'}>
                <div className={`${this._opts.hideBack ? '' : 'click-out-ripple'} display-center page-screen-container-toolbar-ele`} onClick={this.onFinishClick}>
                    {this._opts.hideBack ? (null) : (
                        <img src={require('../assets/res/icon/ic_back.png')} height={this.state.icon.height} alt={'ic_back'} />
                    )}
                </div>

                <span> {this._opts.title} </span>

                <div className={`${this._opts.hideMenu ? '' : 'click-out-ripple'} display-center page-screen-container-toolbar-ele`} onClick={this.onMenuClick}>
                    {this._opts.hideMenu ? (null) : (
                        <img src={require('../assets/res/icon/ic_menu.png')} height={this.state.icon.height} alt={'ic_menu'} />
                    )}
                </div>
            </div>
        )
    }
}

class ScreenPage extends React.Component {
    _opts = {
        toolbar: null,
        toolbarComp: null,
        hideToolbar: false
    }

    _keep_opts = {
        toolbar: null,
        toolbarComp: null,
        hideToolbar: false
    }

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        let _view_classname = this._opts.hideToolbar ? 'page-screen-container-view-no-toolbar' : 'page-screen-container-view-have-toolbar'

        return (
            <div className={'page-screen-container-pack'}>
                {this._opts.hideToolbar ? (null) : (
                    <div className={'page-screen-container-toolbar'}>
                        {this._opts.toolbarComp || (<Toolbar opts={this._opts.toolbar} />)}
                    </div>
                )}

                <div className={`page-screen-container-view ${_view_classname}`}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class ModalPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div className={'page-modal-container-view'} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

export default ScreenPage

export { ScreenPage, ModalPage, Toolbar }
