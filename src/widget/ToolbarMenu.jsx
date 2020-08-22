
import React from 'react'
import '../assets/style/comp.toolbarmenu.scss'
import BaseContext from '../BaseContext'
import Config from '../Config'
import Tool from '../utils/Tool'

class ToolbarMenu extends BaseContext {
    constructor(props) {
        super(props)

        this.state = {
            items: [{
                key: 'light',
                name: (language) => {
                    return language.lightmode
                }
            }, {
                key: 'dark',
                name: (language) => {
                    return language.darkmode
                }
            }, {
                key: 'user',
                name: (language) => {
                    return language.usermode
                }
            }]
        }
    }

    onItemClick(item, key, e) {
        if (this.props.onItemClick) { this.props.onItemClick(item, key, e) }
    }

    renderContent({ theme, language }) {
        let _items_jsx = this.state.items.map((item, key) => {
            let _classname = item.key === Config.getAppTheme() ?
                'comp-toolbarmenu-item-select' : 'comp-toolbarmenu-item-unsele'
            return (
                <div key={key} className={`display-center comp-toolbarmenu-item ${_classname}`} onClick={(e) => {
                    this.onItemClick(item, key, e)
                }}>
                    <span> {item.name && item.name(language)} </span>
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
