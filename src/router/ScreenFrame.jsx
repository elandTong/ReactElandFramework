import PropType from 'prop-types';
import React from 'react';
import BaseContext from '../BaseContext';

class ScreenFrame extends BaseContext {
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
            <div className={'page-screen-container'}
                style={{ zIndex: this.props.zIndex }}>
                <div className={'page-screen-container-wrapper'}>
                    {this.props.component && (
                        <this.props.component
                            screen={this}
                            router={this.props.router}
                            initPame={this.props.initPame}
                            ref={this.onComponentRef} />
                    )}
                </div>
            </div>
        )
    }
}

export default ScreenFrame
