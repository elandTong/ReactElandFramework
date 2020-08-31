import PropTypes from 'prop-types';
import React from 'react';
import GridLoader from 'react-spinners/GridLoader';
import '../assets/style/comp.preblock.scss';
import BaseContext from '../BaseContext';
import Sorry from './Sorry';

class Preblock extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        loadStatus: PropTypes.bool,
        sorryStatus: PropTypes.bool,
        sorryProps: PropTypes.object,
    }

    static defaultProps = {
        className: '', style: null,
        loadStatus: false,
        sorryStatus: false,
        sorryProps: {}
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    renderContent({ theme, language }) {
        return (
            <div className={`pos-relative common-boxsize-full`}>
                <div className={`pos-absolute comp-preblock-last ${this.props.className}`} style={Object.assign({}, this.props.style)}>
                    {this.props.children}
                </div>

                {this.props.sorryStatus ? (
                    <div className={'pos-absolute comp-preblock-mid'}>
                        <Sorry {...this.props.sorryProps} />
                    </div>
                ) : (null)}

                {this.props.loadStatus ? (
                    <div className={'pos-absolute display-center comp-preblock-fast'}>
                        <GridLoader size={22} margin={0} loading={true} color={theme.color.theme} />
                    </div>
                ) : (null)}
            </div>
        )
    }
}

export default Preblock
