import React from 'react'
import Config from '../config'
import Tool from '../tool/Tool'
import Toolbar from './Toolbar'

class Page extends React.Component {
    _opts = {
        toolbar: null,
        toolbarComp: null,
        hideToolbar: false,
        viewBackground: null,
        toolBackground: null
    }

    _keep_opts = {
        toolbar: null,
        toolbarComp: null,
        hideToolbar: false,
        viewBackground: 'rgba(0,0,0,0)',
        toolBackground: Config.Theme.color.toolbar
    }

    constructor(props) {
        super(props)

        this.state = {
            toolHeight: Config.Theme.toolbar.height
        }
    }

    getContentHeight() {
        if (this._opts.hideToolbar === true) {
            return window.document.body.clientHeight
        } else {
            return window.document.body.clientHeight - this.state.toolHeight
        }
    }

    render() {
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        let _style = {
            root: {
                background: this._opts.viewBackground
            },
            tool: {
                height: this.state.toolHeight,
                background: this._opts.toolBackground
            },
            view: {
                paddingTop: this._opts.hideToolbar === true ? 0 : this.state.toolHeight
            }
        }

        return (
            <div className={'page-content-root'} style={_style.root}>
                {this._opts.hideToolbar === true ? (null) : (
                    <div className={'page-content-toolbar'} style={_style.tool}>
                        {this._opts.toolbarComp || (<Toolbar opts={this._opts.toolbar} />)}
                    </div>
                )}

                <div className={'page-content-view'} style={_style.view}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Page
