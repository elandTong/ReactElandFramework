import React from 'react'
import Config from '../config'
import BaseWindow from '../router/BaseWindow'

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
        let _style = {
            root: {
                width: '100%',
                height: '100%'
            },
            cont: {
                width: 'fit-content',
                height: 'fit-content',
                padding: 20,
                borderRadius: 16,
                background: 'rgba(80,80,80,0.65)',
                fontSize: 14,
                color: Config.Theme.color.font
            }
        }

        return (
            <div className={'display-center'} style={_style.root} onClick={(e) => {
                this.close()
            }}>
                <div className={'display-center'} style={_style.cont} dangerouslySetInnerHTML={{
                    __html: this.state.text
                }} />
            </div>
        )
    }
}

export default Toast
