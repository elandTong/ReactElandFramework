import React from 'react'
import GridLoader from 'react-spinners/GridLoader'
import '../assets/style/comp.spiner.scss'
import BaseModal from '../router/BaseModal'
import { ModalPage } from '../router/Page'

class Spiner extends BaseModal {
    static _path = '/spiner'

    touchclose = false

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            text: 'hello spiner!'
        }
    }

    onData(data) {
        super.onData(data)

        console.warn('modal spiner on data', data)
    }

    onCreate() {
        super.onCreate()

        console.warn('modal spiner on create!')
    }

    onStart() {
        console.warn('modal spiner on start!')
    }

    onResume() {
        console.warn('modal spiner on resume!')
    }

    onPause() {
        console.warn('modal spiner on pause!')
    }

    onStop() {
        console.warn('modal spiner on stop!')
    }

    setText(text, touchclose = false) {
        this.touchclose = touchclose

        this.setState({ text: text || this.state.text })
    }

    close() {
        this.finish()
    }

    renderContent({ theme, language }) {
        return (
            <ModalPage>
                <div className={'display-center comp-spiner-root'} onClick={(e) => {
                    if (this.touchclose) {
                        this.close()
                    }
                }}>
                    <div className={'display-column comp-spiner-cont'}>
                        <GridLoader
                            size={20}
                            margin={0}
                            color={theme.color.theme}
                            loading={this.state.loading}
                        />

                        <span className={'comp-spiner-text'}>
                            {this.state.text}
                        </span>
                    </div>
                </div>
            </ModalPage>
        )
    }
}

export default Spiner
