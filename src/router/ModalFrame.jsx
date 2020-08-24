import PropType from 'prop-types';
import React from 'react';
import BaseContext from '../BaseContext';

class ModalFrame extends BaseContext {
    static propTypes = {
        zIndex: PropType.number,
        component: PropType.any,
        router: PropType.object,
        initPame: PropType.object,
        compHandle: PropType.func
    }

    static defaultProps = {
        zIndex: null,
        component: null,
        router: null,
        initPame: null,
        compHandle: null
    }

    constructor(props) {
        super(props)
        this.onComponentRef = this.onComponentRef.bind(this)
        this.state = {}
    }

    onComponentRef(comp) {
        if (comp && this.props.compHandle) {
            this.props.compHandle(comp)
        }
    }

    render() {
        return (
            <div className={'page-modal-container'}
                style={{ zIndex: this.props.zIndex }}>
                <div className={'page-modal-container-wrapper'}>
                    {this.props.component && (
                        <this.props.component
                            modal={this}
                            router={this.props.router}
                            initPame={this.props.initPame}
                            ref={this.onComponentRef} />
                    )}
                </div>
            </div>
        )
    }
}

export default ModalFrame
