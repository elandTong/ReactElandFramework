import React from 'react';
import '../assets/style/comp.sorry.scss';
import Config from '../config';
import Tool from '../utils/Tool';
import Button from './Button';

class Sorry extends React.Component {
    _opts = {
        icon: null,
        title: null,
        tips: null,
        button: {
            active: false,
            width: null, height: null,
            name: null,
            onClick: null
        }
    }

    _keep_opts = {
        icon: require('../assets/res/icon/ic_sorry.png'),
        title: Config.LANGUAG_USE.sorry,
        tips: Config.LANGUAG_USE.nodata,
        button: {
            active: false,
            width: 100, height: 34,
            name: Config.LANGUAG_USE.retry,
            onClick: null
        }
    }

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        this._opts.button = Tool.structureAssignment(Object.assign({}, this._keep_opts.button), this.props.opts.button)

        return (
            <div className={`display-center common-boxsize-full ${this.props.className || ''}`} style={this.props.style}>
                <div className={'display-column'}>
                    <img className={'comp-sorry-imag'} src={this._opts.icon} alt={'sorry'} />

                    <span className={'comp-sorry-title'}>
                        {this._opts.title}
                    </span>

                    <span className={'comp-sorry-tips'}>
                        {this._opts.tips}
                    </span>

                    {this._opts.button.active === true ? (
                        <Button className={'comp-sorry-retry-button'} opts={{
                            width: this._opts.button.width,
                            height: this._opts.button.height,
                            name: this._opts.button.name,
                            onClick: this._opts.button.onClick
                        }} />
                    ) : (null)}
                </div>
            </div>
        )
    }
}

export default Sorry
