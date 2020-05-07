import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group/index';

class ActivedPopupAnimation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        if (this.props.status === false) {
            return (this.props.children)
        } else {
            return (
                <CSSTransitionGroup transitionName={'example'}
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                    transitionAppear={true}
                    transitionAppearTimeout={200}>
                    {this.props.children}
                </CSSTransitionGroup>
            )
        }
    }
}

class ActivedRoot extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div className={'page-active color-active-background'} style={{ zIndex: this.props.zIndex }}>
                <div className={'page-active-rel'}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

class ActivedContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div className={'page-active-content'}>
                {this.props.children}
            </div>
        )
    }
}

class Actived extends React.Component {
    _compRef = null

    constructor(props) {
        super(props)

        this.state = {
            popup: { // 弹窗配置
                items: [{
                    active: false,
                    id: null,
                    style: {
                        zIndex: null, top: 0, left: 0
                    },
                    comp: null
                }],
                topping: 99
            }
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    // popup
    pushPopups(list = []) {
        for (let _it of list) {
            if (!_it || !_it.comp || !_it.pame) { continue }
            this.pushPopup(_it.pame, _it.comp)
        }
    }

    pushPopup(pame = {
        x: 0, y: 0, id: null, className: null
    }, comp) {
        if (!pame.id || !comp) { return }

        let _pops = this.state.popup

        let _indx = -1

        for (let i = 0; i < _pops.items.length; i++) {
            let _it = _pops.items[i]
            if (_it.id === pame.id) {
                _indx = i

                break
            }
        }

        let _comp_opts = {
            active: false,
            id: pame.id,
            className: pame.className,
            style: {
                zIndex: 0, top: pame.y, left: pame.x
            },
            comp: comp
        }

        if (_indx === -1) {
            _pops.items.push(_comp_opts)
        } else {
            _pops.items[_indx] = _comp_opts
        }

        this.setState({ popup: _pops })

        return pame.id
    }

    showPopup(id, pos = {}) {
        let _pops = this.state.popup

        for (let _it of _pops.items) {
            if (_it.id === id) {
                _pops.topping = _pops.topping + 1

                _it.active = true
                _it.style.zIndex = _pops.topping
                _it.style.top = pos.y || _it.style.top
                _it.style.left = pos.x || _it.style.left

                break
            }
        }

        this.setState({ popup: _pops })
    }

    closePopup(id) {
        let _pops = this.state.popup

        for (let _it of _pops.items) {
            if (_it.id === id) {
                _it.active = false
                break
            }
        }

        this.setState({ popup: _pops })
    }

    removePopup(id) {
        let _pops = this.state.popup

        _pops.items = _pops.items.filter((item) => {
            return !(item.id === id)
        })

        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.popup = _pops

        this.setState({ popup: _pops })
    }

    // comp ref
    getCompRef() {
        return this._compRef
    }

    getComp() {
        if (this.props.component) {
            return (
                <this.props.component active={this} router={this.props.router} initPame={this.props.initPame} ref={(comp) => {
                    if (comp) {
                        this._compRef = comp

                        if (this.props.compHandle) {
                            this.props.compHandle(comp)
                        }
                    }
                }} />
            )
        } else {
            return (
                <span ref={(comp) => {
                    if (comp) {
                        this._compRef = comp

                        if (this.props.compHandle) {
                            this.props.compHandle(comp)
                        }
                    }
                }}>
                    {'This activity has no content components'}
                </span>
            )
        }
    }

    render() {
        return (
            <ActivedRoot zIndex={this.props.zIndex}>
                {/* content */}
                <ActivedContent>
                    {this.getComp()}
                </ActivedContent>

                <ActivedPopupAnimation>
                    {this.state.popup.items.filter((item) => {
                        return item.active
                    }).map((item, key) => {
                        return (
                            <div key={key} className={`pos-absolute-nosize ${item.className || ''}`} style={Object.assign({}, item.style)}>{item.comp}</div>
                        )
                    })}
                </ActivedPopupAnimation>
            </ActivedRoot>
        )
    }
}

export default Actived
