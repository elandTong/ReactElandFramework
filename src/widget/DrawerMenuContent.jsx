import PropTypes from 'prop-types'
import React from 'react'
import '../assets/style/comp.drawer.menu.content.scss'
import BaseContext from '../BaseContext'
import ResUtil from '../utils/ResUtil'
import Tool from '../utils/Tool'
import TouchEffect from './TouchEffect'

class DrawerMenuHeader extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        avatar: PropTypes.string,
        describe: PropTypes.string
    }

    static defaultProps = {
        className: '',
        style: null,
        avatar: null,
        describe: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    renderUser({ theme, language }) {
        return (
            <div className={'display-column'}>
                <img className={'comp-drawer-menu-content-head-user-avatar'}
                    src={this.props.avatar || ResUtil.requirePic('pic_avatar.jpg', theme)}
                    alt={'avatar'} />

                <span className={'comp-drawer-menu-content-head-user-describe'}>
                    {this.props.describe || language.helloWorld}
                </span>
            </div>
        )
    }

    renderContent({ theme, language }) {
        return (
            <div className={`comp-drawer-menu-content-head display-center ${this.props.className}`}
                style={Object.assign({}, this.props.style)}>
                {this.props.children || this.renderUser({ theme, language })}
            </div>
        )
    }
}

class DrawerMenuItem extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        onClick: PropTypes.func
    }

    static defaultProps = {
        className: '',
        style: null,
        onClick: function (e) {
        }
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <TouchEffect className={`comp-drawer-menu-content-item display-start ${this.props.className}`}
                style={Object.assign({}, this.props.style)}
                onClick={this.props.onClick}>
                {this.props.children}
            </TouchEffect>
        )
    }
}

class DrawerMenuBottom extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object
    }

    static defaultProps = {
        className: '',
        style: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className={`comp-drawer-menu-content-bottom display-space ${this.props.className}`}
                style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

class DrawerMenuContent extends BaseContext {
    constructor(props) {
        super(props)
        this.state = {}
    }

    existBottom() {
        let _exist = false
        React.Children.toArray(this.props.children).forEach((item) => {
            if (item.type === DrawerMenuBottom) { _exist = true }
        })
        return _exist
    }

    renderBottom() {
        let _result = null
        React.Children.toArray(this.props.children).forEach((item) => {
            if (item.type === DrawerMenuBottom) {
                _result = item
            }
        })
        return _result
    }

    render() {
        return (
            <div className={`comp-drawer-menu-content-root ${this.existBottom() ? 'exist-bottom' : ''}`}>
                <div className={'comp-drawer-menu-content-scroll'}>
                    {React.Children.toArray(this.props.children).filter((item) => {
                        return item.type === DrawerMenuHeader
                    })}

                    <div className={'common-spline-x'} />

                    {Tool.insertSplitline(React.Children.toArray(this.props.children).filter((item) => {
                        return item.type === DrawerMenuItem
                    }))}
                </div>

                {this.existBottom() ? (this.renderBottom()) : (null)}
            </div>
        )
    }
}

export default DrawerMenuContent

export { DrawerMenuHeader, DrawerMenuItem, DrawerMenuBottom }
