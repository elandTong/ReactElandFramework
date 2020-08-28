import PropTypes from 'prop-types';
import React from 'react';
import BaseContext from '../BaseContext';

class FixedModal extends BaseContext {
    static propTypes = {
        visible: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        onClick: PropTypes.func
    }

    static defaultProps = {
        visible: false,
        className: ''
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return this.props.visible ? (
            <div className={`common-fixed-modal ${this.props.className}`}
                style={this.props.style}
                onClick={this.props.onClick}>
                {this.props.children}
            </div>
        ) : (null)
    }
}

export default FixedModal
