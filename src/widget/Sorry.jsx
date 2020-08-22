import React from 'react';
import '../assets/style/comp.sorry.scss';
import BaseContext from '../BaseContext';
import Tool from '../utils/Tool';
import Button from './Button';
import ResUtil from '../utils/ResUtil';

class Sorry extends BaseContext {
    _options = {
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
        this._options = Tool.structureAssignment({
            icon: ResUtil.requireIcon('ic_sorry.png', theme),
            title: language.sorry,
            tips: language.nodata,
            button: {
                active: false,
                width: 100, height: 34,
                name: language.retry
            }
        }, this.props.options || {}, false, true)

        return (
            <div className={`display-center common-boxsize-full ${this.props.className || ''}`} style={this.props.style}>
                <div className={'display-column'}>
                    <img className={'comp-sorry-imag'} src={this._options.icon} alt={'sorry'} />

                    <span className={'comp-sorry-title'}>
                        {this._options.title}
                    </span>

                    <span className={'comp-sorry-tips'}>
                        {this._options.tips}
                    </span>

                    {this._options.button.active === true ? (
                        <Button className={'comp-sorry-retry-button'} options={{
                            width: this._options.button.width,
                            height: this._options.button.height,
                            name: this._options.button.name,
                            onClick: this._options.button.onClick
                        }} />
                    ) : (null)}
                </div>
            </div>
        )
    }
}

export default Sorry
