import PropTypes from 'prop-types';
import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group/index';
import BaseContext from '../BaseContext';

class FixedModalGroup extends BaseContext {
    static propTypes = {
        transitionName: PropTypes.string
    }

    static defaultProps = {
        transitionName: 'example'
    }

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <CSSTransitionGroup transitionName={this.props.transitionName}
                transitionAppear={true}
                transitionAppearTimeout={200}
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}>
                {this.props.children}
            </CSSTransitionGroup>
        )
    }
}

export default FixedModalGroup
