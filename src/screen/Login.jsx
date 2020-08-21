import React from 'react';
import Popup from '../modal/Popup';
import Toast from '../modal/Toast';
import BaseScreen from "../router/BaseScreen";
import { ScreenPage } from "../router/Page";
import { ModalTool } from '../utils/Tool';
import Button from '../widget/Button';
import MessageNotice from '../widget/MessageNotice';

class Login extends BaseScreen {
    static _path = './Login'

    constructor(props) {
        super(props)

        this.onMenu = this.onMenu.bind(this)

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

    onMenu() {
        this.navigationModal(Popup._path, null, (comp) => {
            comp.onComp((
                <MessageNotice options={{
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

    renderContent({ theme, language, getapp }) {
        return (
            <ScreenPage options={{
                toolbarOptions: {
                    title: 'LoginScreenTitle',
                    hideBack: false,
                    hideMenu: false,
                    onBack: (e) => { this.finish() },
                    onMenu: this.onMenu
                },
                hideToolbar: false
            }}>
                <div style={{ width: '100%', padding: 20 }}>
                    <Button options={{
                        width: '100%', name: '按钮1号',
                        onClick: (e) => {
                            ModalTool.showToast('button 1 tag')
                        }
                    }} />

                    <Button style={{ marginTop: 10 }} options={{
                        width: '100%', name: '按钮2号',
                        solid: false,
                        onClick: (e) => {
                            ModalTool.showToast('button 2 tag')
                        }
                    }} />
                </div>
            </ScreenPage>
        )
    }
}

export default Login
