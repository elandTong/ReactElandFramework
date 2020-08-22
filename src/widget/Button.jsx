import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../assets/style/comp.button.scss';
import Tool from '../utils/Tool';

class Button extends React.Component {
    _options = {
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
            if (this._options.onClick) { this._options.onClick(e) }
        } else {
            setTimeout(() => {
                if (this._options.onClick) { this._options.onClick(e) }
            }, this.state.timeoutclick)
        }
    }

    render() {
        this._options = Tool.structureAssignment({
            width: '100%', height: 40,
            solid: true,
            name: null,
            copy: {
                active: false,
                text: null,
                onCopy: null
            },
            onClick: null
        }, this.props.options || {}, false, true)

        let _classname = this._options.solid === true ? 'comp-button-solid' : 'comp-button-hollow'

        let _jsx = (
            <div className={`click-in-ripple display-center ${_classname} ${this.props.className || ''}`} style={Object.assign({
                width: this._options.width, height: this._options.height
            }, this.props.style || {})} onClick={this.onClick}>
                {this._options.name || this.props.children}
            </div>
        )

        if (this._options.copy.active === true) {
            return (
                <CopyToClipboard text={this._options.copy.text} onCopy={(text, result) => {
                    if (this._options.copy.onCopy) {
                        this._options.copy.onCopy(text, result)
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
