import React from 'react'
import Config from '../config'
import Tool from '../tool/Tool'

class Select extends React.Component {
    _opts = {
        height: 35,
        widthRatio: 0.18,
        splitRatio: 0.04,
        icon: {
            src: null
        },
        text: {
            name: null,
            value: null,
            size: 12,
            color: Config.Theme.color.main,
            selSize: 12,
            selColor: Config.Theme.color.font_deep
        },
        onChanged: null
    }

    _keep_opts = {
        height: 35,
        widthRatio: 0.18,
        splitRatio: 0.04,
        icon: {
            src: null
        },
        text: {
            name: null,
            value: null,
            size: 12,
            color: Config.Theme.color.main,
            selSize: 12,
            selColor: Config.Theme.color.font_deep
        },
        onChanged: null
    }

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        let opts = this.props.opts ? this.props.opts : {}

        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), opts)

        this._opts.text = Tool.structureAssignment(Object.assign({}, this._keep_opts.text), opts.text)

        this._opts.icon = Tool.structureAssignment(Object.assign({}, this._keep_opts.icon), opts.icon)

        let _sty = {
            root: {
                width: '100%'
            },

            cont: {
                width: '100%',
                height: this._opts.height - 1
            },

            name: {
                width: (this._opts.widthRatio * 100) + '%',
                height: '100%',

                fontSize: this._opts.text.size,
                color: this._opts.text.color
            },

            name_cont: { height: '100%' },

            select: {
                width: ((1 - this._opts.widthRatio - this._opts.splitRatio) * 100) + '%',
                height: '95%',

                border: '0px',
                padding: 0,

                fontSize: this._opts.text.selSize,
                color: this._opts.text.selColor
            },

            cut: {
                width: 1,
                height: '40%',

                background: 'rgb(83,83,83)'
            },

            line: {
                width: '100%',
                height: 1,

                background: 'rgb(83,83,83)'
            },

            icon: {
                height: '60%',
                marginRight: 8
            }
        }

        _sty.root = Object.assign(_sty.root, this.props.style)

        return (
            <div style={_sty.root}>
                <div className='display-space' style={_sty.cont}>
                    <div className='display-space' style={_sty.name}>
                        <div className='display-center' style={_sty.name_cont}>
                            {(this._opts.icon.src) ? (
                                <img src={this._opts.icon.src} style={_sty.icon} alt='' />
                            ) : (null)}

                            <div className='text-singleline'>
                                {this._opts.text.name}
                            </div>
                        </div>

                        <div style={_sty.cut}></div>
                    </div>

                    <select style={_sty.select} value={this._opts.text.value} onChange={this._opts.onChanged}>
                        {this.props.children}
                    </select>
                </div>

                <div style={_sty.line}></div>
            </div>
        )
    }
}

export default Select
