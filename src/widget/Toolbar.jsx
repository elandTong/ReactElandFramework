import React from 'react'
import Tool from '../tool/Tool'

class Toolbar extends React.Component {
    _opts = {
        title: null,
        hideBack: false,
        hideMenu: false,
        onBack: null,
        onMenu: null
    }

    _keep_opts = {
        title: null,
        hideBack: false,
        hideMenu: false,
        onBack: null,
        onMenu: null
    }

    constructor(props) {
        super(props)

        this.state = {
            icon: {
                height: '55%'
            }
        }
    }

    render() {
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        return (
            <div className={'display-space page-content-toolbar-view'}>
                <div className={`${this._opts.hideBack ? '' : 'click_out_ripple'} display-center page-content-toolbar-ele`} onClick={(e) => {
                    if (!this._opts.hideBack && this._opts.onBack) { this._opts.onBack(e) }
                }}>
                    {this._opts.hideBack ? (null) : (
                        <img src={require('../assets/res/icon/ic_back.png')} height={this.state.icon.height} alt={''} />
                    )}
                </div>

                <span> {this._opts.title} </span>

                <div className={`${this._opts.hideMenu ? '' : 'click_out_ripple'} display-center page-content-toolbar-ele`} onClick={(e) => {
                    if (!this._opts.hideMenu && this._opts.onMenu) { this._opts.onMenu(e) }
                }}>
                    {this._opts.hideMenu ? (null) : (
                        <img src={require('../assets/res/icon/ic_menu.png')} height={this.state.icon.height} alt={''} />
                    )}
                </div>
            </div>
        )
    }
}

export default Toolbar
