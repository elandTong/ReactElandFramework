import PropTypes from 'prop-types';
import React from 'react';
import '../assets/style/comp.number.keyboard.scss';
import BaseContext from '../BaseContext';
import Tool from '../utils/Tool';
import FixedModal from './FixedModal';
import FixedModalGroup from './FixedModalGroup';
import Mask from './Mask';

class NumberKeyboard extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        defaultValue: PropTypes.string,
        disablePoint: PropTypes.bool,
        onChange: PropTypes.func,
        onSure: PropTypes.func,
        onClose: PropTypes.func
    }

    static defaultProps = {
        className: '',
        style: null,
        defaultValue: '',
        disablePoint: false,
        onChange: function (val) {
        },
        onSure: function (val) {
        },
        onClose: function (val) {
        }
    }

    _result = ''

    constructor(props) {
        super(props)

        this._result = this.props.defaultValue

        this.state = {
            number: [{
                val: 1
            }, {
                val: 2
            }, {
                val: 3
            }, {
                val: 4
            }, {
                val: 5
            }, {
                val: 6
            }, {
                val: 7
            }, {
                val: 8
            }, {
                val: 9
            }, {
                key: 'point',
                val: '.'
            }, {
                key: 'zero',
                className: 'comp-number-keyboard-zero-button',
                val: 0
            }]
        }
    }

    componentWillUnmount() {
        this._result = ''
    }

    onNumber(item, key, e) {
        e.stopPropagation()

        if (item.key === 'point' && String(this._result).indexOf(item.val) >= 0) {
        } else {
            let _tmep = String(this._result)

            if (item.key === 'point' && Tool.isEmpty(_tmep)) {
                _tmep = '0'
            }

            if (item.key === 'zero' && _tmep === '0') {
                _tmep = ''
            }

            this._result = _tmep + item.val


            if (this.props.onChange) {
                this.props.onChange(this._result)
            }
        }
    }

    onClose(e) {
        e.stopPropagation()

        if (this.props.onClose) {
            this.props.onClose(Number(this._result))
        }
    }

    onSure(e) {
        e.stopPropagation()

        if (this.props.onSure) {
            this.props.onSure(Number(this._result))
        }
    }

    onReset(e) {
        e.stopPropagation()

        this._result = ''

        if (this.props.onChange) {
            this.props.onChange(this._result)
        }
    }

    onRevoke(e) {
        e.stopPropagation()

        if (String(this._result).length === 0) {
            return
        }

        this._result = String(this._result).substr(0, String(this._result).length - 1)

        if (this.props.onChange) {
            this.props.onChange(this._result)
        }
    }

    renderContent({ theme, language }) {
        return (
            <div className={`comp-number-keyboard-root display-space ${this.props.className}`} style={Object.assign({}, this.props.style)}>
                <div className={'comp-number-keyboard-close-button click-out-ripple display-center'} onClick={this.onClose.bind(this)}>
                    {language.close}
                </div>

                <div className={'comp-number-keyboard-numberzone display-warp'}>
                    {this.state.number.filter((item) => {
                        if (item.key === 'point' && this.props.disablePoint) {
                            return false
                        }
                        return true
                    }).map((item, key) => {
                        let _buttonClass = item.className || 'comp-number-keyboard-min-button'
                        if (item.key === 'zero' && this.props.disablePoint) {
                            _buttonClass += ' comp-number-keyboard-maxzero'
                        }
                        let _class = `${_buttonClass} ${key > 2 ? 'comp-number-keyboard-button-margin' : ''}`
                        return (
                            <div key={key} className={`${_class} click-out-ripple display-center`} onClick={(e) => {
                                this.onNumber(item, key, e)
                            }}>
                                {item.val}
                            </div>
                        )
                    })}
                </div>

                <div className={'comp-number-keyboard-tool-zone'}>
                    <div className={'comp-number-keyboard-min-button click-out-ripple display-center'}
                        onClick={this.onRevoke.bind(this)}>{language.revoke}</div>
                    <div className={'comp-number-keyboard-min-button comp-number-keyboard-button-margin click-out-ripple display-center'}
                        onClick={this.onReset.bind(this)}>{language.reset}</div>
                    <div className={'comp-number-keyboard-mid-button comp-number-keyboard-button-margin click-out-ripple display-center'}
                        onClick={this.onSure.bind(this)}>{language.sure}</div>
                </div>
            </div>
        )
    }
}

class NumberKeyboardController extends BaseContext {
    static propTypes = NumberKeyboard.propTypes
    static defaultProps = {
        onChange: function (comp, val) {
        },
        onSure: function (comp, val) {
        },
        onClose: function (comp, val) {
        }
    }

    _targetComp = null
    _rootComp = null

    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            defaultValue: ''
        }
    }

    closeKeyboard(e) {
        if (this._rootComp instanceof HTMLElement) {
            this._rootComp.className = this._rootComp.className.replace('comp-number-keyboard-target-revision', '')
        }
        this.setState({ visible: false, defaultValue: '' })
    }

    onChange(val) {
        if (this.props.onChange) {
            this.props.onChange(this._targetComp, val)
        }
    }

    onSure(val) {
        this.closeKeyboard()
        if (this.props.onSure) {
            this.props.onSure(this._targetComp, val)
        }
    }

    onClose(val) {
        this.closeKeyboard()
        if (this.props.onClose) {
            this.props.onClose(this._targetComp, val)
        }
    }

    onFocus(comp, e) {
        if (comp instanceof HTMLInputElement) {
            comp.blur()
            this._targetComp = comp
            this.setState({ visible: true, defaultValue: this._targetComp.value })
            if (this._rootComp instanceof HTMLElement) {
                if ((this._rootComp.offsetTop + this._rootComp.offsetHeight) > document.body.clientHeight * 0.7) { // input不在可见范围
                    this._rootComp.className = `${this._rootComp.className} comp-number-keyboard-target-revision`
                }
            }
        }
    }

    onBlur(comp, e) {
        if (comp instanceof HTMLInputElement) { }
    }

    forEachBind(items) {
        Array.from(items).forEach((comp) => {
            if (comp instanceof HTMLElement) {
                if (comp instanceof HTMLInputElement) {
                    comp.onfocus = (e) => { this.onFocus(comp, e) }
                    comp.onblur = (e) => { this.onBlur(comp, e) }
                }
                if (comp.children.length > 0) {
                    this.forEachBind(comp.children)
                }
            }
        })
    }

    onChildRef(comp) {
        if (comp instanceof HTMLElement) {
            this._rootComp = comp
            if (comp instanceof HTMLInputElement) {
                comp.onfocus = (e) => { this.onFocus(comp, e) }
                comp.onblur = (e) => { this.onBlur(comp, e) }
            }
            if (comp.children.length > 0) {
                this.forEachBind(comp.children)
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {React.cloneElement(React.Children.only(this.props.children), {
                    ref: this.onChildRef.bind(this)
                })}

                <FixedModalGroup>
                    <FixedModal visible={this.state.visible} className={'comp-number-keyboard-fixed-modal'}>
                        <Mask onClick={this.closeKeyboard.bind(this)}>
                            <NumberKeyboard {...this.props} defaultValue={String(this.state.defaultValue)}
                                onChange={this.onChange.bind(this)}
                                onSure={this.onSure.bind(this)}
                                onClose={this.onClose.bind(this)} />
                        </Mask>
                    </FixedModal>
                </FixedModalGroup>
            </React.Fragment>
        )
    }
}

export default NumberKeyboard

export { NumberKeyboardController, NumberKeyboard };
