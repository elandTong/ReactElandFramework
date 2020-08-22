import React from 'react'
import '../assets/style/comp.button.scss'
import Tool from '../utils/Tool'

class ListButton extends React.Component {
    _options = {
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

        if (this._options.onChange) {
            this._options.onChange(item, key, e)
        }
    }

    render() {
        this._options = Tool.structureAssignment({
            items: [],
            onChange: null
        }, this.props.options)

        let _items_jsx = this._options.items.map((item, key) => {
            let _classname_outer = ''

            if (key === 0) {
                _classname_outer = 'comp-list-button-start'
            } else if (key === this._options.items.length - 1) {
                _classname_outer = 'comp-list-button-end'
            }

            let _classname_sele = this.state.currIndex === key ? 'comp-list-button-select' : 'comp-list-button-unsele'

            return (
                <div key={key} className={`click-out-ripple display-center ${_classname_outer} ${_classname_sele}`} style={{
                    width: `${100 / this._options.items.length}%`
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
