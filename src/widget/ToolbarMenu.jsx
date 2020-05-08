
import React from 'react'
import '../assets/style/comp.toolbarmenu.scss'
import Config from '../config'
import Tool from '../tool/Tool'

class ToolbarMenu extends React.Component {
    _globalEventHandle = null

    constructor(props) {
        super(props)

        this.state = {
            items: [{
                key: 'light',
                name: Config.LANGUAGE_USE.lightmode
            }, {
                key: 'dark',
                name: Config.LANGUAGE_USE.darkmode
            }, {
                key: 'user',
                name: Config.LANGUAGE_USE.usermode
            }],
            currname: Config.getAppTheme()
        }

        this._globalEventHandle = (data) => {
            if (data.type === Config.GLOBAL_EVENT_TYPE.STYLE_THEME_CHANGE) {
                this.setState({ currname: data.name })
            }
            console.error('toolbarmenu on global event for data', data)
        }

        Tool.onEmit(Config.GLOBAL_EVENT, this._globalEventHandle)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        Tool.removeEmit(this._globalEventHandle)
    }

    onItemClick(item, key, e) {
        let _name = this.state.items[key].key

        this.setState({ currname: _name })

        if (this.props.onItemClick) {
            this.props.onItemClick(item, key, e)
        }
    }

    render() {
        let _items_jsx = this.state.items.map((item, key) => {
            let _classname = item.key === this.state.currname ? 'comp-toolbarmenu-item-select' : 'comp-toolbarmenu-item-unsele'

            return (
                <div key={key} className={`display-center comp-toolbarmenu-item ${_classname}`} onClick={(e) => {
                    this.onItemClick(item, key, e)
                }}>
                    <span> {item.name} </span>
                </div>
            )
        })

        return (
            <div className={`display-column comp-toolbarmenu-root ${this.props.className || ''}`} style={this.props.style}>
                {Tool.insertSplitline(_items_jsx)}
            </div>
        )
    }
}

export default ToolbarMenu
