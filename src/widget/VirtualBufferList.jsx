import PropTypes from 'prop-types'
import React from 'react'
import BaseContext from '../BaseContext'

class VirtualBufferList extends BaseContext {
    static propTypes = {
        bufferTime: PropTypes.number
    }

    static defaultProps = {
        bufferTime: 280
    }

    _timeout = null

    constructor(props) {
        super(props)
        this.state = { bufferEnd: false }
    }

    componentDidMount() {
        clearTimeout(this._timeout)

        this._timeout = setTimeout(() => {
            this.setState({ bufferEnd: true })
        }, this.props.bufferTime)
    }

    componentWillUnmount() {
        clearTimeout(this._timeout)
    }

    render() {
        if (this.state.bufferEnd) {
            return this.props.children
        } else {
            return React.Children.toArray(this.props.children)[0]
        }
    }
}

export default VirtualBufferList
