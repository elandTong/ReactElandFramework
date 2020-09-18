import PropTypes from 'prop-types'
import React from 'react'
import BaseContext from '../BaseContext'
import ResUtil from '../utils/ResUtil'
import { DisplaySpaceBetween } from '../widget/Display'
import TouchEffect from '../widget/TouchEffect'

class Toolbar extends BaseContext {
    static propTypes = {
        title: PropTypes.string,
        hideBack: PropTypes.bool,
        hideMenu: PropTypes.bool,
        onBack: PropTypes.func,
        onMenu: PropTypes.func
    }

    static defaultProps = {
        title: 'ScreenTitle',
        hideBack: false,
        hideMenu: false,
        onBack: function (e) {
        },
        onMenu: function (e) {
        }
    }

    constructor(props) {
        super(props)
        this.onMenuClick = this.onMenuClick.bind(this)
        this.onFinishClick = this.onFinishClick.bind(this)
        this.state = {}
    }

    onMenuClick(e) {
        if (e instanceof Event) { e.stopPropagation() }
        if (this.props.hideMenu) { return }
        setTimeout(() => { if (this.props.onMenu) { this.props.onMenu(e) } }, 160)
    }

    onFinishClick(e) {
        if (e instanceof Event) { e.stopPropagation() }
        if (this.props.hideBack) { return }
        setTimeout(() => { if (this.props.onBack) { this.props.onBack(e) } }, 160)
    }

    renderContent({ theme, language }) {
        return (
            <DisplaySpaceBetween className={'page-screen-container-toolbar-view'}>
                <TouchEffect mode={this.props.hideBack ? 'disable' : 'out'}
                    className={'page-screen-container-toolbar-ele common-display-center'}
                    onClick={this.onFinishClick}>
                    {this.props.hideBack ? (null) : (
                        <img src={ResUtil.requireIcon('ic_back.png', theme)}
                            height={'55%'}
                            alt={'toolbar_icon_back'} />
                    )}
                </TouchEffect>

                <span>{this.props.title}</span>

                <TouchEffect mode={this.props.hideMenu ? 'disable' : 'out'}
                    className={'page-screen-container-toolbar-ele common-display-center'}
                    onClick={this.onMenuClick}>
                    {this.props.hideMenu ? (null) : (
                        <img src={ResUtil.requireIcon('ic_menu.png', theme)}
                            height={'55%'}
                            alt={'toolbar_icon_menu'} />
                    )}
                </TouchEffect>
            </DisplaySpaceBetween>
        )
    }
}

class ScreenPage extends BaseContext {
    static propTypes = {
        toolbarProps: PropTypes.object,
        renderToolbar: PropTypes.func,
        hideToolbar: PropTypes.bool
    }

    static defaultProps = {
        toolbarProps: {},
        renderToolbar: null,
        hideToolbar: false
    }

    constructor(props) {
        super(props)
        this.renderDefaultToolbar = this.renderDefaultToolbar.bind(this)
        this.renderToolbar = this.renderToolbar.bind(this)
        this.state = {}
    }

    renderDefaultToolbar() {
        return (<Toolbar {...this.props.toolbarProps} />)
    }

    renderToolbar() {
        return this.props.hideToolbar ? (null) : (
            <div className={'page-screen-container-toolbar'}>
                {this.props.renderToolbar ? this.props.renderToolbar(this) : this.renderDefaultToolbar()}
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.renderToolbar()}

                <div className={`page-screen-container-view ${this.props.hideToolbar ? 'page-screen-container-view-no-toolbar' : 'page-screen-container-view-have-toolbar'}`}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

class ModalPage extends BaseContext {
    static propTypes = {
        style: PropTypes.object
    }

    static defaultProps = {
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className={'page-modal-container-view'} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

export default ScreenPage

export { ScreenPage, ModalPage, Toolbar }
