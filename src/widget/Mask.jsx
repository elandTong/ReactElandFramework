import PropTypes from 'prop-types'
import React from 'react'
import BaseContext from '../BaseContext'

class Mask extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        onClick: PropTypes.func
    }

    static defaultProps = {
        className: ''
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className={`pos-relative ${this.props.className}`}
                style={this.props.style}
                onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}

export default Mask
