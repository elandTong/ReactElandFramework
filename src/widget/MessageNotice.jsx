import React from 'react'
import Config from '../config'
import Tool from '../tool/Tool'

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

    static _size = { w: window.document.body.clientWidth * 0.84, h: window.document.body.clientWidth * 0.6 }

    constructor(props) {
        super(props)

        this.state = {
            padding: 12,
            margin: 12,
            radius: 12
        }
    }

    render() {
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        let _style = {
            root: {
                width: MessageNotice._size.w,
                height: MessageNotice._size.h,
                borderRadius: this.state.radius,
                background: Config.Theme.color.toolbar,
                fontSize: 18,
                color: Config.Theme.color.main
            },
            header: {
                width: '100%',
                height: 45
            },
            content: {
                width: '100%',
                height: MessageNotice._size.h - 90 - 1,
                padding: this.state.padding,
                lineHeight: 1.5
            },
            bottom: {
                width: '100%',
                height: 45,
                borderBottomLeftRadius: this.state.radius,
                borderBottomRightRadius: this.state.radius
            }
        }

        return (
            <div className={'display-column'} style={_style.root}>
                <div className={'display-center'} style={_style.header}>
                    <span> {this._opts.title} </span>
                </div>

                <div className={'display-center'} style={_style.content}>
                    <span>{this._opts.content}</span>
                </div>

                <div className={'common-spline'} />

                <div className={'display-center click_out_ripple'} style={_style.bottom} onClick={(e) => {
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
