import React from 'react'
import '../assets/style/modal.dialogbox.scss'
import BaseModal from '../router/BaseModal'
import { ModalPage } from '../router/Page'
import { DisplayCenter } from '../widget/Display'
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
                <DisplayCenter className={'modal-dialogbox-root'} onClick={this.onMaskClick.bind(this)}>
                    <MessageNotice {...this.props.intentData}
                        onSure={this.onSure.bind(this)}
                        onCancel={this.onCancel.bind(this)} />
                </DisplayCenter>
            </ModalPage>
        )
    }
}

export default DialogBox
