import React from 'react';
import Popup from '../modal/Popup';
import Toast from '../modal/Toast';
import BaseScreen from "../router/BaseScreen";
import { ScreenPage } from "../router/Page";
import Button from '../widget/Button';
import MessageNotice from '../widget/MessageNotice';
import APPContext from '../APPContext';

class Login extends BaseScreen {
    static _path = './Login'

    constructor(props) {
        super(props)

        this.renderContent = this.renderContent.bind(this)

        this.state = {
        }
    }

    onCreate() {
        super.onCreate()

        console.warn('screen login on create!')
    }

    onStart() {
        console.warn('screen login on start!')
    }

    onResume() {
        console.warn('screen login on resume!')
    }

    onPause() {
        console.warn('screen login on pause!')
    }

    onStop() {
        console.warn('screen login on stop!')
    }

    onData(data) {
        super.onData(data)

        console.warn('screen login on data', data)
    }

    renderContent({ theme, language, getapp }) {
        return (
            <ScreenPage opts={{
                toolbar: {
                    title: 'LoginTitle',
                    hideBack: false,
                    hideMenu: false,
                    onBack: (e) => {
                        this.finish()
                    },
                    onMenu: (e) => {
                        this.navigationModal(Popup._path, null, (comp) => {
                            comp.onComp((
                                <MessageNotice opts={{
                                    title: '标题',
                                    content: this._indata.message,
                                    onSure: (e) => {
                                        comp.close()
                                    }
                                }} />
                            ), {
                                width: MessageNotice._size.w,
                                height: MessageNotice._size.h,
                                angleClose: false,
                                outClose: false,
                                pos: {
                                    align: 'center',
                                    left: 10, top: 10
                                },
                                onClose: (e) => {
                                    this.showPopup('popupId1')

                                    setTimeout(() => {
                                        this.closePopup('popupId1')
                                    }, 3000)
                                }
                            })
                        })

                        this.navigationModal(Toast._path, null, (comp) => {
                            comp.setText(this._indata.message)
                        })
                    }
                },
                hideToolbar: false
            }}>
                <Button opts={{
                    width: 120,
                    name: '按钮1号',
                    onClick: (e) => {
                    }
                }} />
                <span> {'Login page'} </span>
            </ScreenPage>
        )
    }

    render() {
        return (
            <APPContext.Consumer>
                {this.renderContent}
            </APPContext.Consumer>
        )
    }
}

export default Login
