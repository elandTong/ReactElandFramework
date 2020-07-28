import React from 'react';
import Swiper from 'swiper';
import '../assets/style/comp.swiper.scss';
import Tool from '../utils/Tool';

class Banner extends React.Component {
    _opts = {
        items: [],
        effect: 'slide',
        nested: false,
        navActive: true,
        pagActive: true,
        onActiveIndex: null,
        onItemClick: null
    }

    _keep_opts = {
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
            effect: this._opts.effect,
            nested: this._opts.nested,
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
        if (this._opts.onActiveIndex) {
            this._opts.onActiveIndex(this._swiper.activeIndex)
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
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        return (
            <div className={`swiper-container comp-swiper-banner-root ${this.props.className || ''}`} style={this.props.style} ref={(comp) => {
                this._swiper_dom = comp
            }}>
                <div className={'swiper-wrapper'}>
                    {this._opts.items.map((item, key) => {
                        return (
                            <div key={key} className={'swiper-slide display-center'} onClick={(e) => {
                                if (this._opts.onItemClick) {
                                    this._opts.onItemClick(item, key, e)
                                }
                            }}>
                                <img className={'comp-swiper-banner-image'} src={item.src} alt={'banner'} />
                            </div>
                        )
                    })}
                </div>

                {this._opts.navActive ? (
                    <div className={'swiper-button-prev comp-swiper-banner-button'} ref={(comp) => {
                        this._swiper_pre_dom = comp
                    }} />
                ) : (null)}

                {this._opts.navActive ? (
                    <div className={'swiper-button-next comp-swiper-banner-button'} ref={(comp) => {
                        this._swiper_nex_dom = comp
                    }} />
                ) : (null)}

                {this._opts.pagActive ? (
                    <div className={'swiper-pagination'} ref={(comp) => {
                        this._swiper_pag_dom = comp
                    }} />
                ) : (null)}
            </div>
        )
    }
}

export default Banner
