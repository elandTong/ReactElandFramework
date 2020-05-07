import React from 'react';
import Swiper from 'swiper';
import '../assets/style/comp.swiper.scss';

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

export class TabSwiper extends React.Component {
    _swiper = null

    _swiper_dom = null

    constructor(props) {
        super(props)

        this.state = {
        }

        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }

    componentDidMount() {
        let _ismove = this.props.allowTouchMove === false ? false : true

        this._swiper = new Swiper(this._swiper_dom, {
            autoplay: false,
            observer: true,
            allowTouchMove: _ismove,
            nested: this.props.nested === true ? true : false,
            initialSlide: this.props.init ? this.props.init : 0,
            on: {
                slideChange: () => {
                    if (this.props.getNavbar && this.props.getNavbar()) {
                        this.props.getNavbar().onSelect(this._swiper.activeIndex, null, false)
                    }

                    if (this.props.onSelect) {
                        this.props.onSelect(this._swiper.activeIndex)
                    }
                }
            }
        })
    }

    componentDidUpdate() {
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
                width: this.props.width ? this.props.width : '100%',
                height: this.props.height ? this.props.height : 'auto'
            }} ref={(comp) => {
                this._swiper_dom = comp
            }}>
                <div className={'swiper-wrapper'}> {this.props.children} </div>
            </div>
        )
    }
}
