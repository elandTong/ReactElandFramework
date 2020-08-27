import React from 'react'
import '../assets/style/comp.message.scss'
import BaseModal from '../router/BaseModal'
import { ModalPage } from '../router/Page'

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
        this.setState({
            showTime: showTime, text: text
        })
    }

    close() {
        this.finish()
    }

    renderContent({ theme, language, getapp }) {
        return (
            <ModalPage>
                <div className={'display-center comp-message-toast-root'} onClick={(e) => {
                    this.close()
                }}>
                    <div className={'display-center comp-message-toast-cont'} dangerouslySetInnerHTML={{
                        __html: this.state.text
                    }} />
                </div>
            </ModalPage>
        )
    }
}

export default Toast
