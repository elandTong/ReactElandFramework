import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../assets/style/comp.button.scss';
import Tool from '../utils/Tool';

class Button extends React.Component {
    _opts = {
        width: '100%', height: 40,
        solid: true,
        name: null,
        copy: {
            active: false,
            text: null,
            onCopy: null
        },
        onClick: null
    }

    _keep_opts = {
        width: '100%', height: 40,
        solid: true,
        name: null,
        copy: {
            active: false,
            text: null,
            onCopy: null
        },
        onClick: null
    }

    constructor(porps) {
        super(porps)

        this.state = {
            timeoutclick: 160
        }

        this.onClick = this.onClick.bind(this)
    }

    onClick(e) {
        if (e instanceof Event) { e.stopPropagation() }

        if (this.state.timeoutclick <= 0) {
            if (this._opts.onClick) { this._opts.onClick(e) }
        } else {
            setTimeout(() => {
                if (this._opts.onClick) { this._opts.onClick(e) }
            }, this.state.timeoutclick)
        }
    }

    render() {
        this._opts = Tool.structureAssignment(this._keep_opts, this.props.opts || {}, false, true)

        let _classname = this._opts.solid === true ? 'comp-button-solid' : 'comp-button-hollow'

        let _jsx = (
            <div className={`click-in-ripple display-center ${_classname} ${this.props.className || ''}`} style={Object.assign({
                width: this._opts.width, height: this._opts.height
            }, this.props.style || {})} onClick={this.onClick}>
                {this._opts.name || this.props.children}
            </div>
        )

        if (this._opts.copy.active === true) {
            return (
                <CopyToClipboard text={this._opts.copy.text} onCopy={(text, result) => {
                    if (this._opts.copy.onCopy) {
                        this._opts.copy.onCopy(text, result)
                    }
                }}>
                    {_jsx}
                </CopyToClipboard>
            )
        } else {
            return (_jsx)
        }
    }
}

export default Button
