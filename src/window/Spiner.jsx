import React from 'react'
import GridLoader from 'react-spinners/GridLoader'
import '../assets/style/comp.spiner.scss'
import Config from '../config'
import BaseWindow from '../router/BaseWindow'
import { WindowPage } from '../router/Page'

class Spiner extends BaseWindow {
    static _path = '/spiner'

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            theme: Config.Theme.color.theme,
            text: 'hello spiner!'
        }
    }

    setText(text) {
        this.setState({ text: text || 'hello spiner!' })
    }

    close() {
        this.finish()
    }

    render() {
        return (
            <WindowPage>
                <div className={'display-center comp-spiner-root'}>
                    <div className={'display-column comp-spiner-cont'}>
                        <GridLoader
                            size={20}
                            margin={0}
                            color={this.state.theme}
                            loading={this.state.loading}
                        />

                        <span className={'comp-spiner-text'}>
                            {this.state.text}
                        </span>
                    </div>
                </div>
            </WindowPage>
        )
    }
}

export default Spiner
