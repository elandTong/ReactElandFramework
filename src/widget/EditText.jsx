
import React from 'react'
import Config from '../config'
import Tool from '../tool/Tool'

class EditText extends React.Component {
    _input = null

    _opts = {
        height: 38,

        widthRatio: 0.21,
        splitRatio: 0.02,

        disabled: false,

        type: 'text',

        icon: {
            src: null
        },

        text: {
            name: null,
            value: null,
            hint: null,

            size: 12,
            color: Config.Theme.color.main,

            inSize: 12,
            inColor: Config.Theme.color.font_deep
        },

        last: {
            active: false,
            ratio: 0.1,
            comp: null
        },

        onChanged: null,
        onClick: null
    }

    _keep_opts = {
        height: 38,

        widthRatio: 0.21,
        splitRatio: 0.02,

        disabled: false,

        type: 'text',

        icon: {
            src: null
        },

        text: {
            name: null,
            value: null,
            hint: null,

            size: 12,
            color: Config.Theme.color.main,

            inSize: 12,
            inColor: Config.Theme.color.font_deep
        },

        last: {
            active: false,
            ratio: 0.1,
            comp: null
        },

        onChanged: null,
        onClick: null
    }

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    getInputComp() {
        return this._input
    }

    getText() {
        if (this._input) {
            return this._input.value
        }
    }

    render() {
        let opts = this.props.opts ? this.props.opts : {}

        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), opts)

        this._opts.icon = Tool.structureAssignment(Object.assign({}, this._keep_opts.icon), opts.icon)

        this._opts.text = Tool.structureAssignment(Object.assign({}, this._keep_opts.text), opts.text)

        this._opts.last = Tool.structureAssignment(Object.assign({}, this._keep_opts.last), opts.last)

        // width ratio
        let fast_width = (this._opts.widthRatio * 100) + '%'
        let last_width = ((1 - this._opts.widthRatio - this._opts.splitRatio) * 100) + '%'
        let last_inpu_width = ((1 - this._opts.last.ratio) * 100) + '%'
        let last_comp_width = (this._opts.last.ratio * 100) + '%'

        // css style
        let _style = {
            root: { width: '100%' },

            cont: {
                width: '100%',
                height: this._opts.height - 1
            },

            line: {
                width: '100%',
                height: 1,
                background: 'rgb(76,76,76)'
            },

            fast: {
                width: fast_width,
                height: '100%',
                fontSize: this._opts.text.size,
                color: this._opts.text.color
            },
            fast_cont: {
                height: '100%'
            },
            fast_spit: {
                width: 1,
                height: '50%',
                background: 'rgb(76,76,76)'
            },

            last: {
                width: last_width,
                height: '100%'
            },
            last_inpu: {
                width: this._opts.last.active === true ? last_inpu_width : '100%',
                height: '95%',
                padding: 0,
                fontSize: this._opts.text.inSize,
                color: this._opts.text.inColor
            },
            last_comp: {
                width: last_comp_width,
                height: '95%'
            },

            icon: {
                height: '60%',
                marginRight: 8
            }
        }

        _style.root = Object.assign(_style.root, this.props.style)

        return (
            <div style={_style.root}>
                <div className='display-space' style={_style.cont}>
                    {/* fast */}
                    <div className='display-space' style={_style.fast}>
                        {/* name */}
                        <div className='display-center' style={_style.fast_cont}>
                            {(this._opts.icon.src) ? (
                                <img src={this._opts.icon.src} style={_style.icon} alt='' />
                            ) : (null)}

                            <div className='text-singleline'>
                                {this._opts.text.name}
                            </div>
                        </div>

                        {/* cut */}
                        <div style={_style.fast_spit}></div>
                    </div>

                    {/* last */}
                    <div className='display-center' style={_style.last} onClick={(e) => {
                        if (this._opts.onClick) {
                            this._opts.onClick(e)
                        }
                    }}>
                        {/* input */}
                        <input className='input-text-none' style={_style.last_inpu} type={this._opts.type} disabled={this._opts.disabled} value={this._opts.text.value} placeholder={this._opts.text.hint} ref={(comp) => {
                            this._input = comp
                        }} onChange={this._opts.onChanged} />

                        {/* last comp */}
                        {this._opts.last.active === true ? (
                            <div className='display-end' style={_style.last_comp} onClick={(e) => {
                                e.stopPropagation()
                            }}>
                                {this._opts.last.comp}
                            </div>
                        ) : (null)}
                    </div>
                </div>

                <div style={_style.line}></div>
            </div>
        )
    }
}

export default EditText
