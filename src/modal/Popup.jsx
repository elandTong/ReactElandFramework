import React from 'react'
import BaseModal from '../router/BaseModal'
import { ModalPage } from '../router/Page'
import Tool from '../utils/Tool'
import APPContext from '../APPContext'

class Popup extends BaseModal {
    static _path = '/popup'

    _opts = {
        width: '50%',
        height: '50%',
        angleClose: true,
        outClose: false,
        pos: {
            align: 'center',
            top: 0, left: 0
        },
        onClose: null
    }

    _keep_opts = {
        width: '50%',
        height: '50%',
        angleClose: true,
        outClose: false,
        pos: {
            align: 'center',
            top: 0, left: 0
        },
        onClose: null
    }

    _pames = []

    _isshow = false

    constructor(props) {
        super(props)

        this.renderContent = this.renderContent.bind(this)

        this.state = {
            comp: null,
            width: '50%',
            height: '50%',
            angleClose: true,
            outClose: false,
            pos: {
                top: 0,
                left: 0,
                translate: ''
            },
            close: {
                height: 32
            }
        }
    }

    onCreate() {
        super.onCreate()
    }

    onData(data) {
        super.onData(data)

        console.warn('modal popup on data', data)
    }

    getPosition(_pame = {}) {
        _pame = Tool.structureAssignment(Object.assign({}, this._keep_opts.pos), _pame)

        let _result = {
            top: 0,
            left: 0,
            translate: ''
        }

        switch (_pame.align) {
            case 'bottom-center': {
                _result.top = '100%'
                _result.left = '50%'
                _result.translate = 'translate(-50%,-100%)'

                break
            }
            case 'top-center': {
                _result.top = '0'
                _result.left = '50%'
                _result.translate = 'translate(-50%,0)'

                break
            }
            case 'left-center': {
                _result.top = '50%'
                _result.left = '0'
                _result.translate = 'translate(0,-50%)'

                break
            }
            case 'right-center': {
                _result.top = '50%'
                _result.left = '100%'
                _result.translate = 'translate(-100%,-50%)'

                break
            }
            case 'none': {
                _result.top = _pame.top
                _result.left = _pame.left
                _result.translate = ''

                break
            }
            default: {
                _result.top = '50%'
                _result.left = '50%'
                _result.translate = 'translate(-50%,-50%)'

                break
            }
        }

        return _result
    }

    onComp(comp, pame = {}) {
        this._isshow = true

        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), pame)

        this._opts.pos = Tool.structureAssignment(Object.assign({}, this._keep_opts.pos), pame.pos)

        this.setState({
            comp: comp,
            width: this._opts.width,
            height: this._opts.height,
            angleClose: this._opts.angleClose,
            outClose: this._opts.outClose,
            pos: this.getPosition(this._opts.pos)
        })
    }

    onImg(src, pame = {}) {
        this._isshow = true

        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), pame)

        this._opts.pos = Tool.structureAssignment(Object.assign({}, this._keep_opts.pos), pame.pos)

        this.setState({
            comp: (<img src={src} width={'100%'} alt={''} />),
            width: this._opts.width,
            height: this._opts.height,
            angleClose: this._opts.angleClose,
            outClose: this._opts.outClose,
            pos: this.getPosition(this._opts.pos)
        })
    }

    pushComp(comp, pame = {}) {
        if (this._isshow === true) {
            this._pames.push({
                type: 'comp',
                target: comp,
                pame: pame
            })
        } else {
            this.onComp(comp, pame)
        }
    }

    pushImg(src, pame = {}) {
        if (this._isshow === true) {
            this._pames.push({
                type: 'img',
                target: src,
                pame: pame
            })
        } else {
            this.onImg(src, pame)
        }
    }

    close() {
        this.finish()

        if (this._opts.onClose) {
            this._opts.onClose()
        }

        this._isshow = false

        if (this._pames.length > 0) {
            setTimeout(() => {
                let _fast = Object.assign({}, this._pames[0])

                this._pames.splice(0, 1)

                this.navigationModal(Popup._path, null, (comp) => {
                    if (_fast.type === 'comp') {
                        comp.onComp(_fast.target, _fast.pame)
                    } else {
                        comp.onImg(_fast.target, _fast.pame)
                    }
                })
            }, 500)
        }
    }

    renderContent({ theme, language, getapp }) {
        return (
            <ModalPage>
                <div className={'pos-relative'} onClick={(e) => {
                    if (this.state.outClose) {
                        this.close(e)
                    }
                }}>
                    <div style={{
                        position: 'absolute',
                        width: this.state.width,
                        height: this.state.height,
                        top: this.state.pos.top,
                        left: this.state.pos.left,
                        transform: this.state.pos.translate
                    }} onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <div className={'pos-relative'}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%'
                            }}>
                                {this.state.comp}
                            </div>

                            {this.state.angleClose === true ? (
                                <div style={{
                                    position: 'absolute',
                                    top: -this.state.close.height,
                                    right: -this.state.close.height
                                }} onClick={(e) => {
                                    this.close(e)
                                }}>
                                    <img src={require('../assets/res/icon/ic_close.png')} width={this.state.close.height} alt={''} />
                                </div>
                            ) : (null)}
                        </div>
                    </div>
                </div>
            </ModalPage>
        )
    }

    render() {
        return (
            <APPContext.Consumer>
                {this.renderContent}
            </APPContext.Consumer>
        )
    }
}

export default Popup
