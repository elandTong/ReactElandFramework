import React from 'react';

class WindowRoot extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div className={'page-window-container'} style={{ zIndex: this.props.zIndex }}>
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
            <div className={'page-window-container-pack'}>
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
            <WindowRoot zIndex={this.props.zIndex}>
                <WindowContent>
                    {this.getComp()}
                </WindowContent>
            </WindowRoot>
        )
    }
}

export default Window
