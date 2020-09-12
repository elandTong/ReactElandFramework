import React from 'react'
import '../assets/style/modal.popup.scss'
import BaseModal from '../router/BaseModal'
import { ModalPage } from '../router/Page'
import ResUtil from '../utils/ResUtil'
import { RouterTool } from '../utils/Tool'
import Mask from '../widget/Mask'
import TouchEffect from '../widget/TouchEffect'

class PopupController {
    static _stacks = []

    static _isshow = false

    static push(config) {
        if (config && config.render instanceof Function) {
            if (this._isshow) {
                this._stacks.push(config)
            } else {
                this._isshow = true
                RouterTool.navigationModal(Popup._path, config, (comp) => {
                })
            }
        }
    }

    static onShow() {
        this._isshow = true
    }

    static onClose() {
        this._isshow = false
        this.nextStep()
    }

    static nextStep() {
        if (this._isshow) { return }

        if (this._stacks.length > 0) {
            setTimeout(() => {
                let data = Object.assign({}, this._stacks[0])
                this._stacks.splice(0, 1)

                this._isshow = true
                RouterTool.navigationModal(Popup._path, data, (comp) => {
                })
            }, 380)
        }
    }
}

class PopupConstructor {
    static Position = {
        center: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        },
        bottomCenter: {
            top: '100%',
            left: '50%',
            transform: 'translate(-50%,-100%)'
        },
        topCenter: {
            top: '0%',
            left: '50%',
            transform: 'translate(-50%,0)'
        },
        leftCenter: {
            top: '50%',
            left: '0%',
            transform: 'translate(0,-50%)'
        },
        rightCenter: {
            top: '50%',
            left: '100%',
            transform: 'translate(-100%,-50%)'
        }
    }

    static Closemode = {
        api: 'api',
        angle: 'angle',
        out: 'out'
    }

    static Alignment = {
        center: 'center',
        bottomCenter: 'bottomCenter',
        topCenter: 'topCenter',
        leftCenter: 'leftCenter',
        rightCenter: 'rightCenter'
    }

    render = null
    width = null
    height = null
    closemode = null
    alignment = null
    position = null
    onClose = null

    constructor() {
        this.render = function () {
            return null
        }
        this.alignment = PopupConstructor.Alignment.center
        this.position = PopupConstructor.Position[this.alignment] || PopupConstructor.Position.center
        this.closemode = PopupConstructor.Closemode.out
        this.onClose = function (e) {
        }
    }

    static format(data) {
        return new PopupConstructor()
            .setWidth(data.width)
            .setHieght(data.height)
            .setRender(data.render)
            .setAlignment(data.alignment)
            .setPosition(data.position)
            .setClosemode(data.closemode)
            .setClose(data.onClose)
    }

    static create() {
        return new PopupConstructor()
    }

    setRender(handle) {
        this.render = handle || this.render
        return this
    }

    setAlignment(align) {
        this.alignment = align || this.alignment
        this.position = PopupConstructor.Position[this.alignment] || PopupConstructor.Position.center
        return this
    }

    setPosition(pos) {
        this.position = pos || this.position
        return this
    }

    setWidth(val) {
        this.width = val || this.width
        return this
    }

    setHieght(val) {
        this.height = val || this.height
        return this
    }

    setClosemode(mode) {
        this.closemode = mode || PopupConstructor.Closemode.out
        return this
    }

    setClose(handle) {
        this.onClose = handle || this.onClose
        return this
    }

    generateStyle() {
        return Object.assign({
            position: 'absolute',
            width: this.width,
            height: this.height
        }, this.position)
    }

    assign(data) {
        return Object.assign(this, data)
    }
}

class Popup extends BaseModal {
    static _path = '/popup'

    _config = null

    constructor(props) {
        PopupController.onShow()
        super(props)
        this.state = {}
    }

    finish(e) {
        super.finish()
        if (this._config.onClose) {
            this._config.onClose(e)
        }
        PopupController.onClose()
    }

    onMaskClick(e) {
        if (this._config.closemode === PopupConstructor.Closemode.out) {
            this.finish(e)
        }
    }

    renderAngle({ theme }) {
        return this._config.closemode === PopupConstructor.Closemode.angle ? (
            <TouchEffect className={'modal-popup-angle'} onClick={this.finish.bind(this)}>
                <img src={ResUtil.requireIcon('ic_close.png', theme)} width={28} alt={'popupAngleClose'} />
            </TouchEffect>
        ) : (null)
    }

    renderContent({ theme, language }) {
        this._config = PopupConstructor.format(this.props.intentData)
        return (
            <ModalPage>
                <Mask onClick={this.onMaskClick.bind(this)}>
                    <div style={this._config.generateStyle()} onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <div className={'position-relative'}>
                            <div className={'modal-popup-content'}>
                                {this._config.render && this._config.render({ modal: this })}
                            </div>

                            {this.renderAngle({ theme })}
                        </div>
                    </div>
                </Mask>
            </ModalPage>
        )
    }
}

export default Popup

export { PopupController, PopupConstructor }
