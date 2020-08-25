import React from 'react';
import BaseScreen from "../router/BaseScreen";
import { ScreenPage } from "../router/Page";
import Tool from '../utils/Tool';
import GestureLock from '../widget/GestureLock';

class GestureLockSetting extends BaseScreen {
    static _path = './gestureLockSetting'

    constructor(props) {
        super(props)

        this.onMenu = this.onMenu.bind(this)
        this.onSettingResult = this.onSettingResult.bind(this)

        this.state = {}
    }

    onData(data) {
        super.onData(data)

        console.warn('gestureLockSetting ondata', data)
    }

    onMenu() {
    }

    onSettingResult(val) {
        if (val) {
            Tool.saveLocalStorage(GestureLock._STORAGE_KEY, val)
        }

        console.warn('gestureLockSetting result', val)
    }

    renderContent({ theme, language }) {
        return (
            <ScreenPage options={{
                toolbarOptions: {
                    title: 'GestureSettingScreenTitle',
                    hideBack: false,
                    hideMenu: false,
                    onBack: (e) => { this.finish() },
                    onMenu: this.onMenu
                },
                hideToolbar: false
            }}>
                <div className={'display-center'} style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <GestureLock type={GestureLock.TYPE_SETTING}
                        resultHandle={this.onSettingResult} />
                </div>
            </ScreenPage>
        )
    }
}

export default GestureLockSetting
