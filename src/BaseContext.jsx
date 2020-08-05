import React from 'react'
import APPContext from "./APPContext"

class BaseContext extends React.Component {
    static propTypes = {}

    static defaultProps = {}

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

export default BaseContext
