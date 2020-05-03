
import React from 'react';
import Config from "../config";
import Tool from '../tool/Tool';

class FilterItem extends React.Component {
    _opts = {
        name: null,
        key: null,
        items: [],
        currIndex: 0,
        last: {
            comp: null,
            scale: 0.4
        },
        onChanged: null
    }

    _keep_opts = {
        name: null,
        key: null,
        items: [],
        currIndex: 0,
        last: {
            comp: null,
            scale: 0.4
        },
        onChanged: null
    }

    _col_opts = {
        name: null,
        value: null
    }

    _keep_col_opts = {
        name: null,
        value: null
    }

    constructor(props) {
        super(props)

        this.state = {
            height: Config.Theme.filter.height,
            padding: 3,
            margin: 20,
            scale: 0.1
        }
    }

    onChanged(key, e) {
        if (this._opts.onChanged) {
            this._opts.onChanged(key, e)
        }
    }

    render() {
        let opts = this.props.opts ? this.props.opts : {}
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), opts)
        this._opts.last = Tool.structureAssignment(Object.assign({}, this._keep_opts.last), opts.last)

        let _name_w = (this.state.scale * 100) + '%'
        let _cont_w = ((1 - this.state.scale) * 100) + '%'
        let _rows_w = ((1 - this._opts.last.scale) * 100) + '%'
        let _last_w = (this._opts.last.scale * 100) + '%'

        let _style = {
            root: {
                width: '100%',
                height: this.state.height
            },
            name: {
                width: _name_w,
                height: '100%',
                fontSize: 12,
                fontWeight: 'bold',
                color: Config.Theme.color.font_deep
            },
            cont: {
                width: _cont_w,
                height: '100%',
                fontSize: 12,
                color: Config.Theme.color.font_deep
            },
            rows: {
                width: this._opts.last.comp ? _rows_w : '100%',
                height: '100%'
            },
            last: {
                width: _last_w,
                height: '100%'
            }
        }

        let _items = this._opts.items.map((item, key) => {
            this._col_opts = Tool.structureAssignment(Object.assign({}, this._keep_col_opts), item)

            let _sty = {
                padding: this.state.padding,
                marginLeft: key === 0 ? 0 : this.state.margin,
                color: key === this._opts.currIndex ? Config.Theme.color.main : Config.Theme.color.font_deep
            }

            return (
                <div key={key} className='click_out_ripple' style={_sty} onClick={(e) => {
                    this.onChanged(key, e)
                }}> {this._col_opts.name} </div>
            )
        })

        _style.root = Object.assign(_style.root, this.props.style)

        return (
            <div className='display-space' style={_style.root}>
                {/* name */}
                <div className='display-start' style={_style.name}>
                    <div> {this._opts.name} </div>
                </div>

                {/* cont */}
                <div className='display-space' style={_style.cont}>
                    {/* rows */}
                    <div className='display-start' style={_style.rows}>
                        {_items}
                    </div>

                    {/* last comp */}
                    {this._opts.last.comp ? (
                        <div className='display-end' style={_style.last}>
                            {this._opts.last.comp}
                        </div>
                    ) : (null)}
                </div>
            </div>
        )
    }
}

class Filter extends React.Component {
    _opts = {
        items: [],
        onChanged: null,
        onUpdate: null
    }

    _keep_opts = {
        items: [],
        onChanged: null,
        onUpdate: null
    }

    _row_opts = {
        hide: false,
        name: null,
        key: null,
        items: [],
        link: null,
        currIndex: 0,
        last: {
            comp: null,
            scale: 0.4
        }
    }

    _keep_row_opts = {
        hide: false,
        name: null,
        key: null,
        items: [],
        link: null,
        currIndex: 0,
        last: {
            comp: null,
            scale: 0.4
        }
    }

    _ischanged = false

    constructor(props) {
        super(props)

        this._ischanged = false

        this.state = {
            background: 'rgb(31,31,31)',
            padding: 18,
            paddingMin: Config.Theme.filter.padding,
            margin: Config.Theme.filter.margin
        }

        if (this.props.onRef) {
            this.props.onRef(this)
        }
    }

    onRowChanged(item, key, e) {
        if (this._opts.onChanged) {
            this._ischanged = true
            this._opts.onChanged(item, key, e)
        }
    }

    componentDidUpdate() {
        if (this._ischanged === true && this._opts.onUpdate) {
            this._opts.onUpdate(this.getParame())
        }

        this._ischanged = false
    }

    getParame() {
        let pame = {}

        for (let _it of this._opts.items) {
            this._row_opts = Tool.structureAssignment(Object.assign({}, this._keep_row_opts), _it)

            if (this._row_opts.items[this._row_opts.currIndex]) {
                pame[this._row_opts.key] = this._row_opts.items[this._row_opts.currIndex].value
            }
        }

        return pame
    }

    getRowitem(index) {
        return this._opts.items[index]
    }

    getHeight() {
        let _len = 0
        for (let _it of this._opts.items) {
            if (_it.items && _it.items.length > 0) {
                ++_len
            }
        }
        return Tool.getFilterHeight(_len)
    }

    rowlink(item) {
        let _reset = () => { // 恢复 处理
            item.items = item.backup.items
            item.currIndex = item.backup.currIndex
            item.last = item.backup.last
            item.uuid = null
        }

        let _link = item.link ? item.link : {} // 联动配置

        let _link_tar = this.getRowitem(_link.level) // 联动目标

        if (_link_tar) {
            let _link_key = _link_tar.items[_link_tar.currIndex].value

            let _link_rep = item.link[_link_key]

            if (_link_rep && _link_rep.items && _link_rep.items.length > 0) {
                if (!_link_rep.uuid) {
                    _link_rep.uuid = Tool.uuid()
                }

                if (item.uuid !== _link_rep.uuid) {
                    item.items = _link_rep.items
                    item.currIndex = _link_rep.currIndex ? _link_rep.currIndex : 0
                    item.last = _link_rep.last
                    item.uuid = _link_rep.uuid
                }
            } else {
                _reset()
            }
        }

        return item
    }

    middleware(opts = {}) {
        if (!opts.items instanceof Array) {
            return opts
        }

        for (let i = 0; i < opts.items.length; i++) {
            let _item = opts.items[i]

            _item.id = i

            _item.backup = _item.backup ? _item.backup : {
                items: _item.items,
                currIndex: _item.currIndex,
                last: _item.last
            }

            opts.items[i] = this.rowlink(_item)
        }

        return opts
    }

    render() {
        let opts = this.props.opts ? this.props.opts : {}
        opts = this.middleware(opts)
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), opts)

        let _style = {
            root: {
                width: '100%',
                paddingTop: this.state.paddingMin,
                paddingBottom: this.state.paddingMin,
                paddingLeft: this.state.padding,
                paddingRight: this.state.padding,
                background: this.state.background
            }
        }

        let _items = this._opts.items.map((item, key) => {
            this._row_opts = Tool.structureAssignment(Object.assign({}, this._keep_row_opts), item)
            this._row_opts.last = Tool.structureAssignment(Object.assign({}, this._keep_row_opts.last), item.last)

            if (this._row_opts.items.length === 0 || this._row_opts.hide === true) {
                return (null)
            }

            return (
                <FilterItem key={key} style={{
                    marginTop: key === 0 ? 0 : this.state.margin
                }} opts={{
                    name: this._row_opts.name,
                    key: this._row_opts.key,
                    items: this._row_opts.items,
                    currIndex: this._row_opts.currIndex,
                    last: this._row_opts.last,
                    onChanged: (key, e) => {
                        this.onRowChanged(item, key, e)
                    }
                }} />
            )
        })

        return (
            <div style={_style.root}>
                {_items}
            </div>
        )
    }
}

export default Filter
