import React from 'react'
import Config from './Config'

const APPContext = React.createContext({
    theme: Config.Theme,
    language: Config.LANGUAG_USE
})

class UseAPPContent extends React.Component {
    constructor(props) {
        super(props)

        this.renderContent = this.renderContent.bind(this)
    }

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

export default APPContext

export { UseAPPContent }
