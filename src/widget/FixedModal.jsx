import PropTypes from 'prop-types';
import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group/index';
import BaseContext from '../BaseContext';

class FixedModal extends BaseContext {
    static propTypes = {
        visible: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        transitionName: PropTypes.string,
        onClick: PropTypes.func
    }

    static defaultProps = {
        visible: false,
        className: '',
        transitionName: 'example'
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <CSSTransitionGroup transitionName={this.props.transitionName}
                transitionAppear={true}
                transitionAppearTimeout={200}
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}>
                {this.props.visible ? (
                    <div className={`common-fixed-modal ${this.props.className}`}
                        style={this.props.style}
                        onClick={this.props.onClick}>
                        {this.props.children}
                    </div>
                ) : (null)}
            </CSSTransitionGroup>
        )
    }
}

export default FixedModal
