import PropTypes from 'prop-types';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../assets/style/comp.button.scss';
import BaseContext from '../BaseContext';

class Button extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        width: PropTypes.any,
        height: PropTypes.any,
        solid: PropTypes.bool,
        name: PropTypes.string,
        copyText: PropTypes.string,
        onCopy: PropTypes.func,
        onClick: PropTypes.func
    }

    static defaultProps = {
        className: '',
        style: null,
        width: '100%',
        height: 40,
        solid: true,
        name: null,
        copyText: null,
        onCopy: function (text, result) {
        },
        onClick: function (e) {
        }
    }

    constructor(porps) {
        super(porps)
        this.onClick = this.onClick.bind(this)
        this.onCopy = this.onCopy.bind(this)

        this.state = {}
    }

    onClick(e) {
        if (e instanceof Event) {
            e.stopPropagation()
        }

        if (this.props.onClick) {
            this.props.onClick(e)
        }
    }

    onCopy(text, result) {
        if (this.props.onCopy) {
            this.props.onCopy(text, result)
        }
    }

    render() {
        let _classname = this.props.solid ? 'comp-button-solid' : 'comp-button-hollow'

        return (
            <CopyToClipboard text={this.props.copyText} onCopy={this.onCopy}>
                <div className={`comp-button-root click-in-ripple display-center ${_classname} ${this.props.className}`}
                    style={Object.assign({
                        width: this.props.width, height: this.props.height
                    }, this.props.style)}
                    onClick={this.onClick}>
                    {this.props.name || this.props.children}
                </div>
            </CopyToClipboard>
        )
    }
}

export default Button
