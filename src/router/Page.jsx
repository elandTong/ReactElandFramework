import React from 'react'
import Tool from '../utils/Tool'
import BaseContext from '../BaseContext'

class Toolbar extends BaseContext {
    _options = {
        title: null,
        hideBack: false,
        hideMenu: false,
        onBack: null,
        onMenu: null
    }

    _defaultOptions = {
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

        if (this._options.hideMenu) { return }

        if (this.state.timeoutclick <= 0) {
            if (this._options.onMenu) { this._options.onMenu(e) }
        } else {
            setTimeout(() => {
                if (this._options.onMenu) { this._options.onMenu(e) }
            }, this.state.timeoutclick)
        }
    }

    onFinishClick(e) {
        if (e instanceof Event) { e.stopPropagation() }

        if (this._options.hideBack) { return }

        if (this.state.timeoutclick <= 0) {
            if (this._options.onBack) { this._options.onBack(e) }
        } else {
            setTimeout(() => {
                if (this._options.onBack) { this._options.onBack(e) }
            }, this.state.timeoutclick)
        }
    }

    renderContent({ theme, language }) {
        this._options = Tool.structureAssignment(this._defaultOptions, this.props.options || {})

        return (
            <div className={'display-space page-screen-container-toolbar-view'}>
                <div className={`${this._options.hideBack ? '' : 'click-out-ripple'} display-center page-screen-container-toolbar-ele`} onClick={this.onFinishClick}>
                    {this._options.hideBack ? (null) : (
                        <img src={require(`../${theme.resources.iconPath}/ic_back.png`)} height={this.state.icon.height} alt={'ic_back'} />
                    )}
                </div>

                <span> {this._options.title} </span>

                <div className={`${this._options.hideMenu ? '' : 'click-out-ripple'} display-center page-screen-container-toolbar-ele`} onClick={this.onMenuClick}>
                    {this._options.hideMenu ? (null) : (
                        <img src={require(`../${theme.resources.iconPath}/ic_menu.png`)} height={this.state.icon.height} alt={'ic_menu'} />
                    )}
                </div>
            </div>
        )
    }
}

class ScreenPage extends React.Component {
    _options = {
        toolbar: null,
        toolbarComp: null,
        hideToolbar: false
    }

    _defaultOptions = {
        toolbar: null,
        toolbarComp: null,
        hideToolbar: false
    }

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        this._options = Tool.structureAssignment(this._defaultOptions, this.props.options || {})

        let _view_classname = this._options.hideToolbar ? 'page-screen-container-view-no-toolbar' : 'page-screen-container-view-have-toolbar'

        return (
            <div className={'page-screen-container-wrapper'}>
                {this._options.hideToolbar ? (null) : (
                    <div className={'page-screen-container-toolbar'}>
                        {this._options.toolbarComp || (<Toolbar options={this._options.toolbar} />)}
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
