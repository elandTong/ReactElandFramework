import React from 'react'
import '../assets/style/comp.message.scss'
import BaseModal from '../router/BaseModal'
import { ModalPage } from '../router/Page'
import { DisplayCenter } from '../widget/Display'

class Toast extends BaseModal {
    static _path = '/toast'

    static LONG = 3000

    static SHORT = 1500

    timeout = null

    constructor(props) {
        super(props)

        this.state = {
            showTime: 0, text: 'Toast show'
        }
    }

    componentDidUpdate() {
        clearTimeout(this.timeout)

        if (this.state.showTime > 0) {
            this.timeout = setTimeout(() => {
                this.state.showTime = 0
                this.close()
            }, this.state.showTime)
        }
    }

    onStart() {
        console.warn('modal toast on start!')
    }

    onResume() {
        console.warn('modal toast on resume!')
    }

    onPause() {
        console.warn('modal toast on pause!')
    }

    onStop() {
        clearTimeout(this.timeout)

        console.warn('modal toast on stop!')
    }

    setText(text, showTime = 0) {
        this.setState({ text: text, showTime: showTime })
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
                <DisplayCenter className={'comp-message-toast-root'} onClick={(e) => {
                    this.close()
                }}>
                    <DisplayCenter className={'comp-message-toast-cont'} dangerouslySetInnerHTML={{
                        __html: this.getText(language)
                    }} />
                </DisplayCenter>
            </ModalPage>
        )
    }
}

export default Toast
