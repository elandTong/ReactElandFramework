import React from 'react'
import '../assets/style/modal.dialogbox.scss'
import BaseModal from '../router/BaseModal'
import { ModalPage } from '../router/Page'
import MessageNotice from '../widget/MessageNotice'

class DialogBox extends BaseModal {
    static _path = '/dialogBox'

    constructor(props) {
        super(props)
        this.state = {}
    }

    onSure(e) {
        this.finish()

        if (this.props.intentData.onSure) {
            this.props.intentData.onSure(e)
        }
    }

    onCancel(e) {
        this.finish()

        if (this.props.intentData.onCancel) {
            this.props.intentData.onCancel(e)
        }
    }

    onMaskClick(e) {
        e.stopPropagation()

        if (Boolean(this.props.intentData.disableMaskClose)) {
        } else {
            this.finish()
        }
    }

    render() {
        return (
            <ModalPage>
                <div className={'modal-dialogbox-root display-center'} onClick={this.onMaskClick.bind(this)}>
                    <MessageNotice {...this.props.intentData}
                        onSure={this.onSure.bind(this)}
                        onCancel={this.onCancel.bind(this)} />
                </div>
            </ModalPage>
        )
    }
}

export default DialogBox
