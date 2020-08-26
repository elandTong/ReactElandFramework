import React from 'react';
import Popup from '../modal/Popup';
import Toast from '../modal/Toast';
import BaseScreen from "../router/BaseScreen";
import { ScreenPage } from "../router/Page";
import Button from '../widget/Button';
import MessageNotice from '../widget/MessageNotice';

class Login extends BaseScreen {
    static _path = './Login'

    constructor(props) {
        super(props)

        this.onMenu = this.onMenu.bind(this)
        this.onSettingGesture = this.onSettingGesture.bind(this)
        this.onVerifyGesture = this.onVerifyGesture.bind(this)

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
                    title: '标题', content: this._indata.message,
                    onSure: (e) => {
                        comp.close()
                    }
                }} />
            ), MessageNotice._popupPame)
        })

        this.navigationModal(Toast._path, null, (comp) => {
            comp.setText(this._indata.message)
        })
    }

    onSettingGesture(e) {
        import('./GestureLockSetting').then((data) => {
            this.startScreen({
                component: data.default,
                path: data.default._path,
                options: { props: {} }
            }, {
                name: 'login'
            }, (comp) => {
            })
        })
    }

    onVerifyGesture(e) {
        import('../modal/GestureLockVerify').then((data) => {
            this.startModal({
                component: data.default,
                path: data.default._path,
                options: { props: {} }
            }, {
                name: 'login'
            }, (comp) => {
            })
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
                        width: '100%', name: '设置手势密码',
                        onClick: this.onSettingGesture
                    }} />

                    <Button style={{ marginTop: 10 }} options={{
                        width: '100%', name: '验证手势密码',
                        solid: false,
                        onClick: this.onVerifyGesture
                    }} />
                </div>
            </ScreenPage>
        )
    }
}

export default Login
