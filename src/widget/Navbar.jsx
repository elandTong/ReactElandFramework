import React from 'react'
import Config from '../config'
import Tool from '../tool/Tool'

class Navbar extends React.Component {
    _opts = {
        items: [],
        height: 45,
        select: {
            unlineColor: null,
            textColor: null
        },
        unsele: {
            unlineColor: null,
            textColor: null
        },
        onSelect: null,
        background: null
    }

    _keep_opts = {
        items: [],
        height: 45,
        select: {
            unlineColor: Config.Theme.color.font_deep,
            textColor: Config.Theme.color.font_deep
        },
        unsele: {
            unlineColor: 'rgba(0,0,0,0)',
            textColor: 'inherit'
        },
        onSelect: null,
        background: 'rgba(0,0,0,0)'
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
        this._opts.select = Tool.structureAssignment(Object.assign({}, this._keep_opts.select), this.props.opts.select)
        this._opts.unsele = Tool.structureAssignment(Object.assign({}, this._keep_opts.unsele), this.props.opts.unsele)

        let _style = {
            root: {
                width: '100%',
                height: this._opts.height,
                background: this._opts.background,
                fontSize: 14,
                color: Config.Theme.color.font_dk
            }
        }

        _style.root = Object.assign(_style.root, this.props.style)

        let _items_jsx = this._opts.items.map((item, key) => {
            return (
                <div key={key} className={'display-center click_out_ripple'} style={{
                    width: `${100 / this._opts.items.length}%`,
                    height: '100%',
                    borderBottomStyle: 'solid',
                    borderBottomColor: key === this.state.currIndex ? this._opts.select.unlineColor : this._opts.unsele.unlineColor,
                    borderBottomWidth: 2.4,
                    color: key === this.state.currIndex ? this._opts.select.textColor : this._opts.unsele.textColor
                }} onClick={(e) => {
                    this.onSelect(key, e)
                }}>
                    <span>{item.name}</span>
                </div>
            )
        })

        return (
            <div className={'display-space'} style={_style.root}>
                {_items_jsx}
            </div>
        )
    }
}

export default Navbar
