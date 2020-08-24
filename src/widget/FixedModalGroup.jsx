import PropTypes from 'prop-types';
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
        return this.props.children
    }
}

export default FixedModalGroup
