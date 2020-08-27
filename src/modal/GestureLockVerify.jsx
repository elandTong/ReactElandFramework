import React from 'react'
import BaseModal from '../router/BaseModal'
import { ModalPage } from '../router/Page'
import Tool from '../utils/Tool'
import GestureLock from '../widget/GestureLock'

class GestureLockVerify extends BaseModal {
    static _path = '/gestureLockVerify'

    constructor(props) {
        super(props)

        this.onVerifyResult = this.onVerifyResult.bind(this)

        this.state = {}
    }

    finish(isverify = false) {
        if (isverify) { super.finish() }
    }

    onVerifyResult(val) {
        if (val) {
            this.finish(true)

            if (this.props.intentData.resultHandle) {
                this.props.intentData.resultHandle(val)
            }
        }
    }

    renderContent({ theme, language, getapp }) {
        return (
            <ModalPage>
                <div className={'display-center'} style={{
                    width: '100%',
                    height: '100%',
                    background: 'rgba(80,80,80,0.6)'
                }}>
                    <GestureLock type={GestureLock.TYPE_VERIFY}
                        verifyPassword={Tool.getLocalStorage(GestureLock._STORAGE_KEY)}
                        resultHandle={this.onVerifyResult} />
                </div>
            </ModalPage>
        )
    }
}

export default GestureLockVerify
