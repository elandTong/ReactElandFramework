import React from 'react'
import Tool from '../tool/Tool'

class ListIcon extends React.Component {
    _opts = {
        padding: 20,
        items: [],
        onItemClick: null,
        onItemMouse: null
    }

    _keep_opts = {
        padding: 20,
        items: [],
        onItemClick: null,
        onItemMouse: null
    }

    _item_opts = {
        active: true,
        height: 24,
        icon: null,
        name: null
    }

    _keep_item_opts = {
        active: true,
        height: 24,
        icon: null,
        name: null
    }

    constructor(props) {
        super(props)

        this.state = {
        }
    }

    onItemClick(item, key, e) {
        if (this._opts.onItemClick) {
            this._opts.onItemClick(item, key, e)
        }
    }

    onItemMouse(type, item, key, e) {
        if (this._opts.onItemMouse) {
            this._opts.onItemMouse(type, item, key, e)
        }
    }

    render() {
        let opts = this.props.opts ? this.props.opts : {}
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), opts)

        let items = this._opts.items.filter((item, key) => {
            item._index = key

            return item.active === false ? false : true
        }).map((item, key) => {
            this._item_opts = Tool.structureAssignment(Object.assign({}, this._keep_item_opts), item)

            return (
                <div key={key} className={'fit-content-flex-column click_out_ripple background-hover'} style={{
                    marginRight: (key === this._opts.items.length - 1) ? 0 : this._opts.padding,
                    borderRadius: 4
                }} onClick={(e) => {
                    this.onItemClick(item, item._index, e)
                }} onMouseEnter={(e) => {
                    this.onItemMouse('onMouseEnter', item, item._index, e)
                }} onMouseLeave={(e) => {
                    this.onItemMouse('onMouseLeave', item, item._index, e)
                }}>
                    <img src={this._item_opts.icon} height={this._item_opts.height} alt={''} />

                    <div className={'font-p12-sub'}>
                        {this._item_opts.name}
                    </div>
                </div>
            )
        })

        let style = {
            root: {
                width: 'fit-content',
                height: '100%',
                paddingLeft: this._opts.padding,
                paddingRight: this._opts.padding
            }
        }

        return (
            <div className={'display-center'} style={style.root}>
                {items}
            </div>
        )
    }
}

export default ListIcon
