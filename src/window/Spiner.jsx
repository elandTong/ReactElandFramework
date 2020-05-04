import React from 'react'
import GridLoader from 'react-spinners/GridLoader'
import Config from '../config'
import BaseWindow from '../router/BaseWindow'
import Tool from '../tool/Tool'
import { WindowPage } from '../router/Page'

class Spiner extends BaseWindow {
    static _path = '/spiner'

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            color: Config.Theme.color.main,
            text: {
                name: Config.LanguageUse.spiner,
                size: 18,
                color: Config.Theme.color.font
            }
        }
    }

    setText(name) {
        if (!name) { return }
        let text = this.state.text
        text.name = name
        this.setState({ text: text })
    }

    close() {
        this.finish()
    }

    render() {
        let _style = {
            root: {
                width: '100%',
                height: '100%'
            },
            cont: {
                width: 'fit-content',
                height: 'fit-content',
                fontSize: this.state.text.size,
                color: this.state.text.color
            }
        }

        return (
            <WindowPage>
                <div className='display-center' style={_style.root}>
                    <div className='display-column' style={_style.cont}>
                        <GridLoader
                            size={Tool.toscale(25)}
                            margin={0}
                            color={this.state.color}
                            loading={this.state.loading}
                        />

                        <div style={{ marginTop: 10 }}>
                            {this.state.text.name}
                        </div>
                    </div>
                </div>
            </WindowPage>
        )
    }
}

export default Spiner
