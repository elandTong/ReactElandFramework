import React from 'react';
import BaseScreen from "../router/BaseScreen";
import { ScreenPage } from "../router/Page";
import Tool from '../utils/Tool';
import GestureLock from '../widget/GestureLock';

class GestureLockSetting extends BaseScreen {
    static _path = './gestureLockSetting'

    constructor(props) {
        super(props)
        this.onSettingResult = this.onSettingResult.bind(this)
        this.state = {}
    }

    onSettingResult(val) {
        if (val) {
            Tool.saveLocalStorage(GestureLock._STORAGE_KEY, val)

            if (this.props.intentData.resultHandle) {
                this.props.intentData.resultHandle(val)
            }

            this.finish()
        }

        console.warn('gestureLockSetting result', val)
    }

    renderContent({ theme, language }) {
        return (
            <ScreenPage {...{
                toolbarProps: {
                    title: 'GestureSettingScreenTitle',
                    hideBack: false,
                    hideMenu: true,
                    onBack: (e) => { this.finish() },
                    onMenu: null
                },
                hideToolbar: false
            }}>
                <div className={'common-display-center'} style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <GestureLock type={GestureLock.TYPE_SETTING} resultHandle={this.onSettingResult} />
                </div>
            </ScreenPage>
        )
    }
}

export default GestureLockSetting
