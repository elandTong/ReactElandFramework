import React from 'react'
import BaseModal from '../router/BaseModal'
import { ModalPage } from '../router/Page'
import ResUtil from '../utils/ResUtil'
import Tool from '../utils/Tool'

class Popup extends BaseModal {
    static _path = '/popup'

    _opts = {
        width: '50%', height: '50%',
        angleClose: true, outClose: false,
        pos: { align: 'center', top: 0, left: 0 },
        onClose: null
    }

    static _pames = []

    static _isshow = false

    constructor(props) {
        super(props)

        this.state = {
            comp: null,
            width: '50%', height: '50%',
            angleClose: true,
            outClose: false,
            pos: { top: 0, left: 0, translate: '' },
            close: { height: 32 }
        }
    }

    onData(data) {
        super.onData(data)
        console.warn('modal popup on data', data)
    }

    updateOptions(pame) {
        this._opts = Tool.structureAssignment({
            width: '50%', height: '50%',
            angleClose: true, outClose: false,
            pos: { align: 'center', top: 0, left: 0 },
            onClose: null
        }, pame, false, true)
    }

    getPosition(_pame = { align: 'center', top: 0, left: 0 }) {
        let _result = { top: 0, left: 0, translate: '' }
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
        Popup._isshow = true

        this.updateOptions(pame)

        this.setState({
            comp: comp,
            width: this._opts.width, height: this._opts.height,
            angleClose: this._opts.angleClose, outClose: this._opts.outClose,
            pos: this.getPosition(this._opts.pos)
        })
    }

    onImg(src, pame = {}) {
        Popup._isshow = true

        this.updateOptions(pame)

        this.setState({
            comp: (<img src={src} width={'100%'} alt={''} />),
            width: this._opts.width, height: this._opts.height,
            angleClose: this._opts.angleClose, outClose: this._opts.outClose,
            pos: this.getPosition(this._opts.pos)
        })
    }

    pushComp(comp, pame = {}) {
        if (Popup._isshow === true) {
            Popup._pames.push({
                type: 'comp',
                target: comp,
                pame: pame
            })
        } else {
            this.onComp(comp, pame)
        }
    }

    pushImg(src, pame = {}) {
        if (Popup._isshow === true) {
            Popup._pames.push({
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

        Popup._isshow = false

        if (Popup._pames.length > 0) {
            setTimeout(() => {
                let _fast = Object.assign({}, Popup._pames[0])

                Popup._pames.splice(0, 1)

                this.navigationModal(Popup._path, null, (comp) => {
                    if (comp instanceof Popup) {
                        if (_fast.type === 'comp') {
                            comp.onComp(_fast.target, _fast.pame)
                        } else {
                            comp.onImg(_fast.target, _fast.pame)
                        }
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
                                    <img src={ResUtil.requireIcon('ic_close.png', theme)} width={this.state.close.height} alt={''} />
                                </div>
                            ) : (null)}
                        </div>
                    </div>
                </div>
            </ModalPage>
        )
    }
}

export default Popup
