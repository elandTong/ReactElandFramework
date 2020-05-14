import React from 'react'
import '../assets/style/comp.message.scss'
import BaseWindow from '../router/BaseWindow'
import { WindowPage } from '../router/Page'

class Toast extends BaseWindow {
    static _path = '/toast'

    static LONG = 3000

    static SHORT = 1500

    timeout = null

    onCreate(props) {
        super.onCreate(props)

        this.state = {
            showTime: 0,
            text: 'Toast show'
        }

        console.warn('window toast on create!')
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
        console.warn('window toast on start!')
    }

    onResume() {
        console.warn('window toast on resume!')
    }

    onPause() {
        console.warn('window toast on pause!')
    }

    onStop() {
        clearTimeout(this.timeout)

        console.warn('window toast on stop!')
    }

    onNativeBack(data) {
        super.onNativeBack(data)
    }

    onData(data) {
        super.onData(data)

        console.warn('window toast on data', data)
    }

    setText(txt, showTime = 0) {
        this.setState({
            showTime: showTime,
            text: txt
        })
    }

    close() {
        this.finish()
    }

    render() {
        return (
            <WindowPage>
                <div className={'display-center comp-message-toast-root'} onClick={(e) => {
                    this.close()
                }}>
                    <div className={'display-center comp-message-toast-cont'} dangerouslySetInnerHTML={{
                        __html: this.state.text
                    }} />
                </div>
            </WindowPage>
        )
    }
}

export default Toast
