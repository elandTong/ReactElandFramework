import React from 'react';
import GridLoader from 'react-spinners/GridLoader';
import '../assets/style/comp.preblock.scss';
import BaseContext from '../BaseContext';
import Tool from '../utils/Tool';
import Sorry from './Sorry';

class Preblock extends BaseContext {
    _options = {
        loadStatus: true,
        loadComp: null,
        sorryStatus: false,
        sorryComp: null,
        sorryCompOptions: null
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    renderContent({ theme, language }) {
        this._options = Tool.structureAssignment({
            loadStatus: true,
            loadComp: null,
            sorryStatus: false,
            sorryComp: null,
            sorryCompOptions: null
        }, this.props.options)

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
                            <GridLoader size={22} margin={0} loading={this._options.loadStatus} color={theme.color.theme} />
                        )}
                    </div>
                ) : (null)}
            </div>
        )
    }
}

export default Preblock
