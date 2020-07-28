import React from 'react'
import '../assets/style/comp.message.scss'
import Tool from '../utils/Tool'

class MessageNotice extends React.Component {
    _opts = {
        title: null,
        content: null,
        onSure: null
    }

    _keep_opts = {
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
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        return (
            <div className={'display-column comp-message-notice-root'}>
                <div className={'display-center comp-message-notice-head'}>
                    <span> {this._opts.title} </span>
                </div>

                <div className={'display-center comp-message-notice-cont'}>
                    {this._opts.content ? (<span>{this._opts.content}</span>) : (this.props.children)}
                </div>

                <div className={'common-spline-x'} />

                <div className={'display-center click-out-ripple comp-message-notice-bottom'} onClick={(e) => {
                    if (this._opts.onSure) {
                        this._opts.onSure(e)
                    }
                }}>
                    <span>{'确认'}</span>
                </div>
            </div>
        )
    }
}

export default MessageNotice
