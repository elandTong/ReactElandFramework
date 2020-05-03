import React from 'react'
import Config from '../config'
import Tool from '../tool/Tool'

class ListButton extends React.Component {
    _opts = {
        items: [],
        currIndex: 0,
        radius: 16,
        color: Config.Theme.color.main,
        onChange: null
    }

    _keep_opts = {
        items: [],
        currIndex: 0,
        radius: 16,
        color: Config.Theme.color.main,
        onChange: null
    }

    constructor(props) {
        super(props)

        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        this.state = {
            height: 34,
            currIndex: this._opts.currIndex
        }
    }

    onSelect(item, key, e) {
        this.setState({ currIndex: key })

        if (this._opts.onChange) {
            this._opts.onChange(item, key, e)
        }
    }

    render() {
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), this.props.opts)

        let _item_width = 100 / this._opts.items.length + '%'

        let _items_jsx = this._opts.items.map((item, key) => {
            let _sta_radius = {
                borderTopLeftRadius: this._opts.radius,
                borderBottomLeftRadius: this._opts.radius,
            }

            let _end_radius = {
                borderTopRightRadius: this._opts.radius,
                borderBottomRightRadius: this._opts.radius,
            }

            let _style = {
                width: _item_width,
                height: '100%',
                background: this.state.currIndex === key ? this._opts.color : '',
                color: this.state.currIndex === key ? '' : this._opts.color
            }

            if (key === 0) {
                _style = Object.assign(_style, _sta_radius)
            } else if (key === this._opts.items.length - 1) {
                _style = Object.assign(_style, _end_radius)
            }

            return (
                <div className={'display-center'} style={_style} onClick={(e) => {
                    e.stopPropagation()
                    this.onSelect(item, key, e)
                }}>
                    {item.name}
                </div>
            )
        })

        _items_jsx = Tool.importSplitline(_items_jsx, {
            selIndex: this.state.currIndex,
            direction: 'y',
            selColor: Config.Theme.color.main,
            noneColor: 'rgb(72,72,72)'
        })

        return (
            <div className={'display-center'} style={{
                width: '100%',
                height: this.state.height,
                border: '1px solid ' + this._opts.color,
                borderRadius: this._opts.radius,
                fontSize: 12,
                color: Config.Theme.color.font
            }}>
                {_items_jsx}
            </div>
        )
    }
}

export default ListButton
