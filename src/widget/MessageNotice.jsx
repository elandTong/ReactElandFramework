import React from 'react'
import '../assets/style/comp.message.scss'
import BaseContext from '../BaseContext'
import Tool from '../utils/Tool'

class MessageNotice extends BaseContext {
    _options = {
        title: null, content: null,
        onSure: null
    }

    static _size = { w: window.document.body.clientWidth * 0.84, h: window.document.body.clientHeight * 0.4 }

    constructor(props) {
        super(props)
        this.state = {}
    }

    renderContent({ language }) {
        this._options = Tool.structureAssignment({
            title: null, content: null,
            onSure: null
        }, this.props.options)

        return (
            <div className={'display-column comp-message-notice-root'}>
                <div className={'display-center comp-message-notice-head'}>
                    <span> {this._options.title} </span>
                </div>

                <div className={'display-center comp-message-notice-cont'}>
                    {this._options.content || this.props.children}
                </div>

                <div className={'common-spline-x'} />

                <div className={'display-center click-out-ripple comp-message-notice-bottom'}
                    onClick={this._options.onSure}>
                    <span> {language.sure} </span>
                </div>
            </div>
        )
    }
}

MessageNotice._popupPame = {
    width: MessageNotice._size.w,
    height: MessageNotice._size.h,
    angleClose: false,
    outClose: true,
    pos: { align: 'center' },
    onClose: (e) => { }
}

export default MessageNotice
