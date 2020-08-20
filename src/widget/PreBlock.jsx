import React from 'react';
import GridLoader from 'react-spinners/GridLoader';
import '../assets/style/comp.preblock.scss';
import Tool from '../utils/Tool';
import Sorry from './Sorry';
import Config from '../Config';

class Preblock extends React.Component {
    _options = {
        loadStatus: true,
        loadComp: null,
        sorryStatus: false,
        sorryComp: null,
        sorryCompOptions: null
    }

    _defaultOptions = {
        loadStatus: true,
        loadComp: null,
        sorryStatus: false,
        sorryComp: null,
        sorryCompOptions: null
    }

    constructor(props) {
        super(props)

        this.state = {
            color: Config.Theme.color.theme
        }
    }

    render() {
        this._options = Tool.structureAssignment(this._defaultOptions, this.props.options)

        return (
            <div className={`pos-relative common-boxsize-full`}>
                <div className={`pos-absolute comp-preblock-last ${this.props.className || ''}`} style={this.props.style}>
                    {this.props.children}
                </div>

                {/* sorry视图 */}
                {this._options.sorryStatus ? (
                    <div className={'pos-absolute comp-preblock-mid'}>
                        {this._options.sorryComp ? (this._options.sorryComp) : (
                            <Sorry options={this._options.sorryCompOptions} />
                        )}
                    </div>
                ) : (null)}

                {/* loading视图 */}
                {this._options.loadStatus ? (
                    <div className={'pos-absolute display-center comp-preblock-fast'}>
                        {this._options.loadComp ? (this._options.loadComp) : (
                            <GridLoader size={22} margin={0} loading={this._options.loadStatus} color={this.state.color} />
                        )}
                    </div>
                ) : (null)}
            </div>
        )
    }
}

export default Preblock
