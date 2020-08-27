import PropType from 'prop-types';
import React from 'react';
import BaseContext from '../BaseContext';

class ScreenFrame extends BaseContext {
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
            <div className={'page-screen-container'}
                style={{ zIndex: this.props.zIndex }}>
                <div className={'page-screen-container-wrapper'}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default ScreenFrame
