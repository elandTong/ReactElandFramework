import React from 'react';
import Swiper from 'swiper';
import '../assets/style/comp.swiper.scss';
import Tool from '../utils/Tool';

class Banner extends React.Component {
    _options = {
        items: [],
        effect: 'slide',
        nested: false,
        navActive: true,
        pagActive: true,
        onActiveIndex: null,
        onItemClick: null
    }

    _defaultOptions = {
        items: [],
        effect: 'slide', // cube
        nested: false,
        navActive: true,
        pagActive: true,
        onActiveIndex: null,
        onItemClick: null
    }

    _swiper = null

    _swiper_dom = null
    _swiper_pag_dom = null
    _swiper_pre_dom = null
    _swiper_nex_dom = null

    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        this._swiper = new Swiper(this._swiper_dom, {
            observer: true,
            effect: this._options.effect,
            nested: this._options.nested,
            autoplay: {
                disableOnInteraction: false
            },
            navigation: {
                nextEl: this._swiper_nex_dom,
                prevEl: this._swiper_pre_dom
            },
            pagination: {
                el: this._swiper_pag_dom
            },
            on: {
                slideChange: () => {
                    this.onChange()
                }
            }
        })
    }

    onChange() {
        if (this._options.onActiveIndex) {
            this._options.onActiveIndex(this._swiper.activeIndex)
        }
    }

    slideTo(index = 0) {
        this._swiper.slideTo(index)
    }

    componentWillUnmount() {
        if (this._swiper) {
            this._swiper.destroy()
        }
    }

    render() {
        this._options = Tool.structureAssignment(this._defaultOptions, this.props.options)

        return (
            <div className={`swiper-container comp-swiper-banner-root ${this.props.className || ''}`} style={this.props.style} ref={(comp) => {
                this._swiper_dom = comp
            }}>
                <div className={'swiper-wrapper'}>
                    {this._options.items.map((item, key) => {
                        return (
                            <div key={key} className={'swiper-slide display-center'} onClick={(e) => {
                                if (this._options.onItemClick) {
                                    this._options.onItemClick(item, key, e)
                                }
                            }}>
                                <img className={'comp-swiper-banner-image'} src={item.src} alt={'banner'} />
                            </div>
                        )
                    })}
                </div>

                {this._options.navActive ? (
                    <div className={'swiper-button-prev comp-swiper-banner-button'} ref={(comp) => {
                        this._swiper_pre_dom = comp
                    }} />
                ) : (null)}

                {this._options.navActive ? (
                    <div className={'swiper-button-next comp-swiper-banner-button'} ref={(comp) => {
                        this._swiper_nex_dom = comp
                    }} />
                ) : (null)}

                {this._options.pagActive ? (
                    <div className={'swiper-pagination'} ref={(comp) => {
                        this._swiper_pag_dom = comp
                    }} />
                ) : (null)}
            </div>
        )
    }
}

export default Banner
