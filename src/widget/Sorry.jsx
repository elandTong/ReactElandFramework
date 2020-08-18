import React from 'react';
import '../assets/style/comp.sorry.scss';
import BaseContext from '../BaseContext';
import Tool from '../utils/Tool';
import Button from './Button';

class Sorry extends BaseContext {
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

    constructor(props) {
        super(props)
        this.state = {}
    }

    renderContent({ theme, language }) {
        this._opts = Tool.structureAssignment({
            icon: require(`../${theme.resources.iconPath}/ic_sorry.png`),
            title: language.sorry,
            tips: language.nodata,
            button: {
                active: false,
                width: 100, height: 34,
                name: language.retry
            }
        }, this.props.opts || {}, false, true)

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
