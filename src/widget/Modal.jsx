import React from 'react'

class Modal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div className={`pos-relative ${this.props.className || ''}`} style={this.props.style} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
}

export default Modal
