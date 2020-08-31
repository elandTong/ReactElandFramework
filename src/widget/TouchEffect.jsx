import PropTypes from 'prop-types'
import React from 'react'
import BaseContext from '../BaseContext'

class TouchEffect extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        mode: PropTypes.string
    }

    static defaultProps = {
        className: '',
        style: null,
        mode: 'out'
    }

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    selectEffect() {
        switch (this.props.mode) {
            case 'in': {
                return 'click-in-ripple'
            }
            default: {
                return 'click-out-ripple'
            }
        }
    }

    render() {
        return (
            <div className={`${this.selectEffect()} ${this.props.className}`} style={Object.assign({}, this.props.style)}>
                {this.props.children}
            </div>
        )
    }
}

export default TouchEffect
