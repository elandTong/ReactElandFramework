import React from 'react'
import Tool from '../utils/Tool'
import '../assets/style/comp.navbar.scss'

class Navbar extends React.Component {
    _options = {
        items: [], onSelect: null
    }

    constructor(props) {
        super(props)

        this.state = {
            currIndex: props.initIndex ? props.initIndex : 0
        }
    }

    onSelect(index, e, isSlideTo = true) {
        this.setState({
            currIndex: index
        })

        if (isSlideTo && this.props.getSwiper && this.props.getSwiper()) {
            this.props.getSwiper().slideTo(index)
        }

        if (this._options.onSelect) {
            this._options.onSelect(index, e)
        }
    }

    render() {
        this._options = Tool.structureAssignment({
            items: [], onSelect: null
        }, this.props.options)

        let _items_jsx = this._options.items.map((item, key) => {
            let _classname = this.state.currIndex === key ? 'comp-navbar-select' : 'comp-navbar-unsele'
            return (
                <div key={key} className={`display-center click-out-ripple ${_classname}`} style={{
                    width: `${100 / this._options.items.length}%`
                }} onClick={(e) => {
                    this.onSelect(key, e)
                }}>
                    <span>{item.name}</span>
                </div>
            )
        })

        return (
            <div className={'display-space comp-navbar-root'}>
                {_items_jsx}
            </div>
        )
    }
}

export default Navbar
