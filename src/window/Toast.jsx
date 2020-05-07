import React from 'react'
import BaseWindow from '../router/BaseWindow'
import { WindowPage } from '../router/Page'
import '../assets/style/comp.message.scss'

class Toast extends BaseWindow {
    static _path = '/toast'

    constructor(props) {
        super(props)

        this.state = {
            text: 'Toast show'
        }
    }

    setText(txt) {
        this.setState({
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
