import React from 'react'
import '../assets/style/comp.button.scss'
import Tool from '../utils/Tool'

class ListButton extends React.Component {
    _opts = {
        items: [],
        onChange: null
    }

    _keep_opts = {
        items: [],
        onChange: null
    }

    constructor(props) {
        super(props)

        this.state = {
            currIndex: this.props.initIndex || 0
        }
    }

    onSelect(item, key, e) {
        this.setState({ currIndex: key })

        if (this._opts.onChange) {
            this._opts.onChange(item, key, e)
        }
    }

    render() {
        this._opts = Tool.structureAssignment(this._keep_opts, this.props.opts)

        let _items_jsx = this._opts.items.map((item, key) => {
            let _classname_outer = ''

            if (key === 0) {
                _classname_outer = 'comp-list-button-start'
            } else if (key === this._opts.items.length - 1) {
                _classname_outer = 'comp-list-button-end'
            }

            let _classname_sele = this.state.currIndex === key ? 'comp-list-button-select' : 'comp-list-button-unsele'

            return (
                <div key={key} className={`click-out-ripple display-center ${_classname_outer} ${_classname_sele}`} style={{
                    width: `${100 / this._opts.items.length}%`
                }} onClick={(e) => {
                    e.stopPropagation()

                    this.onSelect(item, key, e)
                }}>
                    {item.name}
                </div>
            )
        })

        _items_jsx = Tool.insertSplitline(_items_jsx, {
            select: this.state.currIndex,
            orientation: 'y'
        })

        return (
            <div className={'display-center comp-list-button-root'}>
                {_items_jsx}
            </div>
        )
    }
}

export default ListButton
