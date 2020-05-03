import React from 'react';
import GridLoader from 'react-spinners/GridLoader';
import Config from '../config';
import Tool from '../tool/Tool';
import Sorry from './Sorry';

class PreBlock extends React.Component {
    _opts = {
        height: '100%',
        loading: true,
        comp: null,
        sorry: {
            active: false,
            background: 'rgba(0,0,0,0.6)',
            icon: {
                width: 100
            },
            text: {
                cont: null
            },
            button: {
                active: false,
                width: 100,
                name: Config.LanguageUse.retry,
                onClick: null
            }
        }
    }

    _keep_opts = {
        height: '100%',
        loading: true,
        comp: null,
        sorry: {
            active: false,
            background: 'rgba(0,0,0,0.6)',
            icon: {
                width: 100
            },
            text: {
                cont: null
            },
            button: {
                active: false,
                width: 100,
                name: Config.LanguageUse.retry,
                onClick: null
            }
        }
    }

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        let opts = this.props.opts ? this.props.opts : {}
        opts.sorry = opts.sorry ? opts.sorry : {}
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), opts)
        this._opts.sorry = Tool.structureAssignment(Object.assign({}, this._keep_opts.sorry), opts.sorry)
        this._opts.sorry.icon = Tool.structureAssignment(Object.assign({}, this._keep_opts.sorry.icon), opts.sorry.icon)
        this._opts.sorry.text = Tool.structureAssignment(Object.assign({}, this._keep_opts.sorry.text), opts.sorry.text)
        this._opts.sorry.button = Tool.structureAssignment(Object.assign({}, this._keep_opts.sorry.button), opts.sorry.button)

        let _style = {
            root: {
                width: '100%',
                height: this._opts.height
            },
            last: {
                width: '100%',
                height: '100%',
                zIndex: 1,
                overflowX: 'hidden',
                overflowY: 'auto'
            },
            mid: {
                width: '100%',
                height: '100%',
                background: this._opts.sorry.background,
                zIndex: 2
            },
            fast: {
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.4)',
                zIndex: 3
            }
        }

        _style.last = Object.assign(_style.last, this.props.style)

        return (
            <div className='pos-relative' style={_style.root}>
                <div className='pos-absolute' style={_style.last}>
                    <div style={{ width: '100%' }}>
                        {this.props.children}
                    </div>
                </div>

                {this._opts.sorry.active === true ? (
                    <div className='pos-absolute' style={_style.mid}>
                        <Sorry opts={{
                            width: '100%',
                            height: '100%',
                            icon: this._opts.sorry.icon,
                            text: this._opts.sorry.text,
                            button: this._opts.sorry.button
                        }} />
                    </div>
                ) : (null)}

                {this._opts.loading === true ? (
                    <div className='pos-absolute display-center' style={_style.fast}>
                        {this._opts.comp ? (this._opts.comp) : (
                            <GridLoader size={Tool.toscale(25)} margin={0} color={Config.Theme.color.main} loading={this._opts.loading} />
                        )}
                    </div>
                ) : (null)}
            </div>
        )
    }
}

export default PreBlock
