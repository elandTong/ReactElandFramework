import React from 'react';
import Swiper from 'swiper';
import '../assets/style/comp.swiper.scss';
import BaseContext from '../BaseContext';
import PropTypes from 'prop-types';

export class TabSlide extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <div className={'swiper-slide comp-swiper-view-slide'}>
                {this.props.children}
            </div>
        )
    }
}

export class TabSwiper extends BaseContext {
    static propTypes = {
        init: PropTypes.number,
        allowTouchMove: PropTypes.bool,
        nested: PropTypes.bool,
        width: PropTypes.any,
        height: PropTypes.any,
        getNavbar: PropTypes.func,
        onSelect: PropTypes.func
    }

    static defaultProps = {
        init: 0,
        allowTouchMove: true,
        nested: false,
        width: '100%',
        height: null,
        getNavbar: function () { return null },
        onSelect: function (key) { }
    }

    _swiper = null

    _swiper_dom = null

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this._swiper = new Swiper(this._swiper_dom, {
            autoplay: false,
            observer: true,
            allowTouchMove: this.props.allowTouchMove,
            nested: this.props.nested,
            initialSlide: this.props.init,
            on: {
                slideChange: () => {
                    if (this.props.getNavbar()) { this.props.getNavbar().onSelect(this._swiper.activeIndex, null, false) }
                    this.props.onSelect(this._swiper.activeIndex)
                }
            }
        })
    }

    componentWillUnmount() {
        if (this._swiper) {
            this._swiper.destroy()
        }
    }

    update() {
        if (!this._swiper) { return }

        this._swiper.update()
    }

    slideTo(index = 0) {
        if (!this._swiper) { return }

        this._swiper.slideTo(index)
    }

    render() {
        return (
            <div className={'swiper-container comp-swiper-view-root'} style={{
                width: this.props.width, height: this.props.height
            }} ref={(comp) => { this._swiper_dom = comp }}>
                <div className={'swiper-wrapper'}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
