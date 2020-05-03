import React from 'react';
import Tool from '../tool/Tool';

class WindowRoot extends React.Component {
    _opts = {
        zIndex: null,
        background: null
    }

    _keep_opts = {
        zIndex: null,
        background: null
    }

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        return (
            <div className={'widget-active'} style={{
                zIndex: this._opts.zIndex,
                background: this._opts.background
            }}>
                {this.props.children}
            </div>
        )
    }
}

class WindowContent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div className={'widget-content'}>
                {this.props.children}
            </div>
        )
    }
}

class Window extends React.Component {
    _compRef = null

    constructor(props) {
        super(props)

        this.state = {
            background: 'rgba(0,0,0,0)'
        }
    }

    // comp ref
    getCompRef() {
        return this._compRef
    }

    getComp() {
        if (this.props.component) {
            return (
                <this.props.component window={this} router={this.props.router} initPame={this.props.initPame} ref={(comp) => {
                    if (comp) {
                        this._compRef = comp

                        if (this.props.compHandle) {
                            this.props.compHandle(comp)
                        }
                    }
                }} />
            )
        } else {
            return (
                <span ref={(comp) => {
                    if (comp) {
                        this._compRef = comp

                        if (this.props.compHandle) {
                            this.props.compHandle(comp)
                        }
                    }
                }}>
                    {'This activity has no content components'}
                </span>
            )
        }
    }

    render() {
        return (
            <WindowRoot opts={{
                zIndex: this.props.zIndex, background: this.state.background
            }}>
                <WindowContent>
                    {this.getComp()}
                </WindowContent>
            </WindowRoot>
        )
    }
}

export default Window
