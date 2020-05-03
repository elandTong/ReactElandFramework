import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Config from '../config';
import Tool from '../tool/Tool';

class Button extends React.Component {
    _opts = {
        width: '100%',
        height: 40,
        solid: true,
        radius: 16,
        color: Config.Theme.color.main,
        text: {
            name: null,
            size: 12,
            color: Config.Theme.color.font
        },
        copy: {
            active: false,
            text: null,
            onCopy: null
        },
        onClick: null
    }

    _keep_opts = {
        width: '100%',
        height: 40,
        solid: true,
        radius: 16,
        color: Config.Theme.color.main,
        text: {
            name: null,
            size: 12,
            color: Config.Theme.color.font
        },
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
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)
        this._opts.copy = Tool.structureAssignment(Object.assign({}, this._keep_opts.copy), this.props.opts.copy)
        this._opts.text = Tool.structureAssignment(Object.assign({}, this._keep_opts.text), this.props.opts.text)

        let _style = {
            root: {
                width: this._opts.width,
                height: this._opts.height,
                background: this._opts.solid === true ? this._opts.color : '',
                border: this._opts.solid === true ? '' : `1px solid ${this._opts.color}`,
                borderRadius: this._opts.radius,
                fontSize: this._opts.text.size,
                color: this._opts.text.color
            }
        }

        _style.root = Object.assign(_style.root, this.props.style)

        let _jsx = (
            <div className={'click_in_ripple display-center'} style={_style.root} onClick={this._opts.onClick}>
                {this._opts.text.name}
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
