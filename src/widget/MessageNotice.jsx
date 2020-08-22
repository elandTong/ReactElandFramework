import React from 'react'
import '../assets/style/comp.message.scss'
import Tool from '../utils/Tool'

class MessageNotice extends React.Component {
    _options = {
        title: null,
        content: null,
        onSure: null
    }

    static _size = { w: window.document.body.clientWidth * 0.84, h: window.document.body.clientHeight * 0.4 }

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        this._options = Tool.structureAssignment({
            title: null,
            content: null,
            onSure: null
        }, this.props.options)

        return (
            <div className={'display-column comp-message-notice-root'}>
                <div className={'display-center comp-message-notice-head'}>
                    <span> {this._options.title} </span>
                </div>

                <div className={'display-center comp-message-notice-cont'}>
                    {this._options.content ? (<span>{this._options.content}</span>) : (this.props.children)}
                </div>

                <div className={'common-spline-x'} />

                <div className={'display-center click-out-ripple comp-message-notice-bottom'} onClick={(e) => {
                    if (this._options.onSure) {
                        this._options.onSure(e)
                    }
                }}>
                    <span>{'确认'}</span>
                </div>
            </div>
        )
    }
}

export default MessageNotice
