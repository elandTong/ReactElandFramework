import PropTypes from 'prop-types'
import React from 'react'
import '../assets/style/comp.message.scss'
import BaseContext from '../BaseContext'
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
            <TouchEffect className={'comp-message-notice-bottom display-center'}
                onClick={this.props.onSure}>
                <span>{language.sure}</span>
            </TouchEffect>
        )
    }

    renderContent({ language }) {
        return (
            <div className={'comp-message-notice-root display-column'}>
                <div className={'comp-message-notice-head display-center'}>
                    <span> {this.getText(language, this.props.title)} </span>
                </div>

                <div className={'common-spline-x'} />

                <div className={'comp-message-notice-content display-center'}>
                    {this.getText(language, this.props.content) || this.props.children}
                </div>

                <div className={'common-spline-x'} />

                {this.props.dialogMode ? (
                    <div className={'comp-message-notice-bottom display-space'}>
                        <TouchEffect className={'comp-message-notice-bottom-button-left display-center'}
                            onClick={this.props.onSure}>
                            <span> {language.sure} </span>
                        </TouchEffect>

                        <div className={'common-spline-y'} />

                        <TouchEffect className={'comp-message-notice-bottom-button-right display-center'}
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
    angleClose: false,
    outClose: true,
    pos: { align: 'center' },
    onClose: (e) => { }
}

export default MessageNotice
