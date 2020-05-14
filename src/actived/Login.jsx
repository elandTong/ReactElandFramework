import React from 'react';
import BaseActived from "../router/BaseActived";
import { ActivePage } from "../router/Page";
import MessageNotice from '../widget/MessageNotice';
import Popup from '../window/Popup';
import Toast from '../window/Toast';

class Login extends BaseActived {
    static _path = './Login'

    onCreate(props) {
        super.onCreate(props)

        this.state = {
        }

        console.warn('active login on create!')
    }

    onStart() {
        console.warn('active login on start!')
    }

    onResume() {
        console.warn('active login on resume!')
    }

    onPause() {
        console.warn('active login on pause!')
    }

    onStop() {
        console.warn('active login on stop!')
    }

    onData(data) {
        super.onData(data)

        console.warn('active login on data', data)
    }

    render() {
        return (
            <ActivePage opts={{
                toolbar: {
                    title: 'LoginTitle',
                    hideBack: false,
                    hideMenu: false,
                    onBack: (e) => {
                        this.finish()
                    },
                    onMenu: (e) => {
                        this.navigationWindow(Popup._path, null, (comp) => {
                            comp.onComp((
                                <MessageNotice opts={{
                                    title: '标题',
                                    content: this._indata,
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

                        this.navigationWindow(Toast._path, null, (comp) => {
                            comp.setText(this._indata)
                        })
                    }
                },
                hideToolbar: false
            }}>
                <div style={{ width: '100%', height: '100%', background: 'red' }}>
                    {'Login page'}
                </div>
            </ActivePage>
        )
    }
}

export default Login
