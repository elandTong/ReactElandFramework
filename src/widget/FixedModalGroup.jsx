import PropTypes from 'prop-types';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BaseContext from '../BaseContext';
import FixedModal from './FixedModal';

class FixedModalGroup extends BaseContext {
    static propTypes = {
        transitionName: PropTypes.string,
        timeout: PropTypes.number
    }

    static defaultProps = {
        transitionName: 'example',
        timeout: 260
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <ReactCSSTransitionGroup transitionName={this.props.transitionName}
                transitionAppear={true}
                transitionAppearTimeout={this.props.timeout}
                transitionEnterTimeout={this.props.timeout}
                transitionLeaveTimeout={this.props.timeout}>
                {React.Children.toArray(this.props.children).filter((item) => {
                    return item.type === FixedModal ? Boolean(item.props.visible) : true
                })}
            </ReactCSSTransitionGroup>
        )
    }
}

export default FixedModalGroup
