import PropTypes from 'prop-types'
import React from 'react'
import BaseContext from '../BaseContext'

class TouchEffect extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        mode: PropTypes.string,
        onClick: PropTypes.func
    }

    static defaultProps = {
        className: '',
        style: null,
        mode: 'out',
        onClick: function (e) {
        }
    }

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    selectEffect() {
        switch (this.props.mode) {
            case 'in': {
                return 'common-click-in-ripple'
            }
            case 'disable': {
                return ''
            }
            default: {
                return 'common-click-out-ripple'
            }
        }
    }

    render() {
        return (
            <div className={`${this.selectEffect()} ${this.props.className}`}
                style={Object.assign({}, this.props.style)}
                onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}

export default TouchEffect
