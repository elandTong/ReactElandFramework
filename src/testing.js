/*
 * @Author: Eland.Tong
 * @Date: 2020-04-22 17:38:57
 * @Description: comp testing
 */
import React from 'react'
import { RouterTool } from './tool/Tool'
import MessageNotice from './widget/MessageNotice'
import Popup from "./window/Popup"
import Spiner from "./window/Spiner"

class Testing {
    static Test1() {
        RouterTool.navigationWindow(Spiner._path, {}, (comp) => {
            comp.setText('你好!哈哈', true)
        })
    }

    static Test2() {
        RouterTool.navigationWindow(Popup._path, {}, (comp) => {
            comp.onComp((
                <MessageNotice opts={{
                    title: '标题',
                    content: '你好我是SPA框架',
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
                }
            })
        })
    }
}

export default Testing
