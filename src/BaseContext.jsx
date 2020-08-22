import React from 'react'
import APPContext from './APPContext'
import Config from './Config'
import { Emit } from './utils/EventBus'

class BaseContext extends React.Component {
    static propTypes = {}

    static defaultProps = {}

    constructor(props) {
        super(props)
        this.renderContent = this.renderContent.bind(this)
        this.onBroadcast = this.onBroadcast.bind(this)
        Emit.on(Config.GLOBAL_EVENT, this.onBroadcast)
    }

    componentWillUnmount() {
        Emit.remove(this.onBroadcast)
    }

    onBroadcast(data) { }

    renderContent({ theme, language, getapp }) {
        return null
    }

    render() {
        return (
            <APPContext.Consumer>
                {this.renderContent}
            </APPContext.Consumer>
        )
    }
}

export default BaseContext
