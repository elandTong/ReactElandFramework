import PropType from 'prop-types'
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../assets/style/comp.drawer.menu.scss'
import BaseContext from '../BaseContext'

class DrawerMenu extends BaseContext {
    static propTypes = {
        open: PropType.bool,

        transitionName: PropType.string,
        className: PropType.string,
        style: PropType.object,
        maskClassName: PropType.string,
        maskStyle: PropType.object,

        animationTime: PropType.number,
        position: PropType.string,
        render: PropType.func,
        closeHandle: PropType.func
    }

    static defaultProps = {
        open: false,
        className: '',
        maskClassName: '',
        animationTime: 280,
        position: 'left',
        render: function () {
            return (
                <div>{'this is darwer menu content'}</div>
            )
        },
        closeHandle: function (e) {
        }
    }

    constructor(props) {
        super(props)

        this.renderLeft = this.renderLeft.bind(this)
        this.renderRight = this.renderRight.bind(this)
        this.renderBottom = this.renderBottom.bind(this)
        this.renderTop = this.renderTop.bind(this)

        this.state = {
            menus: [{
                key: 'left',
                render: this.renderLeft
            }, {
                key: 'right',
                render: this.renderRight
            }, {
                key: 'bottom',
                render: this.renderBottom
            }, {
                key: 'top',
                render: this.renderTop
            }]
        }
    }

    renderLeft(item) {
        return (
            <div className={`comp-drawer-menu-left ${this.props.className}`} style={this.props.style}>
                {this.props.render && this.props.render({ position: item.key })}
            </div>
        )
    }

    renderRight(item) {
        return (
            <div className={`comp-drawer-menu-right ${this.props.className}`} style={this.props.style}>
                {this.props.render && this.props.render({ position: item.key })}
            </div>
        )
    }

    renderTop(item) {
        return (
            <div className={`comp-drawer-menu-top ${this.props.className}`} style={this.props.style}>
                {this.props.render && this.props.render({ position: item.key })}
            </div>
        )
    }

    renderBottom(item) {
        return (
            <div className={`comp-drawer-menu-bottom ${this.props.className}`} style={this.props.style}>
                {this.props.render && this.props.render({ position: item.key })}
            </div>
        )
    }

    selectTransitionName(type) {
        switch (type) {
            case 'left': {
                return this.props.transitionName || 'comp-drawer-menu-left'
            }
            case 'right': {
                return this.props.transitionName || 'comp-drawer-menu-right'
            }
            case 'bottom': {
                return this.props.transitionName || 'comp-drawer-menu-bottom'
            }
            case 'top': {
                return this.props.transitionName || 'comp-drawer-menu-top'
            }
            default: {
                return this.props.transitionName || 'comp-drawer-menu-left'
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.children}

                {this.props.open ? (
                    <div className={`comp-drawer-menu-mask ${this.props.maskClassName}`}
                        style={this.props.maskStyle}
                        onClick={this.props.closeHandle} />
                ) : (null)}

                <ReactCSSTransitionGroup transitionName={this.selectTransitionName(this.props.position)}
                    transitionAppear={true}
                    transitionAppearTimeout={this.props.animationTime}
                    transitionEnter={true}
                    transitionEnterTimeout={this.props.animationTime}
                    transitionLeave={true}
                    transitionLeaveTimeout={this.props.animationTime}>
                    {this.state.menus.filter((item) => {
                        return item.key === this.props.position && this.props.open
                    }).map((item) => {
                        return item.render(item)
                    })}
                </ReactCSSTransitionGroup>
            </React.Fragment>
        )
    }
}

export default DrawerMenu
