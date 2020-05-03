import React from 'react';
import Config from '../config';
import Tool from '../tool/Tool';
import Button from './Button';

class Sorry extends React.Component {
    _opts = {
        width: '100%',
        height: '100%',

        icon: {
            width: 100,
            src: null
        },

        text: {
            cont: null,
            size: 18
        },

        button: {
            active: false,

            width: 100,
            height: 34,

            name: Config.LanguageUse.retry,
            size: 14,

            onClick: null
        }
    }

    _keep_opts = {
        width: '100%',
        height: '100%',

        icon: {
            width: 100,
            src: require('../assets/res/icon/ic_sorry.png')
        },

        text: {
            cont: null,
            size: 18
        },

        button: {
            active: false,
            width: 100,
            height: 34,

            name: Config.LanguageUse.retry,
            size: 14,

            onClick: null

        }
    }

    constructor(props) {
        super(props)

        this.state = { margin: 10 }
    }

    render() {
        let opts = this.props.opts ? this.props.opts : {}

        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), opts)
        this._opts.icon = Tool.structureAssignment(Object.assign({}, this._keep_opts.icon), opts.icon)
        this._opts.text = Tool.structureAssignment(Object.assign({}, this._keep_opts.text), opts.text)
        this._opts.button = Tool.structureAssignment(Object.assign({}, this._keep_opts.button), opts.button)

        let _style = {
            root: {
                width: this._opts.width,
                height: this._opts.height
            },
            text: {
                _1: {
                    marginTop: this.state.margin,
                    textAlign: 'center',
                    fontSize: 20,
                    color: Config.Theme.color.main
                },
                _2: {
                    textAlign: 'center',
                    fontSize: this._opts.text.size,
                    color: Config.Theme.color.font_deep
                }
            }
        }

        return (
            <div className='display-center' style={_style.root}>
                <div className='display-column'>
                    <img src={this._opts.icon.src} width={this._opts.icon.width} alt={''} />

                    <div style={_style.text._1}>
                        {Config.LanguageUse.besorry}
                    </div>
                    <div style={_style.text._2}
                        dangerouslySetInnerHTML={{ __html: this._opts.text.cont }}>
                    </div>

                    {this._opts.button.active === true ? (
                        <Button style={{ marginTop: this.state.margin }} opts={{
                            width: this._opts.button.width,
                            height: this._opts.button.height,
                            radius: 10,
                            text: {
                                name: this._opts.button.name,
                                size: this._opts.button.size
                            },
                            onClick: this._opts.button.onClick
                        }} />
                    ) : (null)}
                </div>
            </div>
        )
    }
}

export default Sorry
