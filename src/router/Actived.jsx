import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group/index';
import Tool from '../tool/Tool';

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

    // popup window
    pushPopups(list = []) {
        for (let _it of list) {
            if (!_it || !_it.comp || !_it.pame) {
                continue
            }

            let _id = this.pushPopup(_it.pame, _it.comp)
            _it.id = _id
            _it.pame.id = _id
        }

        return list
    }

    pushPopup(pame = { x: 0, y: 0, id: null }, comp) {
        if (!pame.id || !comp) { return }

        let _pops = this.state.popup

        pame.id = pame.id ? pame.id : Tool.uuid()

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
            style: {
                position: 'absolute',
                top: pame.y,
                left: pame.x,
                zIndex: 0,
                width: 'fit-content',
                height: 'fit-content'
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
                if (_it.active === true) {
                    break
                }

                _it.active = true

                _pops.topping = _pops.topping + 1
                _it.style.zIndex = _pops.topping

                if (pos.y) {
                    _it.style.top = pos.y
                }
                if (pos.x) {
                    _it.style.left = pos.x
                }

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

        for (let i = 0; i < _pops.items; i++) {
            let _it = _pops.items[i]
            if (_it.id === id) {
                _pops.items.splice(i, 1)
                break
            }
        }

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
        let _pops_jsx = this.state.popup.items.filter((item) => {
            return item.active
        }).map((item, key) => {
            return (
                <div key={key} style={Object.assign({}, item.style)}>{item.comp}</div>
            )
        })

        return (
            <ActivedRoot zIndex={this.props.zIndex}>
                {/* content */}
                <ActivedContent>
                    {this.getComp()}
                </ActivedContent>

                <CSSTransitionGroup transitionName={'example'}
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                    transitionAppear={true}
                    transitionAppearTimeout={200}>
                    {_pops_jsx}
                </CSSTransitionGroup>
            </ActivedRoot>
        )
    }
}

export default Actived
