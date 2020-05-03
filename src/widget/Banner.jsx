import React from 'react';
import Swiper from 'swiper';
import Config from '../config';
import Tool from '../tool/Tool';

class Banner extends React.Component {
    _swiper = null

    _swiper_dom = null

    _swiper_pag_dom = null

    _swiper_pre_dom = null

    _swiper_nex_dom = null

    constructor(props) {
        super(props)

        this.state = {
            effect: Tool.isMobile() || Tool.isIE() ? 'slide' : 'cube'
        }

        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }

    componentDidMount() {
        this._swiper = new Swiper(this._swiper_dom, {
            observer: true,
            effect: this.state.effect,
            nested: this.props.nested === true ? true : false,
            autoplay: {
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: this._swiper_nex_dom,
                prevEl: this._swiper_pre_dom
            },
            pagination: {
                el: this._swiper_pag_dom,
            },
            on: {
                slideChange: () => {
                    if (this.props.onActiveIndex) {
                        this.props.onActiveIndex(this._swiper.activeIndex)
                    }

                    console.log('banner slide change:' + this._swiper.activeIndex)
                }
            }
        })
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
        let pagination = this.props.pagination ? this.props.pagination : {}

        let _style = {
            root: {
                width: this.props.width ? this.props.width : '100%',
                height: this.props.height ? this.props.height : 'auto'
            },
            imag: {
                height: '100%',
                maxWidth: '100%',
                objectFit: 'cover'
            },
            pagination: {
                bottom: pagination.bottom ? pagination.bottom : ''
            }
        }

        let items = this.props.items.map((item, key) => {
            return (
                <div key={key} className='swiper-slide display-center' onClick={(e) => {
                    if (this.props.onItemClick) {
                        this.props.onItemClick(item, key, e)
                    }
                }}>
                    <img src={item.src} style={_style.imag} alt={''} />
                </div>
            )
        })

        return (
            <div className='swiper-container' style={_style.root} ref={(comp) => {
                this._swiper_dom = comp
            }}>
                <div className='swiper-wrapper'> {items} </div>

                <div class="swiper-button-prev" style={{
                    color: Config.Theme.color.font_deep
                }} ref={(comp) => {
                    this._swiper_pre_dom = comp
                }}></div>

                <div class="swiper-button-next" style={{
                    color: Config.Theme.color.font_deep
                }} ref={(comp) => {
                    this._swiper_nex_dom = comp
                }}></div>

                {pagination.active === true ? (
                    <div className='swiper-pagination' style={_style.pagination} ref={(comp) => {
                        this._swiper_pag_dom = comp
                    }}></div>
                ) : null}
            </div>
        )
    }
}

export default Banner
