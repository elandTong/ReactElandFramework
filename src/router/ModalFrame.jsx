import React from 'react';

class Root extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div className={'page-modal-container'} style={{ zIndex: this.props.zIndex }}>
                {this.props.children}
            </div>
        )
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div className={'page-modal-container-pack'}>
                {this.props.children}
            </div>
        )
    }
}

class ModalFrame extends React.Component {
    _compRef = null

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    getCompRef() {
        return this._compRef
    }

    getComp() {
        if (this.props.component) {
            return (
                <this.props.component modal={this} router={this.props.router} initPame={this.props.initPame} ref={(comp) => {
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
            <Root zIndex={this.props.zIndex}>
                <Content> {this.getComp()} </Content>
            </Root>
        )
    }
}

export default ModalFrame
