import PropType from 'prop-types';
import React from 'react';
import BaseContext from '../BaseContext';

class ModalFrame extends BaseContext {
    static propTypes = {
        zIndex: PropType.number
    }

    static defaultProps = {
        zIndex: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className={'page-modal-container'}
                style={{ zIndex: this.props.zIndex }}>
                <div className={'page-modal-container-wrapper'}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default ModalFrame
