import PropTypes from 'prop-types'
import React from 'react'
import '../assets/style/comp.navbar.scss'
import BaseContext from '../BaseContext'

class Navbar extends BaseContext {
    static propTypes = {
        initIndex: PropTypes.number,
        items: PropTypes.array,
        getSwiper: PropTypes.func,
        onSelect: PropTypes.func
    }

    static defaultProps = {
        initIndex: 0,
        items: [],
        getSwiper: function () {
            return null
        },
        onSelect: function (key, e) {
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            currIndex: props.initIndex
        }
    }

    onSelect(index, e, isSlideTo = true) {
        this.setState({
            currIndex: index
        })

        if (isSlideTo && this.props.getSwiper()) {
            this.props.getSwiper().slideTo(index)
        }

        if (this.props.onSelect) {
            this.props.onSelect(index, e)
        }
    }

    render() {
        return (
            <div className={'display-space comp-navbar-root'}>
                {this.props.items.map((item, key) => {
                    let _classname = this.state.currIndex === key ? 'comp-navbar-select' : 'comp-navbar-unsele'
                    return (
                        <div key={key} className={`display-center click-out-ripple ${_classname}`} style={{
                            width: `${100 / this.props.items.length}%`
                        }} onClick={(e) => {
                            this.onSelect(key, e)
                        }}>
                            <span>{item.name}</span>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Navbar
