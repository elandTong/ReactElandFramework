import PropTypes from 'prop-types'
import React from 'react'
import '../assets/style/comp.message.scss'
import BaseContext from '../BaseContext'
import { PopupConstructor } from '../modal/Popup'
import TouchEffect from './TouchEffect'

class MessageNotice extends BaseContext {
    static propTypes = {
        title: PropTypes.string,
        content: PropTypes.any,
        dialogMode: PropTypes.bool,
        onSure: PropTypes.func,
        onCancel: PropTypes.func
    }

    static defaultProps = {
        title: 'key:prompt',
        content: null,
        dialogMode: true,
        onSure: function (e) { },
        onCancel: function (e) { }
    }

    static _size = { w: window.document.body.clientWidth * 0.84, h: window.document.body.clientHeight * 0.4 }

    constructor(props) {
        super(props)
        this.state = {}
    }

    getText(language, text) {
        if (text && text.indexOf('key:') === 0) { return language[text.replace('key:', '')] || text }
        return text
    }

    renderSingleBottom(language) {
        return (
            <TouchEffect className={'comp-message-notice-bottom common-display-center'}
                onClick={this.props.onSure}>
                <span>{language.sure}</span>
            </TouchEffect>
        )
    }

    renderContent({ language }) {
        return (
            <div className={'comp-message-notice-root common-display-column'} onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className={'comp-message-notice-head common-display-center'}>
                    <span> {this.getText(language, this.props.title)} </span>
                </div>

                <div className={'common-spline-x'} />

                <div className={'comp-message-notice-content common-display-center'}>
                    {this.getText(language, this.props.content) || this.props.children}
                </div>

                <div className={'common-spline-x'} />

                {this.props.dialogMode ? (
                    <div className={'comp-message-notice-bottom common-display-space-between'}>
                        <TouchEffect className={'comp-message-notice-bottom-button-left common-display-center'}
                            onClick={this.props.onSure}>
                            <span> {language.sure} </span>
                        </TouchEffect>

                        <div className={'common-spline-y'} />

                        <TouchEffect className={'comp-message-notice-bottom-button-right common-display-center'}
                            onClick={this.props.onCancel}>
                            <span> {language.cancel} </span>
                        </TouchEffect>
                    </div>
                ) : (this.renderSingleBottom(language))}
            </div>
        )
    }
}

MessageNotice.PopupParam = {
    width: MessageNotice._size.w,
    height: MessageNotice._size.h,
    closemode: PopupConstructor.Closemode.out,
    onClose: function (e) { }
}

export default MessageNotice
