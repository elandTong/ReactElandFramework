import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import Config from '../config';
import Tool from '../tool/Tool';
import Button from './Button';

class ETable extends React.Component {
    _opts = {
        height: 300,
        rowHeight: 35,
        topHeight: 35,
        botHeight: 45,
        padding: 20,
        hideBot: false,
        columns: {
            items: [],
            text: {
                size: 12,
                color: Config.Theme.color.main
            }
        },
        data: {
            items: [],
            text: {
                none: Config.LanguageUse.funds.none,
                size: 12,
                color: Config.Theme.color.font_deep
            }
        },
        pagination: {
            size: 30,
            currpage: 1,
            allpage: 1
        },
        loading: false,
        onNext: null,
        onPrevious: null,
        onGoto: null,
        onItemClick: null
    }

    _keep_opts = {
        height: 300,
        rowHeight: 35,
        topHeight: 35,
        botHeight: 45,
        padding: 20,
        hideBot: false,
        columns: {
            items: [],
            text: {
                size: 12,
                color: Config.Theme.color.main
            }
        },
        data: {
            items: [],
            text: {
                none: Config.LanguageUse.funds.none,
                size: 12,
                color: Config.Theme.color.font_deep
            }
        },
        pagination: {
            size: 30,
            currpage: 1,
            allpage: 1
        },
        loading: false,
        onNext: null,
        onPrevious: null,
        onGoto: null,
        onItemClick: null
    }

    _col_opts = {
        id: null,
        label: null,
        width: 'fit-content',
        align: 'center',
        color: 'inherit',
        size: 'inherit',
        format: null
    }

    _keep_col_opts = {
        id: null,
        label: null,
        width: 'fit-content',
        align: 'center',
        color: 'inherit',
        size: 'inherit',
        format: null
    }

    constructor(props) {
        super(props)

        this.state = {
            padding: 20,
            paddingMin: 15,
            margin: 5,
            but: { height: 28 },
            inpu: { val: '' },
            info: Config.LanguageUse.funds.info
        }
    }

    onNext(e) { // 下一页
        if (this._opts.pagination.currpage >= this._opts.pagination.allpage) {
            Tool.showToast(Config.LanguageUse.funds.err[4])
            return
        }

        if (this._opts.onNext) {
            this._opts.onNext(e)
        }
    }

    onPrevious(e) { // 上一页
        if (this._opts.pagination.currpage <= 1) {
            Tool.showToast(Config.LanguageUse.funds.err[3])
            return
        }

        if (this._opts.onPrevious) {
            this._opts.onPrevious(e)
        }
    }

    onGoto(e) { // 转到某页
        let _val = this.state.inpu.val

        if (!_val) {

            Tool.showToast(Config.LanguageUse.funds.err[0])

        } else if (Number(_val) < 1) {

            Tool.showToast(Config.LanguageUse.funds.err[1])

        } else if (Number(_val) > this._opts.pagination.allpage) {

            Tool.showToast(Config.LanguageUse.funds.err[2])

        } else {
            if (this._opts.onGoto) {
                this._opts.onGoto(Number(_val), e)
            }
        }
    }

    onItemClick(item, e) {
        if (this._opts.onItemClick) {
            this._opts.onItemClick(item, e)
        }
    }

    onInputChanged(v) {
        let _in = this.state.inpu

        _in.val = v

        this.setState({ inpu: _in })
    }

    getPagination(page, size) {
        return this._opts.data.items.slice((page - 1) * size, (page - 1) * size + size - 1)
    }

    getCasName(align) {
        switch (align) {
            case 'left': {
                return 'display-start'
            }
            case 'start': {
                return 'display-start'
            }
            case 'right': {
                return 'display-end'
            }
            case 'end': {
                return 'display-end'
            }
            default: {
                return 'display-center'
            }
        }
    }

    render() {
        let opts = this.props.opts ? this.props.opts : {}
        this._opts = Tool.structureAssignment(Object.assign({}, this._keep_opts), opts)
        opts.columns = opts.columns ? opts.columns : {}
        this._opts.columns = Tool.structureAssignment(Object.assign({}, this._keep_opts.columns), opts.columns)
        this._opts.columns.text = Tool.structureAssignment(Object.assign({}, this._keep_opts.columns.text), opts.columns.text)
        opts.data = opts.data ? opts.data : {}
        this._opts.data = Tool.structureAssignment(Object.assign({}, this._keep_opts.data), opts.data)
        this._opts.data.text = Tool.structureAssignment(Object.assign({}, this._keep_opts.data.text), opts.data.text)
        this._opts.pagination = Tool.structureAssignment(Object.assign({}, this._keep_opts.pagination), opts.pagination)

        let dataHeight = 300
        if (isNaN(this._opts.height) === true) {
            dataHeight = 'fit-content'
        } else {
            dataHeight = this._opts.height - this._opts.topHeight - 2.4
            if (this._opts.hideBot !== true) {
                dataHeight = dataHeight - this._opts.botHeight
            }
        }

        let _style = {
            root: {
                width: '100%',
                height: this._opts.height
            },
            top: {
                width: '100%',
                height: this._opts.topHeight,
                paddingLeft: this._opts.padding,
                paddingRight: this._opts.padding,
                fontSize: this._opts.columns.text.size,
                color: this._opts.columns.text.color
            },
            data: {
                width: '100%',
                height: dataHeight,
                overflowX: 'hidden',
                overflowY: dataHeight === 'fit-content' ? 'hidden' : 'auto',
                fontSize: this._opts.data.text.size,
                color: this._opts.data.text.color
            },
            bot: {
                width: '100%',
                height: this._opts.botHeight,
                paddingLeft: this.state.padding,
                paddingRight: this.state.padding,
                fontSize: 12,
                color: Config.Theme.color.font_deep
            },
            line: {
                width: '100%',
                height: 1.2,
                background: 'rgb(68,68,68)'
            },
            inpu: {
                width: this.state.but.height * 1.4,
                height: this.state.but.height,
                marginLeft: this.state.margin,
                marginRight: this.state.margin,
                background: 'rgb(31,31,31)',
                borderRadius: 6,
                textAlign: 'center',
                fontSize: 12,
                color: Config.Theme.color.font_deep
            },
            spin: {
                width: '100%',
                paddingTop: this.state.paddingMin,
                paddingBottom: this.state.paddingMin
            },
            list: {
                width: '100%'
            },
            none: {
                width: '100%',
                paddingTop: this.state.paddingMin,
                paddingBottom: this.state.paddingMin
            }
        }

        let _columns = this._opts.columns.items.map((item, key) => {
            this._col_opts = Tool.structureAssignment(Object.assign({}, this._keep_col_opts), item)
            return (
                <div key={key} className={this.getCasName(this._col_opts.align)} style={{ width: this._col_opts.width }}>
                    <div>{this._col_opts.label}</div>
                </div>
            )
        })

        let _data = this._opts.data.items.map((item, key) => {
            // get cols
            let _cols = this._opts.columns.items.map((col_item, col_key) => {
                this._col_opts = Tool.structureAssignment(Object.assign({}, this._keep_col_opts), col_item)
                let _val = item[this._col_opts.id]
                if (this._col_opts.format) {
                    _val = this._col_opts.format(_val, item, key)
                }

                let _sty = {
                    width: this._col_opts.width,
                    fontSize: this._col_opts.size,
                    color: this._col_opts.color
                }
                return (
                    <div key={col_key} className={this.getCasName(this._col_opts.align)} style={_sty}>
                        <div className='text-singleline'>{_val}</div>
                    </div>
                )
            })

            let _row_sty = {
                width: '100%',
                height: this._opts.rowHeight,
                paddingLeft: this._opts.padding,
                paddingRight: this._opts.padding,
                background: (key + 1) % 2 === 0 ? 'rgb(60,60,60)' : ''
            }
            _row_sty = Object.assign(_row_sty, item.style)

            return (
                <div key={key} className='click_out_ripple display-space' style={_row_sty} onClick={(e) => {
                    this.onItemClick(item, e)
                }}>{_cols}</div>
            )
        })
        _data = Tool.importSplitline(_data, { noneColor: 'rgb(57,57,57)', boundary: true })

        let _none_jsx = (
            <div className='display-center' style={_style.none}>
                <div>{this._opts.data.text.none}</div>
            </div>
        )

        let _data_jsx = (
            <div className='display-column' style={_style.list}>
                {_data}
            </div>
        )

        let _spin_jsx = (
            <div className='display-center' style={_style.spin}>
                <PulseLoader
                    size={Tool.toscale(15)}
                    margin={0}
                    color={Config.Theme.color.font_deep}
                    loading={this._opts.loading}
                />
            </div>
        )

        let _info = this.state.info.replace('[size]', this._opts.data.items.length)
            .replace('[cur]', this._opts.pagination.currpage)
            .replace('[sum]', this._opts.pagination.allpage)

        return (
            <div style={_style.root}>
                {/* top */}
                <div className='display-space' style={_style.top}>
                    {_columns}
                </div>

                {/* data */}
                <div style={_style.line}></div>
                <div style={_style.data}>
                    {this._opts.loading === true ? (_spin_jsx) : (_data.length > 0 ? (_data_jsx) : (_none_jsx))}
                </div>
                <div style={_style.line}></div>

                {/* bot */}
                {this._opts.hideBot === true ? (null) : (
                    <div className='display-space' style={_style.bot}>
                        {/* bot left */}
                        <div className='display-center' style={{ height: '100%' }}>
                            <Button opts={{
                                width: 80,
                                height: this.state.but.height,
                                radius: 6,
                                color: 'rgb(31,31,31)',
                                text: {
                                    name: Config.LanguageUse.funds.pre,
                                    size: 10
                                },
                                onClick: (e) => { this.onPrevious(e) }
                            }} />

                            <Button style={{
                                marginLeft: this.state.padding
                            }} opts={{
                                width: 80,
                                height: this.state.but.height,
                                radius: 6,
                                color: 'rgb(31,31,31)',
                                text: {
                                    name: Config.LanguageUse.funds.next,
                                    size: 10
                                },
                                onClick: (e) => { this.onNext(e) }
                            }} />
                        </div>

                        {/* bot right */}
                        <div className='display-center' style={{ height: '100%' }}>
                            <div> {_info} </div>

                            <div className='display-center' style={{ marginLeft: this.state.margin }}>
                                <div>{Config.LanguageUse.funds.from}</div>
                                <input className='input-text-none' style={_style.inpu} type={'number'} value={this.state.inpu.val} onChange={(e) => {
                                    this.onInputChanged(e.target.value)
                                }} />
                                <div>{Config.LanguageUse.funds.page}</div>
                            </div>

                            <Button style={{
                                marginLeft: this.state.margin
                            }} opts={{
                                width: this.state.but.height * 1.4,
                                height: this.state.but.height,
                                radius: 6,
                                color: 'rgb(31,31,31)',
                                text: {
                                    name: Config.LanguageUse.funds.sure,
                                    size: 10
                                },
                                onClick: (e) => { this.onGoto(e) }
                            }} />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default ETable
