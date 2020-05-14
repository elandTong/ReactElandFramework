import React from 'react'
import GridLoader from 'react-spinners/GridLoader'
import '../assets/style/comp.spiner.scss'
import Config from '../config'
import BaseWindow from '../router/BaseWindow'
import { WindowPage } from '../router/Page'

class Spiner extends BaseWindow {
    static _path = '/spiner'

    touchclose = false

    onData(data) {
        super.onData(data)

        console.warn('window spiner on data', data)
    }

    onCreate(props) {
        super.onCreate(props)

        this.state = {
            loading: true,
            theme: Config.Theme.color.theme,
            text: 'hello spiner!'
        }

        console.warn('window spiner on create!')
    }

    onStart() {
        console.warn('window spiner on start!')
    }

    onResume() {
        console.warn('window spiner on resume!')
    }

    onPause() {
        console.warn('window spiner on pause!')
    }

    onStop() {
        console.warn('window spiner on stop!')
    }

    onAppThemeChange(name, data) {
        super.onAppThemeChange(name, data)

        this.setState({
            theme: Config.Theme.color.theme
        })
    }

    setText(text, touchclose = false) {
        this.touchclose = touchclose

        this.setState({ text: text || this.state.text })
    }

    close() {
        this.finish()
    }

    render() {
        return (
            <WindowPage>
                <div className={'display-center comp-spiner-root'} onClick={(e) => {
                    if (this.touchclose) {
                        this.close()
                    }
                }}>
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
