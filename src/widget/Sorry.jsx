import PropTypes from 'prop-types';
import React from 'react';
import '../assets/style/comp.sorry.scss';
import BaseContext from '../BaseContext';
import ResUtil from '../utils/ResUtil';
import Button from './Button';

class Sorry extends BaseContext {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        iconSrc: PropTypes.string,
        title: PropTypes.string,
        tips: PropTypes.string,
        hideRetry: PropTypes.bool,
        retryClassName: PropTypes.string,
        retryName: PropTypes.string,
        onRetry: PropTypes.func
    }

    static defaultProps = {
        className: '', style: null,
        iconSrc: null, title: null, tips: null,
        hideRetry: false,
        retryClassName: '',
        retryName: null,
        onRetry: function (e) {
        }
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    renderContent({ theme, language }) {
        return (
            <div className={`common-display-center common-boxsize-full ${this.props.className}`} style={Object.assign({}, this.props.style)}>
                <div className={'common-display-column'}>
                    <img className={'comp-sorry-imag'}
                        src={this.props.iconSrc || ResUtil.requireIcon('ic_sorry.png', theme)}
                        alt={'sorry'} />

                    <span className={'comp-sorry-title'}>
                        {this.props.title || language.sorry}
                    </span>

                    <span className={'comp-sorry-tips'}>
                        {this.props.tips || language.nodata}
                    </span>

                    {this.props.hideRetry ? (null) : (
                        <Button className={`comp-sorry-retry-button ${this.props.retryClassName}`}
                            width={100} height={34}
                            name={this.props.retryName || language.retry}
                            onClick={this.props.onRetry}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default Sorry
