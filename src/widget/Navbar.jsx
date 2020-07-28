import React from 'react'
import Tool from '../utils/Tool'
import '../assets/style/comp.navbar.scss'

class Navbar extends React.Component {
    _opts = {
        items: [], onSelect: null
    }

    _keep_opts = {
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

        if (this._opts.onSelect) {
            this._opts.onSelect(index, e)
        }
    }

    render() {
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        let _items_jsx = this._opts.items.map((item, key) => {
            let _classname = this.state.currIndex === key ? 'comp-navbar-select' : 'comp-navbar-unsele'
            return (
                <div key={key} className={`display-center click-out-ripple ${_classname}`} style={{
                    width: `${100 / this._opts.items.length}%`
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
