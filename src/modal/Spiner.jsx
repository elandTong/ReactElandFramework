import React from 'react'
import GridLoader from 'react-spinners/GridLoader'
import '../assets/style/comp.spiner.scss'
import BaseModal from '../router/BaseModal'
import { ModalPage } from '../router/Page'
import { DisplayCenter, DisplayColumn } from '../widget/Display'

class Spiner extends BaseModal {
    static _path = '/spiner'

    touchclose = false

    constructor(props) {
        super(props)
        this.state = {
            loading: true, text: 'hello spiner!'
        }
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

    getText(language) {
        if (this.state.text.indexOf('key:') === 0) {
            return language[this.state.text.replace('key:', '')] || this.state.text
        } else {
            return this.state.text
        }
    }

    close() {
        this.finish()
    }

    renderContent({ theme, language }) {
        return (
            <ModalPage>
                <DisplayCenter className={'comp-spiner-root'} onClick={(e) => {
                    if (this.touchclose) {
                        this.close()
                    }
                }}>
                    <DisplayColumn className={'comp-spiner-cont'}>
                        <GridLoader
                            size={20}
                            margin={0}
                            color={theme.color.theme}
                            loading={this.state.loading}
                        />

                        <span className={'comp-spiner-text'}>
                            {this.getText(language)}
                        </span>
                    </DisplayColumn>
                </DisplayCenter>
            </ModalPage>
        )
    }
}

export default Spiner
