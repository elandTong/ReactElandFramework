import React from 'react';
import GridLoader from 'react-spinners/GridLoader';
import '../assets/style/comp.preblock.scss';
import Tool from '../tool/Tool';
import Sorry from './Sorry';
import Config from '../config';

class Preblock extends React.Component {
    _opts = {
        loadStatus: true,
        loadComp: null,
        sorryStatus: false,
        sorryComp: null,
        sorryOpts: null
    }

    _keep_opts = {
        loadStatus: true,
        loadComp: null,
        sorryStatus: false,
        sorryComp: null,
        sorryOpts: null
    }

    constructor(props) {
        super(props)

        this.state = {
            color: Config.Theme.color.theme
        }
    }

    render() {
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        return (
            <div className={`pos-relative common-boxsize-full`}>
                <div className={`pos-absolute comp-preblock-last ${this.props.className || ''}`} style={this.props.style}>
                    {this.props.children}
                </div>

                {/* sorry视图 */}
                {this._opts.sorryStatus ? (
                    <div className={'pos-absolute comp-preblock-mid'}>
                        {this._opts.sorryComp ? (this._opts.sorryComp) : (
                            <Sorry opts={this._opts.sorryOpts} />
                        )}
                    </div>
                ) : (null)}

                {/* loading视图 */}
                {this._opts.loadStatus ? (
                    <div className={'pos-absolute display-center comp-preblock-fast'}>
                        {this._opts.loadComp ? (this._opts.loadComp) : (
                            <GridLoader size={22} margin={0} loading={this._opts.loadStatus} color={this.state.color} />
                        )}
                    </div>
                ) : (null)}
            </div>
        )
    }
}

export default Preblock
